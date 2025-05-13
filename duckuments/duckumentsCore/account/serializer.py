from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


# INFO : use in projectModel serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


# INFO : create user model
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        # Hash the password before saving
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


# INFO : serialize user information
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "coin_balance",
            "avatar",
        ]


# INFO : serialize user avatar
class UserAvatarChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["avatar"]


# INFO : change user password serialize
class ChangePasswordSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ["email"]


# INFO : user login serializer
class CustomJWTLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(user)

        return {
            "user": user,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }
