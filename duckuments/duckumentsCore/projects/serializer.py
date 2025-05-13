from .models import ProjectModel
from rest_framework import serializers
from account.serializer import UserSerializer


# INFO : generate new project
class NewProjectSerializer(serializers.ModelSerializer):
    for_user = UserSerializer(read_only=True)

    class Meta:
        model = ProjectModel
        fields = "__all__"
