from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User
from .models import FriendList, FriendRequest
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required

# We have a bunch of HttpResponse b/c being lazy and won't do anything with the responses today. otherwise should send as dictionaries through json

def index(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

def getUser(user_email):
    user = User.objects.get(email = user_email)
    return user

@api_view(['POST'])
def sign_up(request):
    print('YOU ARE IN THE SIGN_UP VIEW ON DJANGO')
    try:
        newUser = User.objects.create_user(username=request.data['email'], password=request.data['password'], email=request.data['email'])
        newUser.full_clean
        newUser.save()
        list= FriendList(user = newUser)
        list.full_clean
        list.save()
        return JsonResponse({'success': True})
    except Exception as e:
        print(str(e))
        return JsonResponse({'success': False, 'reason': str(e)})
    # return JsonResponse({'Success': False, 'reason':'sign-up failed'})

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
        # data = serializers.serialize("json", [request.user], fields=['email', 'username'])
        print(request.user.email)
        #in theory could also use model to dict instead of serializers
        return JsonResponse({'email': request.user.email})
    else:
        return JsonResponse({'user':None})

#once friends request is approved I will add them to each other's lists
#need to decide what I want to do if declined... also probably need a pending "friend request" area
@api_view(['PUT'])
@login_required
def add_friend(request): #accepts a friend request
    user_email = request.user.email
    friend_email = request.data['friend_email']
    print('YOU ARE IN ADD FRIEND ON DJANGO.', user_email, 'friend:', friend_email)
    user = User.objects.get(email = user_email)
    friend = User.objects.get(email = friend_email)
    print('user', user, 'friend', friend)
    if friend not in user.friends.all():
        if friend != None:
            try:
                print('now in add friend try')
                user.friends.add(friend)
                friend.friends.add(user) 
                print('user.friends:', user.friends)
                friend_request = FriendRequest.objects.filter(sender = friend, receiver = user)
                friend_request.is_active = False
                print('is active?', friend_request.is_active)
                return JsonResponse({'success':True})
            except:
                return JsonResponse({'success': False, 'reason': 'something went wrong'})
        else:
            return JsonResponse({'success': False, 'reason': 'friends account doesnt exist'})
    else:
        return JsonResponse({'success': False, 'reason': 'friend is already in friend list'})


@api_view(['DELETE'])
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

@api_view(['PUT'])
def create_friend_request(request):
    user_email = request.user.email
    friend_email = request.data['friend_email']
    user = User.objects.get(email = user_email)
    friend = User.objects.get(email = friend_email)
    if friend:
        try:
            friend_request = FriendRequest(sender = user, receiver = friend, is_active = True)
            friend_request.full_clean
            friend_request.save()
            return JsonResponse({'success':True})
        except:
            # if friend request already exists it will send this one
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        return JsonResponse({'success': False, 'reason': 'friends account doesnt exist'})

# this will be stretch goal
# @api_view(['POST'])
# def cancel_friend_request(request):
#     user_email = request.data['user_email']
#     friend_email = request.data['friend_email']
#     user = getUser(user_email)
#     friend = getUser(friend_email)
#     #this might be wrong syntax::
#     friend_request = FriendRequest.get(sender = user, receiver= friend)
#     if friend_request != None:
#         try:
#             friend_request.delete()
#             return JsonResponse({'success':True})
#         except:
#             return JsonResponse({'success': False, 'reason': 'something went wrong'})
#     else:
#         return JsonResponse({'success': False, 'reason': 'friend request doesnt exist'})

# this shows the user any friend requests that started from somebody else requesting they become their friend
@api_view(['GET'])
def view_friend_requests(request):
    print('YOU ARE IN THE GET REQUEST ON DJANGO FOR VIEW FRIEND REQUESTS')
    print('request', request)
    user_email = request.user.email
    user = getUser(user_email)
    #this might be wrong syntax::
    # view any requests sent to the user
    friend_requests = FriendRequest.objects.filter(receiver= user, is_active = True)
    # print('friend requests:', friend_requests)
    if friend_requests:
        list_of_friend_requests=[]
        for item in friend_requests:
            #sends back the emails of all pending friend requests
            sender = item.sender
            # print('sender:', sender)
            # print('sender.email', sender.email)
            # sender = User.objects.filter(email = item.sender)
            list_of_friend_requests.append(sender.email)
        print('list of friends:', list_of_friend_requests)
        try:
            return JsonResponse({'friend_requests': list_of_friend_requests})
        except:
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        return JsonResponse({'success': False, 'reason': "you don't have any friend requests"})

@api_view(['GET'])
def view_friend_list(request):
    print('YOU ARE IN THE GET REQUEST ON DJANGO FOR VIEW FRIEND LIST')
    user_email = request.user.email
    print('FLIST user email:', user_email)
    user = getUser(user_email)
    #this might be wrong syntax::
    # view all friends
    friends = user.friends.all()
    print('friend_list:', friends)
    if len(friends)>0:
        list_of_friends=[]
        for friend in friends:
            list_of_friends.append(model_to_dict(friend))
        try:
            print('IN FLIST TRY')
            return JsonResponse({'friends': list_of_friends})
        except:
            print('in flist except')
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        print('in flist else')
        return JsonResponse({'success': False, 'reason': "you don't have any friends"})



        
# source ~/VEnvirons/WhatTheMeme/bin/activate