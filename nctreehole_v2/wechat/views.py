#!/usr/bin/env python
# -*- coding=UTF-8 -*-

from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.http import require_http_methods
from django.template import RequestContext
from django.shortcuts import render_to_response, redirect
from django.contrib import messages
from .utils import *
from .messages import *
#from wechat.response import response

import logging

def index(req):

    logging.error("Got before checkSig")
    if not checkSig(req):
        return HttpResponseForbidden()

    logging.error("Finished checkSig")

    if req.method == 'GET':
        return HttpResponse(req.GET.get('echostr', ''))

    logging.error("Before parseXml")
    req_msg = parseXml(req)
    ret = 'Received posted message. It is on RenRen.'
    logging.error("Finished parsing")
    # if req_msg.get('MsgType', '') == 'text':
    #     ret = response(req_msg.get('Content', ''))

    return HttpResponse(makeTextMsg(req_msg, ret))
