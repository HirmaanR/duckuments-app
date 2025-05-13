from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializer import (ChangePasswordSerializer, CreateUserSerializer,
                         CustomJWTLoginSerializer, UserAvatarChangeSerializer,
                         UserProfileSerializer)


# INFO : SignUp user
class SignUpView(APIView):
    def post(self, request):
        user = CreateUserSerializer(data=request.data)
        if user.is_valid():
            password = request.POST.get("password")
            user.save()
            return Response(user.data["username"], status=status.HTTP_201_CREATED)

        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


# INFO : return all user information
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can access

    def get(self, request):
        user = request.user
        profile = UserProfileSerializer(user)
        return Response(profile.data, status=status.HTTP_200_OK)


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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# INFO : change user password
# send a new password with email to user
class ChangePasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response("Email is required", status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                "User with this email does not exist", status=status.HTTP_404_NOT_FOUND
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

        return Response("New password sent to your email", status=status.HTTP_200_OK)


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
                status=status.HTTP_200_OK,
            )

            return response

        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
