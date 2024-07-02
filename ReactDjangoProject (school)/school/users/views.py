from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.http import HttpResponseRedirect
from django.urls import reverse
from users.forms import LoginUserForm


# Create your views here.
class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'users/login.html'
    extra_context = {'title': 'Школа'}


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('mainSchool:home'))
