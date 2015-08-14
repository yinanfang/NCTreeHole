# -*- coding: utf-8 -*-
 
import urllib
import urllib2
import cookielib
import re
 
import config
 
class Renren(object):
    def __init__(self):
        self.operate = ''  # response的对象（不含read）
        self.requestToken = self.rtk = ''
        self.icode = ''  # 验证码
        self.is_login = False
            
        self.cj = cookielib.CookieJar()
        self.opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(self.cj))
        urllib2.install_opener(self.opener)
        
        self.requestToken_pattern = re.compile(r"get_check:'([-0-9]*)'")
        self.rtk_pattern = re.compile(r"get_check_x:'([a-zA-Z0-9]+)'")
 
    def login(self, email='', password='', origURL=''):
        postdata = {
                         'email': email,
                         'password': password,
                         'origURL': origURL,
        }
 
        ruid_pattern = re.compile(r"'ruid':'(\d+)'")
        failCode_pattern = re.compile(r"&failCode=(\d+)")
        
        print 'Login...'
        
        while not self.is_login:
            self.operate = self._get_response(config.LOGINURL, postdata)
            cur_url = self.operate.geturl()
            web_content = self.operate.read()
            ruid = ruid_pattern.search(web_content)
            
            if ruid:
                self.is_login = True
                print "user  %s %s" % (ruid.group(1), config.FAILCODE['-1'])
                raw_input('Press Enter to exit')
            else:
                failCode = failCode_pattern.search(cur_url)
                if not failCode:
                    print 'rr无法获得错误代码'
                else:
                    definate_failCode = failCode.group(1)  # 确切的failCode字符串
                    if definate_failCode in config.FAILCODE.keys():
                        print config.FAILCODE[definate_failCode]
                        
                        if definate_failCode == '512':
                            self._get_icode_img()
                            self.icode = raw_input("please input the verification code: ")
                            postdata['icode'] = self.icode
                            continue
                    else:
                        print 'AA未知错误'
                return False
    
    def _get_response(self, url, data = None):
        if data is not None:
            req = urllib2.Request(url, urllib.urlencode(data))
        else:
            req = urllib2.Request(url)
        
        response = self.opener.open(req)
        return response
    
    def _get_requestToken(self, data):
        self.requestToken = self.requestToken_pattern.search(data).group(1)
        self.rtk = self.rtk_pattern.search(data).group(1)
    
    def _get_icode_img(self):
        icode_img = self._get_response(config.ICODEURL).read()
        self._write_file('icode.jpg', icode_img)
    
    def _write_file(self, filename, data):
        try:
            output_file = open(filename, 'wb')
            output_file.writelines(data)
            output_file.close()
            print 'file %s written successfully!' % filename
        except IOError:
            print "写文件失败！"