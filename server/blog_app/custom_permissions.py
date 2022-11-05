from rest_framework.permissions import BasePermission


class CanCreate(BasePermission):
   def has_permission(self, request, view):
      return request.user.has_perm('blog_app.add_blog')

class CanView(BasePermission):
   def has_permission(self, request, view):
      return request.user.has_perm('blog_app.view_blog')

class CanEdit(BasePermission):
   def has_permission(self, request, view):
      return request.user.has_perm('blog_app.change_blog')

class CanDelete(BasePermission):
   def has_permission(self, request, view):
      return request.user.has_perm('blog_app.delete_blog')
