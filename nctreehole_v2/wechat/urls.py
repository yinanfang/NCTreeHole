# -*- coding=UTF-8 -*-
from django.conf.urls import patterns, url
from wechat import views

urlpatterns = patterns('',
    url(r'^$', 'wechat.views.index', name='index'),

)