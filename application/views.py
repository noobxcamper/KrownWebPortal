from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from application.models import Customer
from application.forms import RegistrationForm, sign_in_form
from KrownPortal.settings import GOOGLE_API_KEY
from . import utilities

# Create your views here.

@login_required(login_url='/accounts/login', redirect_field_name=None)
@csrf_exempt
def dashboard(request):
    if request.method == 'GET':
        if (request.user.groups.filter(name="Staff").exists()):
            customer_list = Customer.objects.all()
            context_dict = {'customers': customer_list}

            return render(request, 'dashboard.html', context_dict)
        else:
            return redirect('/registration/')
    
    if request.method == 'POST':
        print(request.body)

        customer = Customer()
        customer.first_name = request.POST['first_name'].upper()
        customer.last_name = request.POST['last_name'].upper()
        customer.email = request.POST['email']
        customer.phone = request.POST['phone']
        customer.address = request.POST['address']
        customer.city = request.POST['city']
        customer.postal_code = request.POST['postal']
        customer.make = request.POST['make'].upper()
        customer.model = request.POST['model'].upper()

        customer.save()

        return redirect('registration/')
    
def clear_table(request):
    Customer.objects.all().delete()
    return redirect('/')

def refresh_table(request):
    return redirect('/')

@login_required(login_url='/accounts/login', redirect_field_name=None)
def registration(request):
    return render(request, 'registration.html', {"google_api_key":GOOGLE_API_KEY})
    
def login_page(request):
    if request.method == "POST":
        username = request.POST['username']
        user_password = request.POST['password']

        user = authenticate(request, username=username.lower(), password=user_password)

        if user is not None:
            login(request, user)

            if (request.user.groups.filter(name="Customers").exists()):
                return HttpResponseRedirect(reverse(registration))
            elif (request.user.groups.filter(name="Staff").exists()):
                print("Staff Logged In")
                return HttpResponseRedirect(reverse(dashboard))
        else:
            print("Wrong password")
            return HttpResponseRedirect(reverse(login_page))
    else:
        ctx = {
            "signin_form": sign_in_form()
        }
        return render(request, 'login.html', context=ctx)
    
def is_user_active(user):
    return user.is_active

@login_required(login_url='/accounts/login', redirect_field_name=None)
def logout_page(request):
    logout(request)
    return HttpResponseRedirect(reverse(login_page))