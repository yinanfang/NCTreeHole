# -*- coding=UTF-8 -*-
from django.conf.urls import patterns, include, url
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('treehole.urls', namespace="treehole")),
    url(r'^chart_day/', include('treehole.urls', namespace="treehole")),
    url(r'^chart_hour/', include('treehole.urls', namespace="treehole")), 

    # Examples:
    # url(r'^$', 'nctreehole.views.home', name='home'),
    # url(r'^nctreehole/', include('nctreehole.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)
