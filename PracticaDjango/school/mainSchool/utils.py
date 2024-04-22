from django.urls import reverse_lazy

from mainSchool.forms import AddPostStudent, ShowStudent, UpdateTeacherClass, DeleteStudent

menu = [{'name': 'НОВОСТИ', 'slug': 'mainSchool:news', 'position': 10},
        {'name': 'ОТЧЁТЫ', 'slug': 'mainSchool:reports', 'position': 2},
        {'name': 'ФОРМЫ', 'slug': 'mainSchool:forms', 'position': 3},
        ]


class FormsMixin:
    template_name = 'mainSchool/forms.html'
    success_url = reverse_lazy('mainSchool:forms')
    extra_context = {
            'title': 'Формы',
            'form1': AddPostStudent(),
            'form2': ShowStudent(),
            'students': None,
            'form3': UpdateTeacherClass(),
            'form4': DeleteStudent(),
            'confirm': False
    }

