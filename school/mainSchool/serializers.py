from rest_framework import serializers

from mainSchool.models import Students, StudyClasses


class StudentsSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField()
    # second_name = serializers.CharField(max_length=50)
    # name = serializers.CharField(max_length=50)
    # last_name = serializers.CharField(max_length=50, allow_blank=True)
    # birthday = serializers.DateField()
    # study_class = serializers.DjangoModelField()
    class Meta:
        model = Students
        fields = '__all__'


class UpdateTeacherClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyClasses
        fields = '__all__'


class DeleteStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'
