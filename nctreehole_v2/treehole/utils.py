# -*- coding=UTF-8 -*-
from datetime import datetime, timedelta
from treehole.models import ContentModel, BlockIpModel

from treehole.settings import PAGE_ID
from treehole.renren import RenRen
import requests

MSG = {
        'IP_NOT_VALID': '不允许您的IP发布',
        'CONTENT_TOO_SHORT': '状态长度应该在2字以上',
        'CONTENT_TOO_LONG': '状态长度应该在140字一下',
        'TOO_MANY_TIMES': '每个IP相邻发布时间不能小于30分钟',
        'PUBLISH_ERROR': '服务器错误，发布失败',
        'RECAPTCHA_INCORRECT': '验证码错误',
        'RECAPTCHA_NEEDED': '请输入验证码',
        'PUBLISH_OK': '发布成功！'}
        
        
def postRawStatu(text):
    """ Post status without number, without saving to db"""
    r = RenRen()
    r.postStatus(text)

        
def postRenrenStatu(text):
    """ Post status, start with '#xxx', saving to db"""
    timenow = datetime.now()
    new_content = ContentModel(ip='127.0.0.1',
        time=timenow,
        content=text)
    new_content.save()
    number = ContentModel.objects.count()

    text = text + '    ----#' + str(number) + ' post'# + ', at ' + str(timenow)
    postRawStatu(text)
    
COLORS = [
        ('#1abc9c', '#16a085'),
        ('#2ecc71', '#27ae60'),
        ('#3498DB', '#2980B9'),
        ('#9B59B6', '#8E44AD'),
        ('#34495E', '#2C3E50'),
        ('#F1C40F', '#F39C12'),
        ('#E67E22', '#D35400'),
        ('#E74C3C', '#C0392B'),
        ('#95A5A6', '#7F8C8D')
        ]