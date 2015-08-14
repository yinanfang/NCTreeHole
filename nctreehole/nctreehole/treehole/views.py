# -*- coding=UTF-8 -*-
from django.shortcuts import render
from django.contrib import messages
from treehole.utils import MSG, postRenrenStatu
from django.template import RequestContext
from treehole.models import ContentModel, PlaceholderModel

import logging

from nctreehole.settings import PROJECT_PATH
from django.contrib.sites.models import Site

def index(request):
    _content = ''
    if request.method == 'POST':
        _content = request.POST.get('content', '')
        
        if len(_content) < 3:
            messages.error(request, MSG['CONTENT_TOO_SHORT'])
            
        elif len(_content) >= 140:
            messages.error(request, MSG['CONTENT_TOO_LONG'])
        else:
            try:
                postRenrenStatu(_content)
            
            
            except Exception, ex:
                logging.exception("Something awful happened!")
            
            except Exception as inst:
                messages.error(request, inst.args)
                
            except:
                messages.error(request, MSG['PUBLISH_ERROR'])
            else:
                messages.success(request, MSG['PUBLISH_OK'])
                _content = ''
    return render(request, 'index.html', {
                'content': _content,
                'PLACEHOLER': '留下你没能说出的话',#'年轻时我们放弃，以为那不过是一段感情。可是最后才知道，那其实是一生。', #Site.objects.get_current().domain#request.get_host
            })
            
            
def blog(request):

    return render(request, 'blog.html', {

            })
            
            
def about(request):

    return render(request, 'about.html', {

            })
            
def contact(request):

    return render(request, 'contact.html', {

            })

            
            
            
            
            
            
            
            