from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.utils.deprecation import MiddlewareMixin
from djoser.views import TokenDestroyView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        set_cookie_str = f'Token={token}; Path=/; Secure; HttpOnly; SameSite=None; Partitioned;'
        response = Response({
            'user_id': user.pk,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
        response.headers['Set-Cookie'] = set_cookie_str
        return response


class CustomAuthTokenLogout(TokenDestroyView):
    def post(self, request):
        response = super().post(request)
        delete_cookie_str = f'Token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Secure; HttpOnly; SameSite=None; Partitioned;'
        response.headers['Set-Cookie'] = delete_cookie_str
        return response
