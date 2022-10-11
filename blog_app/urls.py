from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token 
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('add/', views.add_blog, name='add'),
    path('list/', views.blog_list, name='list'),
    path('general/', views.general, name='general'),

    path('api/viewall/', views.view_all_blog_posts),
    path('api/create/', views.create_post),
    path('api/edit/<int:pk>', views.edit_blog),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # <-- JWT token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # <-- JWT token



]