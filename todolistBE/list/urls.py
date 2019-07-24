from django.conf.urls import url
import list.views

urlpatterns = [
    url(r'^tododata/$', list.views.TaskTodo.as_view()),# 1
    url(r'^tododata/(\d+)/$', list.views.TaskTodo.as_view())#2
]