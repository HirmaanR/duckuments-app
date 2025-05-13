from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.crypto import get_random_string


# TODO : set ImageField parser for API.
class User(AbstractUser):
    active_code = models.CharField(max_length=72, null=True, blank=True)
    coin_balance = models.IntegerField(default=1)
    avatar = models.ImageField(
        upload_to="userProfile", null=True, blank=True, default="profile.png"
    )

    def save(self, *args, **kwargs):
        self.active_code = get_random_string(72)
        return super().save(*args, **kwargs)
