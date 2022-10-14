from django.shortcuts import render, redirect
from django.contrib.auth.decorators import permission_required, login_required
from .models import Blog


#--> Rest
from rest_framework.permissions import IsAuthenticated
from .custom_permissions import CanCreate, CanView, CanEdit, CanDelete

from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers, status
from .serializers import BlogSerializer
from rest_framework.response import Response

#-->

@api_view(['POST']) # Anyone who has the "blog_app.add_blog" permission can create a blog post
@permission_classes([IsAuthenticated, CanCreate])
def create_post(request, format=None):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT']) #Anyone with blog_app.change_blog permission can edit a blog post
@permission_classes([IsAuthenticated, CanEdit])
def edit_blog(request, pk, format=None):
    """
    Edit a blog post
    """
    try:
        blog_post = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = BlogSerializer(blog_post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE']) #Anyone with blog_app.delete_blog permission can delete a blog post
@permission_classes([IsAuthenticated, CanDelete])
def delete_blog(request, pk, format=None):
    """
    Delete a blog post
    """
    try:
        blog_post = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    blog_post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  
@api_view(['GET']) ##Anyone with blog_app.view_blog permission can view all blog posts
@permission_classes([IsAuthenticated, CanView])
def view_all_blog_posts(request, format=None):
    """
    Get a list of blogs posts.
    """
    all_posts = Blog.objects.all()
    serializer = BlogSerializer(all_posts, many=True)
    return Response(serializer.data)

@login_required
@permission_required('blog_app.add_blog') #user can not render the form and post because it has only "view_blog"
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
def blog_list(request):
    blog_posts = Blog.objects.all()   
    return render(request, 'list.html', {"blog_posts": blog_posts})

def general(request):
    user = request.user
    permissions = user.get_all_permissions()
    return render(request, 'general.html', {"permissions":permissions})