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
            return redirect('login')
     
    return render(request, 'register/login.html')