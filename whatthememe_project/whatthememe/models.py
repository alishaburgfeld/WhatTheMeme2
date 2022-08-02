from django.db import models
from django.contrib.auth.models import AbstractUser
import random

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
    code = str(random.randint(10001,999999))  