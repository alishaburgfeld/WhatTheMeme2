from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User
from rest_framework.decorators import api_view

# We have a bunch of HttpResponse b/c being lazy and won't do anything with the responses today. otherwise should send as dictionaries through json

def index(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['POST'])
def sign_up(request):
    print('YOU ARE IN THE SIGN_UP VIEW ON DJANGO')
    try:
        User.objects.create_user(username=request.data['email'], password=request.data['password'], email=request.data['email'])
        return JsonResponse({'success': True})
    except Exception as e:
        print('you got an error signing up!', str(e))
    return JsonResponse({'Success': False, 'reason':'sign-up failed'})

@api_view(['POST'])
def log_in(request):
    print('YOU ARE IN THE LOG IN VIEW ON DJANGO')
    # this will use the django framework request which will allow us to not use request.body.___ and we won't have to do json.loads(request.body)
    # print(dir(request))
    # this will give us the original request not the django rest framework request version
    # print(dir(request._request))
    #built in python function for printing keys in request

    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    # user = authenticate(username=email, password=password, email=email)
    user = authenticate(username=email, password=password)
    print('login on django side!', user.email, user.password)

    if user is not None:
        if user.is_active:
            try:
                # access the base request, not the DRF request
                # this starts a login session for this user
                login(request._request, user)
                print(f"{email} IS LOGGED IN!!!!!!!!!")
                return JsonResponse({'success': True}) 
            except Exception as e:
                print('you got an error logging in!', str(e))
                return JsonResponse({'success': False, 'reason': 'failed to login'})
        else:
            return JsonResponse({'success': False, 'reason': 'account disabled'})
            # Return a 'disabled account' error message
    else:
        return JsonResponse({'success': False, 'reason': 'account doesn\'t exist'})    
        # Return an 'invalid login' error message.

@api_view(['POST'])
def log_out(request):
    logout(request)
    print('USER IS LOGGED OUT!')
    return HttpResponseRedirect('/') 

@api_view(['GET'])
def who_am_i(request):
    print('YOU ARE IN THE WHO_AM_I VIEW ON DJANGO')
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        #can take off fields if you want all of the fields. for serializers you need to put it in a list
        data = serializers.serialize("json", [request.user], fields=['email', 'username'])
        #in theory could also use model to dict instead of serializers
        return JsonResponse({'data':data})
    else:
        return JsonResponse({'user':None})





# source ~/VEnvirons/WhatTheMeme/bin/activate