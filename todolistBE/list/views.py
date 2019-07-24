from django.http import JsonResponse
from list.models import Todo
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TaskSerializer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination


class TaskTodo(APIView):
    def get(self, request):
        state = request.query_params.get('choose')
        todos = Todo.objects.filter(state=state).order_by('-todo_id')
        page = PageNumberPagination()
        page.page_size = 7
        page.page_query_param = 'page'
        page_list = page.paginate_queryset(todos, request, self)
        serializer = TaskSerializer(instance=page_list, many=True)
        return page.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        response = {'status': 100, 'msg': 'delete success'}
        Todo.objects.filter(todo_id=id).delete()
        return Response(response)

    def put(self, request, id):
        print (id)
        response = {'status': 100, 'msg': 'update success'}
        todo = Todo.objects.filter(todo_id=id).first()
        serializer = TaskSerializer(data=request.data, instance=todo)
        if serializer.is_valid():
            serializer.save()
        return Response(response)
