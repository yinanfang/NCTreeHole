# -*- coding=UTF-8 -*-
from renren import RenRen 

if __name__ == '__main__':
    text='测试'
    
    r = RenRen()
    r.postStatus(text)