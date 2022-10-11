## What's included


This branch includes an implementation of permissions on a regular Django app without rest framework.

This branch includes 3 urls, two of which are protected:

list/
general/
add/  

| URL         |  Protection rule |
| ----------- | ----------- |
| list/       | blog_app.view_blog   |
| general/    | no protection        |
| add/        | blog_app.add_blog    |

Steps:

- Create a superuser
- Create a regular user and assign the permission blog_app.add_blog

The regular user will be able to create a blog, but won't be able to see them. On the opposite end, the superuser can create and view all blogs.