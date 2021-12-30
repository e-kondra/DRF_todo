from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerFull


# class UserModelViewSet(ModelViewSet):
#     # renderer_classes = [JSONRenderer]
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserCustomViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet ):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerFull
        return UserModelSerializer


