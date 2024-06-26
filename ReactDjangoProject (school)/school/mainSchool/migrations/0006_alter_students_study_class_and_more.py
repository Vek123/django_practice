# Generated by Django 4.2.1 on 2024-04-10 09:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainSchool', '0005_remove_studyclasses_students_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='students',
            name='study_class',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainSchool.studyclasses'),
        ),
        migrations.AlterField(
            model_name='studyclasses',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainSchool.teachers'),
        ),
    ]
