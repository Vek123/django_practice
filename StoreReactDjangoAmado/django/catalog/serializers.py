from rest_framework import serializers

from catalog.models import Products


class ProductsBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'title', 'price', 'image', 'description']


class ProductsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
