#!/usr/bin/env python
#coding=utf-8
# 
# Copyright 2010 RenRen
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

"""A barebones AppEngine application that uses RenRen for login.

This application uses OAuth 2.0 directly rather than relying on renren's
JavaScript SDK for login. It also accesses the RenRen API directly
using the Python SDK. It is designed to illustrate how easy
it is to use the renren Platform without any third party code.

Befor runing the demo, you have to register a RenRen Application and modify the root domain.
e.g. If you specify the redirect_rui as "http://www.example.com/example_uri". The root domain must be "example.com"

@Author Xun Dai<xun.dai@qq.com>

"""

RENREN_APP_API_KEY = "api_key_of_your_app"
RENREN_APP_SECRET_KEY = "secret_key_of_your_app"


RENREN_AUTHORIZATION_URI = "http://graph.renren.com/oauth/authorize"
RENREN_ACCESS_TOKEN_URI = "http://graph.renren.com/oauth/token"
RENREN_SESSION_KEY_URI = "http://graph.renren.com/renren_api/session_key"
RENREN_API_SERVER = "http://api.renren.com/restserver.do"



import base64
import Cookie
import email.utils
import hashlib
import hmac
import logging
import os.path
import time
import urllib

# Find a JSON parser
try:
    import json
    _parse_json = lambda s: json.loads(s)
except ImportError:
    try:
        import simplejson
        _parse_json = lambda s: simplejson.loads(s)
    except ImportError:
        # For Google AppEngine
        from django.utils import simplejson
        _parse_json = lambda s: simplejson.loads(s)


from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

class User(db.Model):
    id = db.StringProperty(required=True)
    name = db.StringProperty(required=True)
    avatar = db.StringProperty(required=True)
    access_token = db.StringProperty(required=True)
    def __unicode__(self):
        return self

class BaseHandler(webapp.RequestHandler):
    @property
    def current_user(self):
        """Returns the logged in renren user, or None if unconnected."""
        if not hasattr(self, "_current_user"):
            self._current_user = None
            user_id = parse_cookie(self.request.cookies.get("renren_user"))
            if user_id:
                logging.info("renren_user in cookie is: ")
                self._current_user = User.get_by_key_name(user_id)
        return self._current_user


class HomeHandler(BaseHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), "oauth.html")
        args = dict(current_user=self.current_user)
        self.response.out.write(template.render(path, args))

class LoginHandler(BaseHandler):
    def get(self):
        verification_code = self.request.get("code")
        args = dict(client_id=RENREN_APP_API_KEY, redirect_uri=self.request.path_url)
        
        error = self.request.get("error")
        
        if error:
            args["error"] = error
            args["error_description"] = self.request.get("error_description")
            args["error_uri"] = self.request.get("error_uri")
            path = os.path.join(os.path.dirname(__file__), "error.html")
            args = dict(error=args)
            self.response.out.write(template.render(path, args))
        elif verification_code:
            scope = self.request.get("scope")
            scope_array = str(scope).split("[\\s,+]")
            logging.info("returning scope is :" + str(scope_array))
            response_state = self.request.get("state")
            logging.info("returning state is :" + response_state)
            args["client_secret"] = RENREN_APP_SECRET_KEY
            args["code"] = verification_code
            args["grant_type"] = "authorization_code"
            logging.info(RENREN_ACCESS_TOKEN_URI + "?" + urllib.urlencode(args))
            response = urllib.urlopen(RENREN_ACCESS_TOKEN_URI + "?" + urllib.urlencode(args)).read()
            logging.info(response)
            access_token = _parse_json(response)["access_token"]
            logging.info("obtained access_token is: " + access_token)
            
            '''Obtain session key from the Resource Service.'''
            session_key_request_args = {"oauth_token": access_token}
            response = urllib.urlopen(RENREN_SESSION_KEY_URI + "?" + urllib.urlencode(session_key_request_args)).read()
            logging.info("session_key service response: " + str(response))
            session_key = str(_parse_json(response)["renren_token"]["session_key"])
            logging.info("obtained session_key is: " + session_key)
            
            '''Requesting the Renren API Server obtain the user's base info.'''
            params = {"method": "users.getInfo", "fields": "name,tinyurl"}
            api_client = RenRenAPIClient(session_key, RENREN_APP_API_KEY, RENREN_APP_SECRET_KEY)
            response = api_client.request(params);
            
            if type(response) is list:
                response = response[0]
            
            user_id = response["uid"]#str(access_token).split("-")[1]
            name = response["name"]
            avatar = response["tinyurl"]
            
            user = User(key_name = unicode(user_id), id = unicode(user_id), name = unicode(name), avatar = unicode(avatar), access_token = access_token)
            user.put()
            
            set_cookie(self.response, "renren_user", str(user_id),
                       expires=time.time() + 30 * 86400)
            self.redirect("/")
        else:
            args["response_type"] = "code"
            args["scope"] = "publish_feed email status_update"
            args["state"] = "1 23 abc&?|."
            self.redirect(
                RENREN_AUTHORIZATION_URI + "?" +
                urllib.urlencode(args))


class LogoutHandler(BaseHandler):
    def get(self):
        set_cookie(self.response, "renren_user", "", expires=time.time() - 86400)
        self.redirect("/")

class RenRenAPIClient(object):
    def __init__(self, session_key = None, api_key = None, secret_key = None):
        self.session_key = session_key
        self.api_key = api_key
        self.secret_key = secret_key
    def request(self, params = None):
        """Fetches the given method's response returning from RenRen API.

        Send a POST request to the given method with the given params.
        """
        params["api_key"] = self.api_key
        params["call_id"] = str(int(time.time() * 1000))
        params["format"] = "json"
        params["session_key"] = self.session_key
        params["v"] = '1.0'
        sig = self.hash_params(params);
        params["sig"] = sig
        
        post_data = None if params is None else urllib.urlencode(params)
        
        #logging.info("request params are: " + str(post_data))
        
        file = urllib.urlopen(RENREN_API_SERVER, post_data)
        
        try:
            s = file.read()
            logging.info("api response is: " + s)
            response = _parse_json(s)
        finally:
            file.close()
        if type(response) is not list and response["error_code"]:
            logging.info(response["error_msg"])
            raise RenRenAPIError(response["error_code"], response["error_msg"])
        return response
    def hash_params(self, params = None):
        hasher = hashlib.md5("".join(["%s=%s" % (self.unicode_encode(x), self.unicode_encode(params[x])) for x in sorted(params.keys())]))
        hasher.update(self.secret_key)
        return hasher.hexdigest()
    def unicode_encode(self, str):
        """
        Detect if a string is unicode and encode as utf-8 if necessary
        """
        return isinstance(str, unicode) and str.encode('utf-8') or str
    
class RenRenAPIError(Exception):
    def __init__(self, code, message):
        Exception.__init__(self, message)
        self.code = code


def set_cookie(response, name, value, domain=None, path="/", expires=None):
    """Generates and signs a cookie for the give name/value"""
    logging.info("set cookie as " + name + ", value is: " + value)
    timestamp = str(int(time.time()))
    value = base64.b64encode(value)
    signature = cookie_signature(value, timestamp)
    cookie = Cookie.BaseCookie()
    cookie[name] = "|".join([value, timestamp, signature])
    cookie[name]["path"] = path
    if domain: cookie[name]["domain"] = domain
    if expires:
        cookie[name]["expires"] = email.utils.formatdate(
            expires, localtime=False, usegmt=True)
    response.headers._headers.append(("Set-Cookie", cookie.output()[12:]))


def parse_cookie(value):
    """Parses and verifies a cookie value from set_cookie"""
    if not value: return None
    parts = value.split("|")
    if len(parts) != 3: return None
    if cookie_signature(parts[0], parts[1]) != parts[2]:
        logging.warning("Invalid cookie signature %r", value)
        return None
    timestamp = int(parts[1])
    if timestamp < time.time() - 30 * 86400:
        logging.warning("Expired cookie %r", value)
        return None
    try:
        return base64.b64decode(parts[0]).strip()
    except:
        return None


def cookie_signature(*parts):
    """Generates a cookie signature.

    We use the renren app secret since it is different for every app (so
    people using this example don't accidentally all use the same secret).
    """
    hash = hmac.new(RENREN_APP_SECRET_KEY, digestmod=hashlib.sha1)
    for part in parts: hash.update(part)
    return hash.hexdigest()


def main():
    util.run_wsgi_app(webapp.WSGIApplication([
        (r"/", HomeHandler),
        (r"/auth/login", LoginHandler),
        (r"/auth/logout", LogoutHandler),
    ]))


if __name__ == "__main__":
    main()
