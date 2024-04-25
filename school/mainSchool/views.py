from django.db.models import Count, Max
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import FormView, TemplateView
from rest_framework import generics
from rest_framework.response import Response
import requests

from .forms import AddPostStudent, UpdateTeacherClass, DeleteStudent, ShowStudent
from .models import Students, StudyClasses
from .serializers import StudentsSerializer, UpdateTeacherClassSerializer, DeleteStudentSerializer
from .utils import FormsMixin


def home(request):
    data = {'title': 'Школа',
            }
    return render(request, 'mainSchool/index.html', context=data)


def news(request):
    data = {'title': 'Новости',
            }
    return render(request, 'mainSchool/news.html', context=data)


def reports(request):
    earliest_birthday = Students.objects.filter(study_class__class_name__regex=r"1\w{1}").aggregate(
        birthday=Max("birthday"))
    earliest_birthday_first_class_guy = Students.objects.get(birthday=earliest_birthday['birthday'])
    count_guys_in_second_classes = (Students.objects.filter(study_class__class_name__regex=r"2\w{1}")
                                    .aggregate(count=Count("pk")))
    teachers_students = StudyClasses.objects.values('teacher__second_name', 'teacher__name',
                                                    'teacher__last_name').annotate(total=Count('students'))

    data = {'title': 'Отчёты',
            'young': earliest_birthday_first_class_guy,
            'count_guys_in_second_classes': count_guys_in_second_classes['count'],
            'teachers_students': teachers_students,
            }
    return render(request, 'mainSchool/reports.html', context=data)


class AddStudentView(FormsMixin, FormView):
    form_class = AddPostStudent
    template_name = 'mainSchool/add_student.html'

    def post(self, request, *args, **kwargs):
        form = AddPostStudent(request.POST)
        if form.is_valid():
            api_url = 'http://127.0.0.1:8000/api/v1/students-list/'
            form.cleaned_data['study_class'] = form.cleaned_data['study_class'].pk
            requests.post(api_url, form.cleaned_data)
            return HttpResponseRedirect(reverse('mainSchool:forms'))
        self.extra_context['form1'] = form
        return render(request, template_name=self.template_name, context=self.extra_context)


class ShowStudentView(FormsMixin, FormView):
    form_class = ShowStudent

    def get(self, request, *args, **kwargs):
        form2 = ShowStudent(request.GET)
        if form2.is_valid() and form2.cleaned_data['study_class'] is not None:
            api_url = 'http://127.0.0.1:8000/api/v1/students-list/{0}/'.format(form2.cleaned_data['study_class'].pk)
            response = requests.get(api_url)
            data = None
            if response.status_code == 200:
                data = response.json()
            else:
                form2.add_error(None, 'Objects do not exist.')
            self.extra_context['students'] = data
            self.extra_context['form2'] = form2
            return render(request, template_name=self.template_name, context=self.extra_context)
        else:
            return HttpResponseRedirect(reverse('mainSchool:forms'))


class UpdateTeacherClassView(FormsMixin, FormView):
    form_class = UpdateTeacherClass

    def form_valid(self, form):
        study_class = form.cleaned_data['class_name'].pk
        api_url = 'http://127.0.0.1:8000/api/v1/study-classes/{0}/'.format(study_class)
        data = {
            'class_name': form.cleaned_data['class_name'].class_name,
            'teacher': form.cleaned_data['teacher'].pk
        }
        requests.patch(api_url, data)
        return super().form_valid(form)


class DeleteStudentView(FormsMixin, FormView):
    form_class = DeleteStudent

    def form_valid(self, form):
        if self.extra_context['confirm']:
            form.cleaned_data['id'].auth.delete()
            return super().form_valid(form)
        else:
            self.extra_context['confirm'] = True
            self.extra_context['form4'] = form
            return render(self.request, self.template_name, context=self.extra_context)


class SchoolForms(FormsMixin, TemplateView):
    extra_context = {
        'title': 'Формы',
        'form1': AddPostStudent(),
        'form2': ShowStudent(),
        'students': None,
        'form3': UpdateTeacherClass(),
        'form4': DeleteStudent(),
        'confirm': False
    }


def page_not_found(request, exception):
    return HttpResponse("<h1>Страница не найдена</h1>")


# ---------------------------------API--------------------------------------
class StudentsApiView(generics.ListCreateAPIView):
    serializer_class = StudentsSerializer
    queryset = Students.objects.all()

    def get(self, request, *args, **kwargs):
        cls_id = kwargs.get('study_class', None)
        if cls_id is None:
            return self.list(request, *args, **kwargs)
        try:
            cls = StudyClasses.objects.get(pk=cls_id)
        except:
            return Response({"error": "Object does not exist."})
        self.queryset = cls.students.all()
        return self.list(request, *args, **kwargs)

    # def get(self, request, cls):
    #     try:
    #         cls = StudyClasses.objects.get(pk=cls)
    #     except:
    #         return Response({"error": "Object does not exist."})
    #     students = cls.students.all()
    #     return Response({'students': StudentsSerializer(students, many=True).data})


class UpdateClassTeacherApiView(generics.UpdateAPIView):
    queryset = StudyClasses.objects.all()
    serializer_class = UpdateTeacherClassSerializer


class DeleteStudentApiView(generics.DestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = DeleteStudentSerializer
