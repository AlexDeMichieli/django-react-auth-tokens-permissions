from . import views
from django.urls import path

urlpatterns = [
    path('', views.user_register, name='signup'),
    path('login/', views.user_login, name= 'login'),
    path('logout/', views.user_logout, name= 'logout')

]