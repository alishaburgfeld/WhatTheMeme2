from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User
from .models import FriendList, FriendRequest
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
    return JsonResponse({'success': True}) 

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

#once friends request is approved I will add them to each other's lists
#need to decide what I want to do if declined... also probably need a pending "friend request" area
@api_view(['POST'])
def add_friend(request):
    user_email = request.data['user_email']
    friend_email = request.data['friend_email']
    user = User.objects.get(email = user_email)
    friend = User.objects.get(email = friend_email)
    if friend not in user.friends.all():
        if friend != None:
            try:
                user.friends.add(friend)
                friend.friends.add(user) 
                return JsonResponse({'success':True})
            except:
                return JsonResponse({'success': False, 'reason': 'something went wrong'})
        else:
            return JsonResponse({'success': False, 'reason': 'friends account doesnt exist'})
    else:
        pass

    # Need to add else

@api_view(['POST'])
def remove_friend(request):
    user_email = request.data['user_email']
    friend_email = request.data['friend_email']
    user = User.objects.get(email = user_email)
    friend = User.objects.get(email = friend_email)
    if friend in user.friends.all():
        try:
            user.friends.delete(friend)
            friend.friends.delete(user)
            return JsonResponse({'success':True})
        except:
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        pass
    # Need to add else

@api_view(['POST'])
def create_friend_request(request):
    user_email = request.data['user_email']
    friend_email = request.data['friend_email']
    user = User.objects.get(email = user_email)
    friend = User.objects.get(email = friend_email)
    if friend != None:
        try:
            friend_request = FriendRequest(sender = user, receiver = friend, is_active = True)
            friend_request.full_clean
            friend_request.save()
            return JsonResponse({'success':True})
        except:
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        return JsonResponse({'success': False, 'reason': 'friends acocunt doesnt exist'})

@api_view(['POST'])
def cancel_friend_request(request):
    user_email = request.data['user_email']
    friend_email = request.data['friend_email']
    user = User.objects.get(email = user_email)
    friend = User.objects.get(email = friend_email)
    #this might be wrong syntax::
    friend_request = FriendRequest.get(sender = user, receiver= friend)
    if friend_request != None:
        try:
            friend_request.delete()
            return JsonResponse({'success':True})
        except:
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        return JsonResponse({'success': False, 'reason': 'friend request doesnt exist'})

#probably need to add a get request for view friend requests (to show receiver that they have a friend request)
        
# source ~/VEnvirons/WhatTheMeme/bin/activate