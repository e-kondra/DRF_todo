from rest_framework.serializers import ModelSerializer

from users.serializers import UserModelSerializer
from .models import Project, Todo



class ProjectModelSerializer(ModelSerializer):

    # users = UserModelSerializer(many=True)
    class Meta:
        model = Project  # witch model serialize
        fields = ('__all__')


class TodoModelSerializer(ModelSerializer):

    class Meta:
        model = Todo  # witch model serialize
        fields = ('__all__')