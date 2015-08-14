# -*- coding: utf-8 -*-
 
LOGINURL = r'http://www.renren.com/PLogin.do'
ICODEURL = r'http://icode.renren.com/getcode.do?t=login&rnd=Math.random()'
 
EMAIL = r'nctreehole@outlook.com'
PASSWORD = r'123456hole'
 
# FailCode via "login-v6.js"
FAILCODE = {
            '-1': 'login success',
            '0': 'login system error, try again later',
            '1': '1 username and password not match',
            '2': '2 username and password not match',
            '4': '4 username and password not match',
            '8': 'please input you username and password',
            '16': '16您的账号已停止使用',
            '32': '32帐号未激活，请激活帐号',
            '64': '64您的帐号需要解锁才能登录',
            '128': '128您的用户名和密码不匹配',
            '512': '512 input verification code please',
            '4096': '4096登录系统错误，稍后尝试',
}