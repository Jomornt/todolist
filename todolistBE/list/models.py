from django.db import models
import sys
reload(sys)
sys.setdefaultencoding('utf8')


class Todo(models.Model):
    todo_id = models.AutoField(primary_key=True)
    text = models.TextField()
    priority = models.IntegerField()
    state = models.TextField()
    def __str__(self):
        return self.text
