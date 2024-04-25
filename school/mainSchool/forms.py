import datetime
from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.deconstruct import deconstructible
import re

from .models import Students, StudyClasses, make_login_rus2eng, Teachers

study_classes = StudyClasses.objects.all()


@deconstructible
class DateValidator:
    code = 'invalidDate'

    def __init__(self, message=None):
        self.message = message if message else "Дата указана некорректно."

    def __call__(self, value, *args, **kwargs):
        today = datetime.date.today()
        if not (value <= today):
            raise ValidationError(self.message, code=self.code)


class AddPostStudent(forms.ModelForm):
    # auth_id = forms.IntegerField(required=False, label='Логин_id', initial=None)
    second_name = forms.CharField(max_length=50, label='Фамилия', validators=[RegexValidator(regex=r'\b[А-Я]')])
    name = forms.CharField(max_length=50, label='Имя', validators=[RegexValidator(regex=r'\b[А-Я]')])
    last_name = forms.CharField(max_length=50, required=False, label='Отчество',
                                validators=[RegexValidator(regex=r'\b[А-Я]')])
    birthday = forms.DateField(validators=[DateValidator()], label='Дата рождения')
    study_class = forms.ModelChoiceField(queryset=study_classes, empty_label='Класс не выбран',
                                         label='Класс обучения')

    def clean(self):
        cleaned_data = super().clean()
        if not (self.is_valid()):
            raise forms.ValidationError('Ошибка ввода!')

        data = list()
        data.append(cleaned_data.get('birthday'))
        data.append(cleaned_data.get('second_name'))
        data.append(cleaned_data.get('name'))
        data.append(cleaned_data.get('last_name'))

        for word in data[1:]:
            no_word_check = re.search(r'[\d\s\W]+', word)
            if no_word_check:
                raise forms.ValidationError('Форма заполнена неверно!')

        login = make_login_rus2eng(*data)
        if User.objects.filter(username=login).exists():
            raise forms.ValidationError('Такой пользователь уже существует!')
        return cleaned_data

    class Meta:
        model = Students
        fields = ['second_name', 'name', 'last_name', 'birthday', 'study_class']


class ShowStudent(forms.ModelForm):
    study_class = forms.ModelChoiceField(queryset=study_classes, empty_label='Класс не выбран',
                                         label='Класс обучения', required=True)

    class Meta:
        model = Students
        fields = ['study_class']

    def __init__(self, *args, **kwargs):
        study_class = kwargs.pop('study_class', None)
        super().__init__(*args, **kwargs)
        if study_class:
            self.fields['study_class'].queryset = StudyClasses.objects.filter(class_name=study_class)


class UpdateTeacherClass(forms.ModelForm):
    class_name = forms.ModelChoiceField(queryset=study_classes, empty_label='Класс не выбран',
                                        label='Класс обучения')
    teacher = forms.ModelChoiceField(queryset=Teachers.objects.all(), empty_label='Учитель не выбран',
                                     label='Учитель')

    class Meta:
        model = StudyClasses
        fields = ['class_name', 'teacher']


class DeleteStudent(forms.ModelForm):
    id = forms.ModelChoiceField(queryset=Students.objects.all(), empty_label='Ученик не выбран',
                                label='Ученик')

    class Meta:
        model = Students
        fields = ['id']
