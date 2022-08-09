from glob import glob
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
memes = []
# cardCount = 0

def index(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

def getUser(user_email):
    user = User.objects.get(email = user_email)
    return user

#api call
def getCards():
    url = "https://cards-against-humanity.p.rapidapi.com/white/50"
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
    # print('CARDS ARRAY', cards)

def getMemes():
    global memes
    url = 'https://api.imgflip.com/get_memes'
    response = requests.request('GET', url)
    JSON_response = json.loads(response.text)
    memeArray = JSON_response['data']['memes']
    for meme in memeArray:
        memes.append(meme['url'])

@api_view(['GET'])
def get_meme_card(request):
    print('IN GET MEME GET REQUEST ON DJANGO')
    user = getUser(request.user.email)
    # game_user = game_user = Game_User.objects.get(player = user)
    # running into issue of returning more than one.
    game_user = Game_User.objects.filter(player = user)
    game_1 = game_user[len(game_user)-1].game
    round = game_1.round
    print(round)
    getMemes()
    if memes:
        try:
            return JsonResponse({'success': True, 'memes':memes, 'round': round})
        except Exception as e:
            return JsonResponse({'success': False, 'reason': str(e)})
    else:
        return JsonResponse({'success': False, 'reason': 'no memes available'})


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
    if request.user.is_authenticated:
        user = getUser(request.user.email)
        try:
            game_user = Game_User.objects.get(player = user)
            print('GAME USER', game_user, 'TYPE', type(game_user))
            if game_user:
                return JsonResponse({'email': request.user.email, 'game_user': True})
        except:
            return JsonResponse({'email': request.user.email, 'game_user': False})
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

def create_card(game, owner):
    print('IN CREATE CARD')
    try:
        # global cardCount
        # its ok for cards to be global because its random each time a game is started, and the cardCount will be tied to each game
        global cards
        card_count = game.card_count
        game_card = Game_Card(phrase=cards[card_count], game = game, face_up = False, votes = 0, owner = owner, round_selected=0, is_active = True)
        game_card.full_clean()
        game_card.save()
        print('GAME CARD = :', game_card)
        game.card_count+=1
        game.save()
        print('GAME CARD COUNT IS NOW', game.card_count)
        # cardCount+=1
        # print('CARD COUNT', cardCount)
        return game_card 
    except Exception as e:
        print(str(e))
        return JsonResponse({'success': False, 'reason': str(e)})






@api_view(['POST'])
@login_required
def start_game(request):
    print('YOU ARE IN THE POST REQUEST ON DJANGO FOR START GAME')
    # print('request', request)
    user_email = request.user.email
    user = getUser(user_email)
    code = str(random.randint(10001,999999))
    try:
        game = Game(code = code)
        game.full_clean
        game.save()
        print('NEW GAME: ', game)
        game_code = game.code
        game_user = Game_User(game = game, player = user)
        game_user.full_clean
        game_user.save()
        # print('GAME USER IS!!!! ', game_user)
        # this works, but just going to comment it out while debugging the rest
        getCards()
        user_cards = []
        while len(user_cards) < 6:
            card=create_card(game, game_user)
            user_cards.append(model_to_dict(card))
        # print('USER CARDS ARE', user_cards, 'len user cards', len(user_cards))
        return JsonResponse({'success':True, 'game_code': game_code, 'user_cards': user_cards})
    except Exception as e:
        print(str(e))
        return JsonResponse({'success': False, 'reason': str(e)})
    
    # need to account for if they're showing up as in a different game
    # when client goes back to lobby need to set them as inactive game user. Or delete game user??
@api_view(['POST'])
@login_required
def join_game(request):
    getCards()
    pass
    #need to create 6 card objects and pass them to this user. 

@api_view(['PUT'])
@login_required
def selected_card(request):
    print('YOU ARE IN THE PUT REQUEST ON DJANGO FOR SELECTED CARD')
    round = request.data['round']
    card_id= request.data['id']
    # print('CARD_ID', card_id, 'TYPE', type(card_id))
    # user_email = request.user.email
    # user = getUser(user_email)
    # print('USER =', user)
    # game_user= Game_User.objects.get(player = user)
    # still running into issue of multiple game users
    # game_user = Game_User.objects.filter(player = user)
    # game_user_1 = game_user[len(game_user)-1]
    # print('GAME USER = ', game_user_1)
    card = Game_Card.objects.get(id=card_id)
    print('CARD SELECTED', card)
    try:
        card.round_selected = round
        card.save()
        print('round selected', card.round_selected)
        return JsonResponse({'success':True})
    except Exception as e:
        return JsonResponse({'success': False, 'reason': f'something went wrong {str(e)}'})

@api_view(['GET'])
@login_required    
def view_selected_cards(request):
    print('YOU ARE IN THE VIEW SELECTED CARDS')
    user_email = request.user.email
    user = getUser(user_email)
    # game_user= Game_User.objects.get(player = user)
    game_user = Game_User.objects.filter(player = user)
    game_1 = game_user[len(game_user)-1].game
    # print('VIEW SELECTED CARDS GAME', game_1)
    round = game_1.round
    # print('ROUND HERE', round)
    selected_cards_objects= Game_Card.objects.filter(round_selected=round)
    # print('ALL SELECTED CARDS', selected_cards_objects)
    if selected_cards_objects:
        try:
            selected_cards=[]
            for card in selected_cards_objects:
                if model_to_dict(card) not in selected_cards:
                    selected_cards.append(model_to_dict(card))
            return JsonResponse({'success':True, 'selected_cards': selected_cards})
        except Exception as e:
            return JsonResponse({'success': False, 'reason': f'something went wrong {str(e)}'})
    else: 
        return JsonResponse({'success':False, 'reason': 'no selected cards'})

@api_view(['GET'])
@login_required    
def players(request):
    print('YOU ARE IN THE PLAYERS')
    user_email = request.user.email
    user = getUser(user_email)
    # game_user= Game_User.objects.get(player = user)
    game_user = Game_User.objects.filter(player = user)
    game = game_user[len(game_user)-1].game    
    all_game_users= Game_User.objects.filter(game = game)
    print('ALL GAME USERS', all_game_users)
    if all_game_users:
        try:
            players=[]
            for game_user in all_game_users:
                user = game_user.player
                if user.email not in players:
                    players.append(user.email)
                # if model_to_dict(user) not in players:
                #     players.append(model_to_dict(user))
            return JsonResponse({'success':True, 'players': players})
        except Exception as e:
            return JsonResponse({'success': False, 'reason': f'something went wrong {str(e)}'})
    else: 
        return JsonResponse({'success':False, 'reason': 'no players in this game'})

@api_view(['PUT'])
@login_required
def leave_game(request):
    print('YOU ARE IN THE PUT REQUEST ON DJANGO FOR LEAVE GAME')
    # print('request', request)
    user_email = request.user.email
    user = getUser(user_email)
    print('USER =', user)
    game_users= Game_User.objects.filter(player = user)
    game_user= game_users[len(game_user)-1]
    print('GAME USER = ', game_user)
    try:
        game_user.delete()
        # this will also delete all game_cards that belonged to that user
        print('GAME USER SHOULD BE DELETED', game_user)
        return JsonResponse({'success':True})
    except Exception as e:
        return JsonResponse({'success': False, 'reason': f'something went wrong {str(e)}'})

# source ~/VEnvirons/WhatTheMeme/bin/activate
# http://127.0.0.1:8000/