#!/usr/bin/env python
# -*- coding=UTF-8 -*-

import requests
import json

#Apply for Access Token with AppID and AppSecret
#Post following info on browser address bar
#https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe78737f499bbe0ea&secret=e3d7330451604386949c8b090e2286b8

#Check for DIY menu with GET
#Post following info on browser address bar. Substitute the ACCESS_TOKEN
#https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN

ACCESS_TOKEN = "KqMdz8i190B-_uR_InS1RM6kLrzBxlNe7a_tteFN6RSCEJL9-fdw-HPxTjZPjnvo0I4KOYyeQg6OlwdmfFRS1cxpCqfLdYdZ5xUl_ZsOwcD2079KQJnrdv_YUDCPxBJ1gaPPsHSSj-zjeHMM5hV8vg"

url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + ACCESS_TOKEN


data =   {
             "button":[
             {
                  "type":"click",
                  "name":"今日歌曲",
                  "key":"V1001_TODAY_MUSIC"
              },
              {
                   "type":"click",
                   "name":"歌手简介",
                   "key":"V1001_TODAY_SINGER"
              },
              {
                   "name":"菜单",
                   "sub_button":[
                    {
                       "type":"click",
                       "name":"hello word",
                       "key":"V1001_HELLO_WORLD"
                    },
                    {
                       "type":"click",
                       "name":"赞一下我们",
                       "key":"V1001_GOOD"
                    }]
               }]
         }

#headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
try:
    #r = requests.post(url, data=json.dumps(data), headers=headers)
    data=json.dumps(data)
    req = requests.post(url, data)#.encode('utf-8')
except Exception, e:
    print "Couldn't do it: %s" % e
else:
    pass
finally:
    print
    print data
    print
    print "the return data is\n"
    print req.text + "\n"


print "finished"
print "Press Enter to exit"
raw_input()
