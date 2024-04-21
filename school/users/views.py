from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from users.forms import LoginUserForm


# Create your views here.
def login_user(request):
    data = {'title': 'Школа'}
    if request.method == 'POST':
        form = LoginUserForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, username=cd['username'], password=cd['password'])
            if user and user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('mainSchool:home'))
    else:
        form = LoginUserForm()
    data['form'] = form
    return render(request, 'users/login.html', context=data)


def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse('users:login'))
