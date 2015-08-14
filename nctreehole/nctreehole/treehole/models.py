# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.


class ContentModel(models.Model):
    ip = models.CharField(max_length=20, db_index=True)
    time = models.DateTimeField(db_index=True)
    content = models.CharField(max_length=200)

class PlaceholderModel(models.Model):
    content = models.CharField(max_length=200)
    time = models.DateTimeField(db_index=True)

class BlockIpModel(models.Model):
    ip = models.CharField(max_length=20, db_index=True)