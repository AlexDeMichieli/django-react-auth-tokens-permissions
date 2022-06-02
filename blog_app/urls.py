from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_blog, name='add'),
    path('list/', views.blog_list, name='list'),
    path('general/', views.general, name='general'),

    path('api/blogs/', views.blog_posts),


]