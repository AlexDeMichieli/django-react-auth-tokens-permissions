## General

This project is built with Docker, React and Django Rest Framework. The idea behind this app is to experiment with custom permissions, APIs and JWT tokens.

## How to get started

- Clone the Repo
- cd into server
- Create and start a virtual environment
- run `pip install -r requirements.txt`
- run `python manage.py migrate`
- run `python manage.py createsuperuser`
- python manage.py runserver 9000

Cd into client
- run `npm start` 

## Resources

[custom permissions](https://www.sankalpjonna.com/learn-django/api-permissions-made-easy-using-django-rest-framework)

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

- User can not create a blog post, but can view them all

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


## 9/30/2022

[JWT implementation](https://pypi.org/project/djangorestframework-simplejwt/)

Request token

```bash
curl --location --request POST 'http://127.0.0.1:9000/api/token/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "xxx",
    "password": "xxx"
}'
```

Refresh Token

```bash
curl --location --request POST 'http://localhost:9000/api/token/refresh/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "refresh": "xxx"
}'
```

View blog

```bash
curl --location --request GET 'http://127.0.0.1:9000/api/viewall/' \
--header 'Authorization: Bearer <token>'
```


## Troubleshooting

- You need postgres CLI and client
- `psql` enters the postgres client
- `\du` for a list of databases
- `\password` to reset password