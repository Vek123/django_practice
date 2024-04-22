from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from users.forms import LoginUserForm


# Create your views here.
class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'users/login.html'
    extra_context = {'title': 'Школа'}


# def login_user(request):
#     if not request.user.is_anonymous:
#         return HttpResponseRedirect(reverse('mainSchool:home'))
#     data = {'title': 'Школа'}
#     if request.method == 'POST':
#         form = LoginUserForm(request.POST)
#         if form.is_valid():
#             cd = form.cleaned_data
#             user = authenticate(request, username=cd['username'], password=cd['password'])
#             if user and user.is_active:
#                 login(request, user)
#                 return HttpResponseRedirect(reverse('mainSchool:home'))
#     else:
#         form = LoginUserForm()
#     data['form'] = form
#     return render(request, 'users/login.html', context=data)


# def logout_user(request):
#     logout(request)
#     return HttpResponseRedirect(reverse('users:login'))
