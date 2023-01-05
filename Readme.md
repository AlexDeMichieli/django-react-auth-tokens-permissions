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

## Deploy

1) Create a VM on Azure. A low cost one would work (~9 a month)
2) Once the VM is ready, grab the public IP address. E.g 20.245.52.000
3) Change the default.conf file in the docker/nginx/development folder to rerout all traffic from that IP:

```javascript
server {
    listen 80;
    server_name 20.245.52.000;
    server_tokens off;

    client_max_body_size 20M;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
```
2) SSH to the VM: `ssh -i <path to pem> <your VM IP>`
3) run

```bash
sudo snap install docker
mkdir app
```
4) Cd into the project folder on your local machine and run:
```bash
rsync -avz -progress -e "ssh -i <path to pem>" --exclude backend/venv --exclude frontend/node_modules . <azure vm address>:/home/azureuser/app/
```
5) run

```bash
sudo docker-compose build
sudo docker-compose up
```

6) Visit `http://<your VM ip>` to see the app! Visit `http://<your VM ip>/admin` for the ADMIN panel

# Create user

 - SSH into your virtual machine
 - run `sudo docker ps` to grab the `id` of the backend container
 - run `sudo docker exec -it <id> //bin//sh` to enter the backed container
 - cd into the app/backend and run `python3 manage.py createsuperuser`