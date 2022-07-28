from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email=models.EmailField(max_length=255,
    verbose_name = 'email address',
    unique=True,)

USERNAME_FIELD="email"
REQUIRED_FIELDS = [] # Email & Password (& username?) are required by default.
