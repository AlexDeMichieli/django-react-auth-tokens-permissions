## Regular permissions

[guide used]("https://www.youtube.com/watch?v=wlYaUvfXJDc")

[permissions]("https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication#challenge_yourself")

<hr>

## Account creation with Django-rest

[serialiazers]("https://www.django-rest-framework.org/api-guide/serializers/")

[short_written_tutorial]("https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication")

# this should help for front end endpoint
[video_for_about_with_API_decorators]("https://www.youtube.com/watch?v=_OhF6FEdIao")

[geek_for_geek]("https://www.geeksforgeeks.org/adding-permission-in-api-django-rest-framework/")

## Project specifications - branch 1

- There are 3 users:
    - Alex - superuser
    - Staff 
    - User

- User can create a blog post, but cannot view them.

## Django rest framework implementation:

- Move permissions over to DRF
- Should have refresh tokens
- on account creation check:
 - validation for password
 - validation for username - if exists throw error

## For React:

 - reresh tokens implementation
 - Should conditionally render pages on permissions
 - Should conditionally allow CRUD operations on permissions



