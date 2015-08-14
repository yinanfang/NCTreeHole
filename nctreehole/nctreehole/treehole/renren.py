# coding=utf-8
#!/usr/bin/python
import requests
from treehole.settings import Access_Token, PAGE_ID

import httplib2
from BeautifulSoup import BeautifulSoup
from nctreehole.settings import COOKIR_PATH
from time import sleep
import urllib
import urllib2
import cookielib
import string
BASE_URL = 'http://3g.renren.com/status/newstatus.do'

class RenRen:
    
    def __init__(self):
        self.initialSender()
        html = self.login()
        self.status = self.getHiddenInfo(html)

        
    def postStatus(self, text):
        #raise Exception('post')
        #content = unicode(text, "utf-8")

        #text.encode('utf-8')
        #content = text
        
        count = 0
        self.status['content'] = text.encode('utf-8') #+ 'no' + str(count) + 'times'
        
        self.sendStatus(self.status)
        #raise Exception('here')
        #print self.status

    def initialSender(self):
        #set cookie
        cookie = cookielib.CookieJar()
        opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))
        urllib2.install_opener(opener)

    def login(self):
        ''' input email and pwd, return the html string after login'''
        xn = {}
        xn['email'] = 'nctreehole@outlook.com'#raw_input('email: ')
        xn['password'] = '123456hole'#raw_input('password: ')
        info = urllib.urlencode(xn)
        request = urllib2.Request('http://www.renren.com/PLogin.do', info)
        response = urllib2.urlopen(request)
        html = response.read()
        #print html
        return html

    digits = string.digits
    
    def getHiddenNumber(self, key, html):
        '''get the first number after str key'''
        position = html.find(key) + len(key)
        while html[position] not in self.digits:
            position = position + 1
        number = 0
        while html[position] in self.digits:
            number = number * 10 + int(html[position])
            position = position + 1
        return number


    def getHiddenInfo(self, html):
        '''some hidden key and values not in the form, but need to be sent'''
        hiddenInfo = {}
        hiddenInfo['hostid'] = str(self.getHiddenNumber('hostid', html))
        hiddenInfo['requestToken'] = str(self.getHiddenNumber('get_check', html))
        hiddenInfo['channel'] = 'renren'
        # get _rtk, _rtk is a string
        left = html.find('get_check_x') + len('get_check_x')
        while True:
            if html[left] == "'":
                break
            left = left + 1
        right = left + 1
        while True:
            if html[right] == "'":
                break
            right = right + 1
        hiddenInfo['_rtk'] = html[left + 1: right]
        #print hiddenInfo
        return hiddenInfo

    def sendStatus(self,status):
        status = urllib.urlencode(status)
        req = urllib2.Request('http://shell.renren.com/601769741/status', status)
        resp = urllib2.urlopen(req)
        html = resp.read()


        
        




class RenRen_3g_renren:

    def __init__(self):
        self.session = requests.session()
        cookie = open(COOKIR_PATH).read()
        cookie = cookie.strip().split(';')
        cookie = map(lambda x: x.split('=', 1), cookie)
        cookie = dict(cookie)
        self.session.cookies = requests.utils.cookiejar_from_dict(cookie)

    def postStatus(self, text):
        soup = BeautifulSoup(self.session.get(BASE_URL).content)
        form = soup.find('form')
        assert(form is not None)
        values = map(lambda x: (x['name'], x['value']), form.findAll('input', type='hidden'))
        data = {'status': text}
        data.update(dict(values))
        req = self.session.post(form['action'], data)
        # save cookie
        with open(COOKIR_PATH, 'w') as f:
            cookie = requests.utils.dict_from_cookiejar(self.session.cookies)
            cookie = '; '.join([k+'='+v for k, v in cookie.iteritems()])
            f.write(cookie)
        
        raise Exception('post', 'end',req.text)
        







class RenRen_API:

    def __init__(self, pageid):
        self.pageid = pageid

    def postStatus(self, text):
        
        r = requests.post('https://api.renren.com/restserver.do',
                {
                    'v': '1.0',
                    'access_token': Access_Token,
                    'format': 'json',
                    'method': 'pages.setStatus',
                    'page_id': PAGE_ID,
                    'status': text
                    })
                    
        # for different versions of requests
        j = r.json() if hasattr(r.json, '__call__') else r.json
        assert(j['result'] == 1)
                
