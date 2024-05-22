from django.contrib import admin

from mainSchool.models import Students, Teachers, StudyClasses


# Register your models here.
@admin.register(Students)
class StudentsAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'study_class')
    list_display_links = ('id', '__str__')
    list_per_page = 20
    search_fields = ['name', 'second_name', 'last_name']
    list_filter = ['study_class']


@admin.register(Teachers)
class TeachersAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'birthday')
    list_display_links = ('id', '__str__')
    list_per_page = 20
    search_fields = ['name', 'second_name', 'last_name']


@admin.register(StudyClasses)
class StudyClassesAdmin(admin.ModelAdmin):
    list_display = ('id', 'class_name', 'teacher')
    list_display_links = ('id', 'class_name')
    list_per_page = 20
    search_fields = ['class_name']
    list_filter = ['teacher']
    ordering = ['class_name']
