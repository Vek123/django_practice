import os
import shutil

from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework import generics
from store.settings import base

from catalog.models import Products
from catalog.serializers import ProductsBasicSerializer, ProductsDetailSerializer


# Create your views here.
class ProductsListApiViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductsBasicSerializer
    queryset = Products.objects.all()


class ProductsDetailApiViewSet(mixins.RetrieveModelMixin,
                               mixins.UpdateModelMixin,
                               mixins.DestroyModelMixin,
                               viewsets.GenericViewSet):
    def update(self, request, *args, **kwargs):
        shutil.rmtree(f"{base.MEDIA_ROOT}\\images\\{request.POST['title']}")
        os.mkdir(f"{base.MEDIA_ROOT}\\images\\{request.POST['title']}")
        response = super().update(request, *args, **kwargs)

        return response

    serializer_class = ProductsDetailSerializer
    queryset = Products.objects.all()

