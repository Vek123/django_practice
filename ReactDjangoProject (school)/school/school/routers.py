from rest_framework import routers

from mainSchool.views import StudyClassApiViewSet, StudentsApiViewSet, TeachersApiViewSet

router = routers.DefaultRouter()
router.register(r'studyclasses', StudyClassApiViewSet)
router.register(r'students', StudentsApiViewSet)
router.register(r'teachers', TeachersApiViewSet)

