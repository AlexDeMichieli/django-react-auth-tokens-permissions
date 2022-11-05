from django.shortcuts import render, redirect
from django.contrib.auth.models import Permission, User
from blog_app.models import Blog
from django.contrib.auth import authenticate, login, logout

def user_register(request):
    if request.method == "POST":
        new_user = User.objects.create(
            username = request.POST['username'],
            email = request.POST['email'],
            first_name = request.POST['first_name'],
            last_name = request.POST['last_name']
        )
        # assisgns role at the creation
        # new_user.is_superuser=True Sets superuser
        # new_user.is_staff = True
        new_user.set_password(request.POST['password'])
        new_user.save()
        return redirect('login')
    return render(request, 'register/register.html')


def user_login(request):
    if request.method == "POST":
        user = authenticate(
            request,
            username = request.POST['username'],
            password = request.POST['password']
        )
        if user is not None:
            login(request,user)
            print(user.get_all_permissions()) #returns list of all permissions
            return redirect('general')
            """
            perms for superuser

            'sessions.view_session', 'contenttypes.add_contenttype', 'auth.delete_user', 'auth.view_user', 'admin.delete_logentry', 'sessions.add_session', 'blog_app.view_blog', 'blog_app.change_blog', 'auth.change_user', 'contenttypes.view_contenttype', 'auth.delete_permission', 'sessions.change_session', 'admin.view_logentry', 'auth.add_permission', 'auth.delete_group', 'auth.view_group', 'contenttypes.delete_contenttype', 'blog_app.add_blog', 'auth.add_user', 'admin.add_logentry', 'auth.change_group', 'sessions.delete_session', 'blog_app.delete_blog', 'auth.view_permission', 'contenttypes.change_contenttype', 'auth.add_group', 'auth.change_permission', 'admin.change_logentry'
            """
     
    return render(request, 'register/login.html')


def user_logout(request):
    logout(request)
    return redirect('general')
