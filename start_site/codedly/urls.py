from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PostViewSet, CategoryViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('', include(router.urls)),
]
# This code sets up the URL routing for the Django project, including the admin interface and API endpoints for posts, categories, and comments.
# It uses Django's DefaultRouter to automatically generate the necessary routes for the viewsets defined in `codedly.views`.
