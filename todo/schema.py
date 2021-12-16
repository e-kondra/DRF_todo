import graphene
from graphene import ObjectType
from graphene_django import  DjangoObjectType
from todoapp.models import Project, Todo
from users.models import User

#1
# class Query(ObjectType):
#     hello = graphene.String(default_value='Hi')
#
# schema = graphene.Schema(query=Query)
#2
# class TodoType(DjangoObjectType):
#
#     class Meta:
#         model = Todo
#         fields = '__all__'
#
# class Query(ObjectType):
#
#     all_todo = graphene.List(TodoType)
#
#     def resolve_all_todo(root, info):
#         return Todo.objects.all()
#
# schema = graphene.Schema(query=Query)

# #3
# class TodoType(DjangoObjectType):
#
#     class Meta:
#         model = Todo
#         fields = '__all__'
#
# class ProjectType(DjangoObjectType):
#
#     class Meta:
#         model = Project
#         fields = '__all__'
#
# class UserType(DjangoObjectType):
#
#     class Meta:
#         model = User
#         fields = '__all__'
#
# class Query(ObjectType):
#
#     all_todo = graphene.List(TodoType)
#     all_projects = graphene.List(ProjectType)
#     all_users = graphene.List(UserType)
#
#     def resolve_all_todo(root, info):
#         return Todo.objects.all()
#
#     def resolve_all_projects(root, info):
#         return Project.objects.all()
#
#     def resolve_all_users(root, info):
#         return User.objects.all()
#
# schema = graphene.Schema(query=Query)
#4
# class TodoType(DjangoObjectType):
#
#     class Meta:
#         model = Todo
#         fields = '__all__'
#
# class ProjectType(DjangoObjectType):
#
#     class Meta:
#         model = Project
#         fields = '__all__'
#
# class UserType(DjangoObjectType):
#
#     class Meta:
#         model = User
#         fields = '__all__'
#
# class Query(ObjectType):
#
#     project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=False))
#
#     def resolve_project_by_id(root, info, id=None):
#         if id:
#             return Project.objects.get(id=id)
#         return None
#
#     todo_by_project = graphene.List(TodoType, name=graphene.String(required=False))
#
#     def resolve_todo_by_project(root, info, name=None):
#         todo = Todo.objects.all()
#         if name:
#             return todo.filter(project__name=name)
#         return todo
#
# schema = graphene.Schema(query=Query)

#5
class TodoType(DjangoObjectType):

    class Meta:
        model = Todo
        fields = '__all__'

class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'

class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'

class Query(ObjectType):

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=False))

    def resolve_project_by_id(root, info, id=None):
        if id:
            return Project.objects.get(id=id)
        return None

    todo_by_project = graphene.List(TodoType, name=graphene.String(required=False))

    def resolve_todo_by_project(root, info, name=None):
        todo = Todo.objects.all()
        if name:
            return todo.filter(project__name=name)
        return todo

class TodoUpdateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=False)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(self, root, info, text, id):
        todo = Todo.objects.get(id=id)
        todo.text = text
        todo.save()
        return TodoUpdateMutation(todo=todo)

class TodoCreateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=False)
        is_active = graphene.Boolean(required=False)
        creator = graphene.Int(required=True)
        project = graphene.Int(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(self, root, info, text, is_active, creator=None, project=None):
        project = Project.objects.get(id=project)
        creator = User.objects.get(id=creator)
        todo = Todo.objects.create(text=text, is_active=is_active, creator=creator, project=project)
        return TodoCreateMutation(todo=todo)

class TodoDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    todo = graphene.List(TodoType)

    @classmethod
    def mutate(self, root, info, id):
        Todo.objects.get(id=id).delete()
        todo=Todo.objects.all()
        return TodoCreateMutation(todo=todo)

class Mutation(graphene.ObjectType):
    update_todo = TodoUpdateMutation.Field()
    create_todo = TodoCreateMutation.Field()
    delete_todo = TodoDeleteMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

