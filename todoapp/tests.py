from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
# from django.contrib.auth.models import User
from .views import TodoModelViewSet, ProjectModelViewSet
from .models import Todo, Project
from users.models import User




class TestTodoViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.adminspswd = '123456Admin_'
        self.url='/api/todo/'
        self.user = User.objects.create(**{'username':'user4','email':'user4@mail.ru','password':'12345Vishel'})
        self.project = Project.objects.create(**{'name': 'Test_project','url_rep': 'path'})
        self.project_put = Project.objects.create(**{'name': 'Project_put', 'url_rep': 'path2'})
        self.project2 = Project.objects.get(id=1)
        self.user2 = User.objects.get(id=1)
        self.admin = User.objects.create_superuser('admin', 'admin@mail.ru', self.adminspswd)
        self.data = {'project': self.project.id, 'text': 'testing', 'creator': self.user.id, 'is_active': True}
        self.data2 = {'project': self.project2, 'text': 'testing', 'creator': self.user2, 'is_active': True}
        self.data_put = {'project': self.project_put.id, 'text': 'relax', 'creator': self.admin.id, 'is_active': False}

    # APIRequestFactory
    def test_get_list(self):
        factory=APIRequestFactory()
        request = factory.get(self.url)
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory=APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = TodoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        force_authenticate(request, self.admin)
        view = TodoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # APIClient
    def test_get_detail(self):
        client=APIClient()
        todo_ = Todo.objects.create(**self.data2)
        response = client.get(f'{self.url}{todo_.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_guest(self):
        client = APIClient()
        todo_ = Todo.objects.create(**self.data2)
        response = client.put(f'{self.url}{todo_.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_admin(self):
        client = APIClient()
        todo_ = Todo.objects.create(**self.data2)
        admin = self.admin # админа создавали в setUp
        check = client.login(username=self.name, password=self.adminspswd)
        response = client.put(f'{self.url}{todo_.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_upd = Todo.objects.get(id=todo_.id)
        self.assertEqual(todo_upd.text,'relax')
        self.assertEqual(todo_upd.is_active, False)
        # self.assertEqual(todo_upd.project.name, 'Test_project')
        self.assertEqual(todo_upd.project.name, 'Project_put')
        client.logout()

    def tearDown(self) -> None:
        pass

class TestMath(APISimpleTestCase):
     def test_sqrt(self):
        import math
        response = math.sqrt(16)
        self.assertEqual(response, 4)

class TestProjectViewSet(APITestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.adminspswd = '123456Admin_'
        self.url = '/api/projects/'
        self.user = User.objects.create(**{'username': 'user4', 'email': 'user4@mail.ru', 'password': '12345Vishel'})
        self.project = Project.objects.create(**{'name': 'Test_project', 'url_rep': 'path'})
        self.project_put = Project.objects.create(**{'name': 'Project_put', 'url_rep': 'path2'})
        self.project2 = Project.objects.get(id=1)
        self.user2 = User.objects.get(id=1)
        self.admin = User.objects.create_superuser('admin', 'admin@mail.ru', self.adminspswd)
        self.users_list = [self.user.id, self.admin.id]

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(**{'name': 'Test_project', 'url_rep': 'path', })
        self.client.login(username=self.name, password=self.adminspswd)
        response = self.client.put(f'{self.url}{project.id}/',{'name': 'Projname', 'urlRep': 'https://github.com/e-kondra/DRF_todo/actions/new', 'users': self.users_list})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        self.client.login(username=self.name, password=self.adminspswd)
        response = self.client.put(f'{self.url}{project.id}/',{'name': 'Projname', 'urlRep': 'https://github.com/e-kondra/DRF_todo/actions/new', 'users': self.users_list})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        edited_project = Project.objects.get(id=project.id)
        self.assertEqual(edited_project.name, 'Projname')
        self.client.logout()

