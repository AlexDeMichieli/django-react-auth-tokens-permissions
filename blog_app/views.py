from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import permission_required, login_required
from .models import Blog

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