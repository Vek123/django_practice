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
from django.conf.urls.static import static
from django.urls import path, include, re_path

from mainSchool.views import page_not_found, ReportsApiView
from school import routers, settings
from .utils import CustomAuthToken, CustomAuthTokenLogout

# Обращение к View осуществляется в виде: 'namespace_name:app_url_name'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mainSchool.urls', namespace='mainSchool')),
    path('', include('users.urls', namespace='users')),
    path('api/v1/', include(routers.router.urls)),
    path('auth/token/login/', CustomAuthToken.as_view()),
    path('auth/token/logout/', CustomAuthTokenLogout.as_view()),
    re_path(r'^auth/', include('djoser.urls')),
    path('api/v1/reports', ReportsApiView.as_view()),
    path("__debug__/", include("debug_toolbar.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
handler_404 = page_not_found

admin.site.site_header = "Панель администрирования"
admin.site.index_title = "МБОУ СОШ №6"

