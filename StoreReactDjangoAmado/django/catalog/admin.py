from django.contrib import admin

from catalog.models import Products


# Register your models here.
@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'description', 'image')
    list_display_links = ('id', 'title')
    list_per_page = 20

