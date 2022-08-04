from django.db import models
from django.contrib.auth.models import AbstractUser
import random
from django.core.validators import MaxValueValidator, MinValueValidator

class AppUser(AbstractUser):
    email=models.EmailField(max_length=255,
    verbose_name = 'email address',
    unique=True,)

USERNAME_FIELD="email"
REQUIRED_FIELDS = [] # Email & Password (& username?) are required by default.

class FriendList(models.Model):
    user = models.OneToOneField(AppUser, on_delete = models.CASCADE, related_name='owner')
    friends = models.ManyToManyField(AppUser, blank=True, related_name='friends')

class FriendRequest(models.Model):
    sender = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='receiver')
    is_active = models.BooleanField(blank=True, default=True)

    class Meta:
        unique_together = (('sender', 'receiver'))
    #once the model is created it will need to send the data to django, create a friend request, I'm guessing the reciving party will have a section that is doing a get requests for any friend requests, 
    # and if true sill send that with accept/decline (this will also change it to not being active), so probably need to create a view that checks for friend request
    

class Game(models.Model):
    is_active = models.BooleanField(blank= True, default=True)  
    code = models.CharField(max_length=100, null=False, unique=True) 

class Game_User(models.Model):
    game = models.ForeignKey(Game, on_delete = models.CASCADE)
    player = models.ForeignKey(AppUser, on_delete = models.CASCADE)
    player_points = models.IntegerField(blank=True, default=0, validators = [MinValueValidator(0), MaxValueValidator(7)])
    
    class Meta:
        unique_together = (('game', 'player')) #should I add player_points in this too?

# class Card(models.Model):
#     phrase = models.TextField(blank = True) #will be my API call and will have to be added each time, would I do a unique=true here?
    
class Game_Card(models.Model):
    phrase = models.TextField(blank = True)
    game = models.ForeignKey(Game, on_delete = models.CASCADE)
    face_up = models.BooleanField(blank=True, default=False) #displaying face up on board for all to see
    votes = models.IntegerField(blank=True, default=0, validators = [MinValueValidator(0), MaxValueValidator(6)]) #going to set max players as 6
    owner = models.ForeignKey(AppUser, on_delete = models.CASCADE)
    round_selected = models.IntegerField(blank=True, default=0, null=True) #will edit the value if its selected by the player
    is_active = models.BooleanField(blank= True, default=True)

    class Meta:
        unique_together = (('game', 'owner'))