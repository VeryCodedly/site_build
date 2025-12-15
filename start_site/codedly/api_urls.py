from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import SubcategoryViewSet, PostViewSet, CategoryViewSet, CommentViewSet, PostImageViewSet, PostLinkViewSet, CourseViewSet, LessonViewSet, CourseListView, CourseDetailView, LessonListView, LessonDetailView


router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'subcategories', SubcategoryViewSet, basename='subcategory')
router.register(r'postimages', PostImageViewSet, basename='postimage')
router.register(r'postlinks', PostLinkViewSet, basename='postlink')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'lessons', LessonViewSet, basename='lesson')


urlpatterns = [
    path('', include(router.urls)),
    path("", CourseListView.as_view(), name="course-list"),
    path("<slug:slug>/", CourseDetailView.as_view(), name="course-detail"),
    path("<slug:slug>/", LessonListView.as_view(), name="lesson-list"),
    path("<slug:course_slug>/<slug:slug>/", LessonDetailView.as_view(), name="lesson-detail"),

]
# This code sets up the URL routing for the Django project, including the admin interface and API endpoints for posts, categories, and comments.
# It uses Django's DefaultRouter to automatically generate the necessary routes for the viewsets defined in `codedly.views`.
