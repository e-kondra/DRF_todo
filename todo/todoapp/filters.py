from django_filters import rest_framework as filter
from .models import Project, Todo

class ProjectFilter(filter.FilterSet):
    name = filter.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filter.FilterSet):

    class Meta:
        model = Todo
        fields = {'project': ['exact'],
                  # 'date_create': ['day__gte', 'day__lt'],
                  }


