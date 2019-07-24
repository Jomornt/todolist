from rest_framework import serializers
from .models import Todo


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('todo_id', 'text', 'priority', 'state')
