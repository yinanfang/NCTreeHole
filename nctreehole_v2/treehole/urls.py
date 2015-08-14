# -*- coding=UTF-8 -*-
from django.conf.urls import patterns, url
from treehole import views

urlpatterns = patterns('',
    url(r'^$', 'treehole.views.index', name='index'),
    url(r'^blog$', 'treehole.views.blog', name='blog'),
    url(r'^about$', 'treehole.views.about', name='about'),
    url(r'^contact$', 'treehole.views.contact', name='contact'),
    #url(r'^(?P<pk>\d+)/$', views.AboutView.as_view(), name='about'),
    #url(r'^(?P<pk>\d+)/results/$', views.ResultsView.as_view(), name='results'),
    #url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
)