#!/usr/bin/env python
# -*- coding=UTF-8 -*-

import sys
if hasattr(sys, 'setdefaultencoding'):
    sys.setdefaultencoding('UTF-8')

from wechat.settings import WEIXIN_TOKEN
import hashlib
import xml.etree.ElementTree as ET
import logging
def checkSig(req):
    #logging.error("Got at the start of CheckSig")

    signature = req.GET.get("signature", None)
    timestamp = req.GET.get("timestamp", None)
    nonce = req.GET.get("nonce", None)
    tmp = ''.join(sorted([WEIXIN_TOKEN, timestamp, nonce]))
    tmp = hashlib.sha1(tmp).hexdigest()

    # if tmp == signature:
    #     logging.error("tmp equals sig")
    # else:
    #     logging.error("shit they are not equal")

    return tmp == signature

def parseXml(req):
    xml_tree = ET.fromstring(req.body)
    content = dict()
    for i in xml_tree:
        content[i.tag] = i.text
    return content

def makeXml(dic, root_tag = 'xml'):
    xml_tree = ET.Element(root_tag)
    def _make_node(root, key, val):
        if type(val) == ET.Element:
            root.append(val)
            return
        node = ET.SubElement(root, key)
        if type(val) == str or type(val) == unicode:
            node.text = val
        elif type(val) == dict:
            for i in val:
                _make_node(node, i, val[i])
    for i in dic:
        _make_node(xml_tree, i, dic[i])
    return xml_tree
# return ET.tostring(xml_tree)
