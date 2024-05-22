from djoser import serializers
from djoser.conf import settings
from djoser.serializers import User


class CurrentUserSerializer(serializers.UserSerializer):
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            "first_name",
            "last_name"
        )
        read_only_fields = (settings.LOGIN_FIELD,)
