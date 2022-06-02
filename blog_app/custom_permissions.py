from rest_framework.permissions import BasePermission


class CanPost(BasePermission):
   def has_permission(self, request):
      return request.user.has_perm('blog_app.view_blog')
