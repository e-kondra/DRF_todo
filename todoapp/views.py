from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from todoapp.filters import ProjectFilter
from todoapp.models import Project, Todo
from todoapp.serializers import ProjectModelSerializer, TodoModelSerializer


# Create your views here.

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    # filter_fields = ['name']


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filter_fields = ['project']