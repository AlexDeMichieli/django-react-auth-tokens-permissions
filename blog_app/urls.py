from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token 
from . import views

urlpatterns = [
    path('add/', views.add_blog, name='add'),
    path('list/', views.blog_list, name='list'),
    path('general/', views.general, name='general'),

    path('api/viewall/', views.view_all_blog_posts),
    path('api/create/', views.create_post),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here




]