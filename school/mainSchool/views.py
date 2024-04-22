from django.db.models import Min, Count, Max
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse, reverse_lazy
from django.views.generic import FormView, CreateView, TemplateView

from mainSchool.forms import AddPostStudent, UpdateTeacherClass, DeleteStudent, ShowStudent
from mainSchool.models import Students, Teachers, StudyClasses
from mainSchool.utils import FormsMixin


# Create your views here.
# nav_menu = [{'id': 1, 'title': 'Новости', 'link': None},
#             {'id': 2, 'title': 'Войти', 'link': None},
#             ]


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


class AddStudentView(FormsMixin, CreateView):
    form_class = AddPostStudent
    template_name = 'mainSchool/add_student.html'


class ShowStudentView(FormsMixin, FormView):
    form_class = ShowStudent

    def get(self, request, *args, **kwargs):
        form2 = ShowStudent(request.GET)
        if form2.is_valid() and form2.cleaned_data['study_class'] is not None:
            self.extra_context['students'] = form2.cleaned_data['study_class'].students.all()
            self.extra_context['form2'] = form2
            return render(request, template_name=self.template_name, context=self.extra_context)
        else:
            return HttpResponseRedirect(reverse('mainSchool:forms'))


class UpdateTeacherClassView(FormsMixin, FormView):
    form_class = UpdateTeacherClass

    def form_valid(self, form):
        study_class = form.cleaned_data['class_name']
        teacher = form.cleaned_data['teacher']
        study_class.teacher = teacher
        study_class.save()
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
