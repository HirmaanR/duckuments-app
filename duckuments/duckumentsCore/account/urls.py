from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    # path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("profile/", views.UserProfileView.as_view(), name="profile"),
    path("avatar/", views.AvatarUploadView.as_view(), name="avatar"),
    path("password/", views.ChangePasswordView.as_view(), name="ChangePassword"),
    path("login/", views.CustomJWTLoginView.as_view(), name="login"),
]
