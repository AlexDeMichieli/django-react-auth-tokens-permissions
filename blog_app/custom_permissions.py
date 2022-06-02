from rest_framework.permissions import BasePermission


class CanCreate(BasePermission):
   def has_permission(self, request, view):
      return request.user.has_perm('blog_app.add_blog')
