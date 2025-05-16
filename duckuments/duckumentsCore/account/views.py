from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.urls import reverse

from django.utils.crypto import get_random_string
from rest_framework.status import *
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializer import (ChangePasswordSerializer, CreateUserSerializer,
                         CustomJWTLoginSerializer, UserAvatarChangeSerializer,
                         UserProfileSerializer)

from .utilities import sendEmail


# INFO : create new user account
class SignUpView(APIView):
    def post(self, request):
        user = CreateUserSerializer(data=request.data)
        if user.is_valid():
            pass

        user_info = {
            "email": user.validated_data['email'],
            "username": user.validated_data['username'],
            "active_code": get_random_string(72)
        }

        # send active-link
        absolute_url = "http://127.0.0.1:8000/"
        message = render_to_string(
            'account/email.html', context={'active_code': user_info.get("active_code"), 'username': user_info.get('username'), 'link': absolute_url})

        plain_message = strip_tags(message)

        if send_mail("active account with link", plain_message,
                     "duckuments-core@gmail.com", [user_info.get("email")], False, html_message=message):
            user.save(active_code=user_info.get('active_code'))
            return Response("user crated", status=HTTP_200_OK)
        else:
            return Response("something went wrong", status=HTTP_400_BAD_REQUEST)


# INFO : return all user information
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can access

    def get(self, request):
        user = request.user
        profile = UserProfileSerializer(user)
        return Response(profile.data, status=HTTP_200_OK)


# INFO : change user avatar
class AvatarUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)  # Needed for file uploads!

    def patch(self, request):
        user = request.user
        serializer = UserAvatarChangeSerializer(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Avatar updated successfully",
                    "avatar_url": user.avatar.url,
                }
            )
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


# INFO : change user password
# send a new password with email to user
class ChangePasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response("Email is required", status=HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                "User with this email does not exist", status=HTTP_404_NOT_FOUND
            )

        # Generate a new random password
        new_password = get_random_string(10)
        # Set the new password
        user.set_password(new_password)
        user.save()

        # Send email to user
        send_mail(
            subject="Your New Password",
            message=f"Hello {user.username},\n\nYour new password is: {new_password}",
            from_email="duckuments@gmail.com",
            recipient_list=[email],
            fail_silently=False,
        )

        return Response("New password sent to your email", status=HTTP_200_OK)


class CustomJWTLoginView(APIView):
    def post(self, request):
        serializer = CustomJWTLoginSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user = data["user"]
            access_token = data["access"]
            refresh_token = data["refresh"]

            response = Response(
                {
                    "userName": user.username,
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                },
                status=HTTP_200_OK,
            )

            return response

        return Response(serializer.errors, status=HTTP_401_UNAUTHORIZED)


class ActiveAccountView(APIView):
    def get(request, self, active_code):
        user = User.objects.filter(active_code=active_code).first()
        if user:
            user.set_is_active(True)
            user.set_active_code(get_random_string(72))
            user.save()
            return Response("account Activated !", status=HTTP_200_OK)

        return Response("account dose not exist!", status=HTTP_404_NOT_FOUND)
