from django.core.management.base import BaseCommand
from todoapp.models import Todo, Project
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            super_user = User.objects.create_superuser(username='kondra', email='kondra@gmail.com',password='1', first_name='Ekaterina', last_name='Kondratyeva')
        except BaseException:
            super_user = User.objects.get(username='kondra')
        try:
            user = User.objects.create_user(username='user', email='user2@mail.ru', password='2', first_name='Test',
                                     last_name='Testov')
        except BaseException:
            user = User.objects.get(username='user')
        project = Project.objects.create(name='Project_1', url_rep='https://github.com/e-kondra/DRF_todo/actions/new')
        project.users.add(super_user.id)
        project.users.add(user.id)
        Todo.objects.create(project=project, text='Todo1', creator= user, is_active = True)
        Todo.objects.create(project=project, text='Todo2', creator=super_user, is_active=True)
