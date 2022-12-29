# Blog App

Welcome to the Blog App! This app is built with Django REST, React and Postgres. The app is Dockerized and ready for production, as requests are served by Gunicorn and Nginx.

# Custom Permissions

The app includes custom permissions to ensure that only users with the appropriate permissions can perform certain actions. These permissions are set in the Django admin panel. The app includes the following custom permissions:

CanCreate: Allows a user to create a new blog post
CanView: Allows a user to view existing blog posts
CanEdit: Allows a user to edit existing blog posts
CanDelete: Allows a user to delete existing blog posts

# Authentication Endpoints
The app includes the following endpoints for authenticating users:

## Request Token
To request a token, send a POST request to http://0.0.0.0/api/token/ with the following JSON payload:

```bash
{
    "username": "xxx",
    "password": "xxx"
}

```
## Refresh Token

To refresh a token, send a POST request to http://0.0.0.0/api/token/refresh/ with the following JSON payload:

```bash

{
    "refresh": "xxx"
}
```

## View Blog posts

To view all blog posts, send a GET request to http://0.0.0.0/api/viewall/ with an Authorization header containing a valid bearer token.

## Inspiration

This app was inspired by the tutorial found at https://saasitive.com/tutorial/docker-compose-django-react-nginx-let-s-encrypt/.