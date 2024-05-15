from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework import generics

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
    serializer_class = ProductsDetailSerializer
    queryset = Products.objects.all()

