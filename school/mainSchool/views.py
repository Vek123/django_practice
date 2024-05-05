from django.db.models import Count, Max
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import FormView, TemplateView
from rest_framework import generics, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
import requests
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from .forms import AddPostStudent, UpdateTeacherClass, DeleteStudent, ShowStudent
from .models import Students, StudyClasses, Teachers
from .serializers import StudentsSerializer, StudyClassSerializer, TeachersSerializer
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
            api_url = 'http://127.0.0.1:8000/api/v1/students/'
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
            api_url = 'http://127.0.0.1:8000/api/v1/studyclasses/{0}/students/'.format(form2.cleaned_data['study_class'].pk)
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
        api_url = 'http://127.0.0.1:8000/api/v1/studyclasses/{0}/'.format(study_class)
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
class StudentsApiViewSet(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer


class StudyClassApiViewSet(mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           GenericViewSet):
    serializer_class = StudyClassSerializer
    queryset = StudyClasses.objects.all()

    @action(methods=['get'], detail=True)
    def students(self, request, pk):
        cls = StudyClasses.objects.get(pk=pk)
        students = cls.students.all()
        students_serializer = StudentsSerializer
        return Response(students_serializer(students, many=True).data)


class ReportsApiView(APIView):
    earliest_birthday = Students.objects.filter(study_class__class_name__regex=r"1\w{1}").aggregate(
        birthday=Max("birthday"))
    earliest_birthday_first_class_guy = Students.objects.get(birthday=earliest_birthday['birthday'])
    count_guys_in_second_classes = (Students.objects.filter(study_class__class_name__regex=r"2\w{1}")
                                    .aggregate(count=Count("pk")))
    teachers_students = StudyClasses.objects.values('teacher__second_name', 'teacher__name',
                                                    'teacher__last_name').annotate(total=Count('students')).order_by('-total')

    def get(self, request):
        return Response({
            "earliest_birthday_first_class_guy": StudentsSerializer(self.earliest_birthday_first_class_guy).data,
            "count_guys_in_second_classes": self.count_guys_in_second_classes['count'],
            "teachers_students": list(self.teachers_students)
        })


class TeachersApiViewSet(viewsets.ModelViewSet):
    serializer_class = TeachersSerializer
    queryset = Teachers.objects.all()
