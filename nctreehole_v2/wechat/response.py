#!/usr/bin/env python
# -*- coding:utf-8 -*-
#*********************************************************#
# @@ScriptName: reponse.py
# @@Author: Lucas<yinan_fang@hotmail.com>
# @@Create Date: 2013-08-13 16:16:43
# @@Modify Date: 2013-08-13 16:49:59
# @@Function:
#*********************************************************##!/

import sys
if hasattr(sys, 'setdefaultencoding'):
    sys.setdefaultencoding('UTF-8')

import os
import imp

FILE_DIR = os.path.realpath(os.path.dirname(__file__))
sys.path.append(os.path.join(FILE_DIR, 'lib'))
PLUGIN_DIR = os.path.join(FILE_DIR, 'plugins')

_files = os.listdir(PLUGIN_DIR)
_files = filter(lambda x: x.endswith('.py'), _files)
plugins = []

for x in _files:
    name = x.replace('.py', '')
    fp, pathname, desc = imp.find_module(name, [PLUGIN_DIR])
    plugins.append(imp.load_module(name, fp, pathname, desc))

def response(text):
    try:
        plugin = filter(lambda x: x.predict(text), plugins)[0]
    except IndexError:
        print >> sys.stderr, 'None available'
        return 'No handler found.'
    print >> sys.stderr, 'Handle using', plugin
    return plugin.handle(text)

if __name__ == '__main__':
    print response(sys.argv[1].decode('utf8'))
