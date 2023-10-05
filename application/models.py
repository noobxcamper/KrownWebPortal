from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30, default='mississauga')
    postal_code = models.CharField(max_length=4)
    year = models.CharField(max_length=4)
    make = models.CharField(max_length=30)
    model = models.CharField(max_length=30)
    license_plate = models.CharField(max_length=8)