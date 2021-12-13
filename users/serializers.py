from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import User

class UserModelSerializer(ModelSerializer):

    class Meta:
        model = User  # witch model serialize
        fields = ('username', 'first_name', 'last_name', 'email')

    validate_password = make_password


class UserModelSerializerFull(ModelSerializer):

    class Meta:
        model = User  # witch model serialize
        fields = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser')

    validate_password = make_password
