from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token 
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('test/', views.home, name='home'),
    path('viewall/', views.view_all_blog_posts),
    path('create/', views.create_post),
    path('edit/<int:pk>', views.edit_blog),
    path('delete/<int:pk>', views.delete_blog),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # <-- JWT token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # <-- JWT token



]