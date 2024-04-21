from django.urls import path
from . import views

app_name = 'mainSchool'

urlpatterns = [
    path('', views.home, name='home'),
    path('news/', views.news, name='news'),
    path('reports/', views.reports, name='reports'),
    path('forms/', views.forms, name='forms'),
    path('forms/add-student', views.AddStudentView.as_view(), name='addStud'),
    path('forms/show-students', views.ShowStudentView.as_view(), name='showStud'),
    path('forms/update-teacher-class', views.UpdateTeacherClassView.as_view(), name='updateTeacherClass'),
    path('forms/delete-student', views.DeleteStudentView.as_view(), name='deleteStudent')
]
