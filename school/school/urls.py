"""
URL configuration for school project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from mainSchool.views import page_not_found, StudentsApiView, UpdateClassTeacherApiView, DeleteStudentApiView

# Обращение к View осуществляется в виде: 'namespace_name:app_url_name'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mainSchool.urls', namespace='mainSchool')),
    path('', include('users.urls', namespace='users')),
    path('api/v1/students-list/', StudentsApiView.as_view()),
    path('api/v1/students-list/<int:study_class>/', StudentsApiView.as_view()),
    path('api/v1/study-classes/<int:pk>/', UpdateClassTeacherApiView.as_view()),
    path('api/v1/delete-student/<int:pk>/', DeleteStudentApiView.as_view()),
    path("__debug__/", include("debug_toolbar.urls")),
]
handler_404 = page_not_found

admin.site.site_header = "Панель администрирования"
admin.site.index_title = "МБОУ СОШ №6"

