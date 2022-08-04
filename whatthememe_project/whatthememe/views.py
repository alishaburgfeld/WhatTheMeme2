from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User
from .models import FriendList, FriendRequest, Game, Game_User, Game_Card
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
import requests
import random
import json

cards = []


def index(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

def getUser(user_email):
    user = User.objects.get(email = user_email)
    return user

#api call
def getCards():
    url = "https://cards-against-humanity.p.rapidapi.com/white/200"
    headers = {
        "X-RapidAPI-Key": "89b2f4fcc3mshb1c4db4c3ef15afp151f39jsn4718f6fb42de",
        "X-RapidAPI-Host": "cards-against-humanity.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers)
    JSON_response = json.loads(response.text)
    # print('A TEXT:!!!!!!!!!!!!',JSON_response)
    # JSON_response is an array of objects, the value for key "text" is what I want.
    for card in JSON_response:
        cards.append(card['text'])
    print('CARDS ARRAY', cards)


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
# need to add something for if they click it and aren't logged in

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
    userFList = FriendList.objects.get(user = user)
    friend = User.objects.get(email = friend_email)
    friendFList = FriendList.objects.get(user = friend)
    # print('user', user, 'friend', friend)
    if friend not in user.friends.all():
        if friend != None:
            try:
                print('now in add friend try')
                # wrong syntax: user.friends.add(friend)
                userFList.friends.add(friend)
                friendFList.friends.add(user)
                print('user.friends:', user.friends)
                friend_request = FriendRequest.objects.get(sender = friend, receiver = user)
                friend_request.is_active = False
                # had to use update instead of save because it is a queryset
                friend_request.save()
                print('is active?', friend_request.is_active)
                return JsonResponse({'success':True})
            except Exception as e:
                return JsonResponse({'success': False, 'reason': f'something went wrong {str(e)}'})
        else:
            return JsonResponse({'success': False, 'reason': 'friends account doesnt exist'})
    else:
        return JsonResponse({'success': False, 'reason': 'friend is already in friend list'})


@api_view(['PUT'])
def remove_friend(request):
    # print(request)
    user_email = request.user.email
    friend_email = request.data['friend_email']
    print('IN DELETE ON DJANGO.', user_email, 'friend', friend_email)
    user = User.objects.get(email = user_email)
    userFList = FriendList.objects.get(user = user)
    friend = User.objects.get(email = friend_email)
    friendFList = FriendList.objects.get(user = friend)
    if friend in userFList.friends.all():
        try:
            print('IN DELETE FRIEND TRY')
            userFList.friends.remove(friend)
            print('userflist', userFList)
            friendFList.friends.remove(user)
            return JsonResponse({'success':True})
        except Exception as e:
            return JsonResponse({'success': False, 'reason': f'something went wrong {str(e)}'})
    else:
        return JsonResponse({'success': False, 'reason': 'user is not your friend'})

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
            print('CHECK TYPE HERE!!!!!' , type(sender.email))
        print('list of friends_requests:', list_of_friend_requests)
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
    # view all friends
    friends = user.friends.all()
    print('friend_list:', friends)
    if len(friends)>0:
        list_of_friends=[]
        for friend in friends:
            # print(friend.id) # THIS IS THE FRIENDS LIST ID!!!!
            friend_list = FriendList.objects.get(id= friend.id)
            friend_object=friend_list.user
            friend_email = friend_object.email
            list_of_friends.append(friend_email)
            # print('dir friend', dir(friend))
        # print('list of friends line 225:', list_of_friends)
        try:
            print('IN FLIST TRY')
            return JsonResponse({'friends': list_of_friends})
        except:
            print('in flist except')
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        print('in flist else')
        return JsonResponse({'success': False, 'reason': "you don't have any friends"})

@api_view(['PUT'])
def decline_friend_request(request):
    print('YOU ARE IN THE PUT REQUEST ON DJANGO FOR DECLINE FRIEND REQUESTS')
    # print('request', request)
    user_email = request.user.email
    user = getUser(user_email)
    # print('user', user, 'email:', user_email)
    friend_email = request.data['friend_email']
    # print('friend_email', friend_email)
    friend = getUser(friend_email)
    
    print('friend', friend, 'email:', friend_email)
    friend_request = FriendRequest.objects.get(sender = friend, receiver = user, is_active = True)
    print('decline friend request:', friend_request)
    if friend_request:
        friend_request.is_active = False
        friend_request.save()
        try:
            return JsonResponse({'success':True, 'reason': 'friend request is now inactive'})
        except:
            return JsonResponse({'success': False, 'reason': 'something went wrong'})
    else:
        return JsonResponse({'success': False, 'reason': "you don't have a request from this friend"})

@api_view(['POST'])
@login_required
def start_game(request):
    print('YOU ARE IN THE POST REQUEST ON DJANGO FOR START GAME')
    # print('request', request)
    user_email = request.user.email
    user = getUser(user_email)
    code = str(random.randint(10001,999999))
    try:
        game = Game(code = code) #need to know if I need to pass in a code or not
        game.full_clean
        game.save()
        print('NEW GAME: ', game)
        game_code = game.code
        print('NEW GAME CODE: ', game_code)
        game_user = Game_User(game = game, player = user)
        game_user.full_clean
        game_user.save()
        print('GAME USER IS!!!! ', game_user)
        getCards()
        return JsonResponse({'success':True, 'game_code': game_code})
        # GAME WORKED, GAME CODE WORKED (I THINK), GAME USER DID NOT WORK)
    except Exception as e:
        print(str(e))
        return JsonResponse({'success': False, 'reason': str(e)})
    
    # need to account for if they're showing up as in a different game

def join_game(request):
    pass


# source ~/VEnvirons/WhatTheMeme/bin/activate