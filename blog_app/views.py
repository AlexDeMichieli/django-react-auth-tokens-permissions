from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import permission_required, login_required
from .models import Blog


#--> Rest
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import serializers, status
from .serializers import BlogSerializer
from rest_framework.response import Response
from .custom_permissions import CanPost

#-->


class CanPost(BasePermission):
   def has_permission(self, request, view):
      return request.user.has_perm('blog_app.view_blog')

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, CanPost])
def blog_posts(request, format=None):
    """
    Get a list of products or create a product .
    """
    if request.method == 'GET':
        all_blog_posts = Blog.objects.all()
        serializer = BlogSerializer(all_blog_posts, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@login_required
@permission_required('blog_app.add_blog')
def add_blog(request):
    if request.method == 'GET':
        return render(request, 'add.html')
    elif request.method == "POST":
        title = request.POST['title']
        text = request.POST['text']
        pub_date = request.POST['pub_date']
        Blog.objects.create(title=title, text=text, pub_date=pub_date)
        return redirect('list')

@login_required
@permission_required('blog_app.view_blog')
def blog_list(request):
    blog_posts = Blog.objects.all()   
    return render(request, 'list.html', {"blog_posts": blog_posts})

def general(request):
    user = request.user
    permissions = user.get_all_permissions()
    return render(request, 'general.html', {"permissions":permissions})