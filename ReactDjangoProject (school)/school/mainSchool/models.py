from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


def make_login_rus2eng(birthday, *fio):
    letters = {'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
               'й': 'iy', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
               'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
               'э': 'e', 'ю': 'yu', 'я': 'ya'}
    result = ''
    for name_index, name in enumerate(fio):
        for let_index, let_value in enumerate(name):
            if name_index == 0 and let_index == 0:
                translated_let_lower = letters[let_value.lower()]
                result += translated_let_lower.upper() if len(translated_let_lower) == 1\
                    else translated_let_lower[0].upper() + translated_let_lower[1:]
            elif name_index in [1, 2]:
                translated_let_lower = letters[name[0].lower()]
                result += translated_let_lower.upper() if len(translated_let_lower) == 1\
                    else translated_let_lower[0].upper()
                break
            else:
                result += letters[let_value.lower()]
    birth_hash = birthday.day + birthday.month + birthday.year
    # unique fio and birthday check
    while Students.objects.filter(auth__username=result+str(birth_hash)).exists():
        birth_hash += 1
    result += str(birth_hash)
    return result


# Create your models here.
class Teachers(models.Model):
    auth = models.OneToOneField(User, on_delete=models.CASCADE, default=None, unique=True, verbose_name='Логин',
                                blank=True, null=True)
    second_name = models.CharField(max_length=50, verbose_name='Фамилия')
    name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, blank=True, verbose_name='Отчество')
    birthday = models.DateField(verbose_name="Дата рождения")
    supervisor = models.BooleanField(default=False, verbose_name='Суперпользователь(1 / 0)')

    def __str__(self):
        return self.second_name + " " + self.name + " " + self.last_name

    def save(self, *args, **kwargs):
        if self.auth is None:
            self.auth = User.objects.create_user(
                username=make_login_rus2eng(self.birthday, self.second_name, self.name, self.last_name),
                password='xxXX1234', first_name=self.name, last_name=self.second_name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Учитель'
        verbose_name_plural = 'Учителя'


class StudyClasses(models.Model):
    class_name = models.CharField(max_length=5, verbose_name="Название")
    teacher = models.ForeignKey(Teachers, on_delete=models.SET_NULL, null=True, verbose_name='Учитель')

    def __str__(self):
        return self.class_name

    class Meta:
        verbose_name = 'Класс'
        verbose_name_plural = 'Классы'


class Students(models.Model):
    auth = models.OneToOneField(User, on_delete=models.CASCADE, default=None, unique=True, related_name="student",
                                verbose_name='Логин', blank=True, null=True)
    second_name = models.CharField(max_length=50, verbose_name='Фамилия')
    name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, blank=True, null=True, verbose_name='Отчество')
    birthday = models.DateField(verbose_name='Дата рождения')
    study_class = models.ForeignKey(StudyClasses, on_delete=models.SET_NULL, null=True, related_name="students",
                                    verbose_name="Класс")

    def __str__(self):
        return self.second_name + " " + self.name + " " + self.last_name

    def save(self, *args, **kwargs):
        if self.auth is None:
            self.auth = User.objects.create_user(
                username=make_login_rus2eng(self.birthday, self.second_name, self.name, self.last_name),
                password='xxXX1234', first_name=self.name, last_name=self.second_name)
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.auth.delete()
        super().delete(using, keep_parents)

    class Meta:
        verbose_name = 'Учащийся'
        verbose_name_plural = 'Учащиеся'
