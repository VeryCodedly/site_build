from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from django.conf import settings
from rest_framework.decorators import action
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.db.models import Q
from functools import wraps

from django.views.generic import ListView
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework import generics
from django.http import HttpResponse
from django.db.models.functions import Length
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson
from .serializers import CategoryPostsSerializer, PostSerializer, CategorySerializer, CommentSerializer, SubcategorySerializer, PostImageSerializer, PostLinkSerializer, LessonSerializer, CourseSerializer

CACHE_TTL = 60 * 10  # 10 minutes

def smart_cache(timeout=60*15):
    """
    Caches the view response BUT preserves absolute URLs by:
    - Caching the serialized data WITHOUT request context
    - Re-adding request context only on cache miss
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(self, request, *args, **kwargs):
            # Generate a cache key unique to the view + args/kwargs
            key_parts = [view_func.__name__, request.method]
            if kwargs:
                key_parts.extend([f"{k}:{v}" for k, v in sorted(kwargs.items())])
            if request.GET:
                key_parts.extend([f"{k}:{v}" for k, v in sorted(request.GET.items())])
            cache_key = "_".join(str(p) for p in key_parts)

            # Try cache first (no request context)
            result = cache.get(cache_key)
            if result is not None:
                return result

            # Cache miss → run the original view
            response = view_func(self, request, *args, **kwargs)

            # Only cache successful responses
            if hasattr(response, 'status_code') and response.status_code == 200:
                cache.set(cache_key, response, timeout)

            return response
        return _wrapped_view
    return decorator

def api_home(request):
    return HttpResponse("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VeryCodedly API</title>
            <link rel="icon" href="/static/favicon.svg">
            <style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body {
                    font-family: system-ui, sans-serif;
                    background: #000;
                    color: #fff;
                    min-height: 100vh;
                    display: grid;
                    place-items: center;
                }
                a {
                    padding: 1rem 2rem;
                    background: transparent;
                    color: #9AE600;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-decoration: none;
                    border: 2px solid #9AE600;
                    border-radius: 5rem;
                    transition: all .25s ease;
                    box-shadow: 0 0 20px rgba(57,255,20,.3);
                }
                a:hover {
                    background: #9AE600;
                    color: #000;
                    box-shadow: 0 0 30px rgba(57,255,20,.6);
                }
            </style>
        </head>
        <body>
            <a href="/">VeryCodedly</a>
        </body>
        </html>
    """)
    

@api_view(["GET"])
def global_search(request):
    q = request.GET.get("q", "").strip()
    if len(q) < 2:
        return Response({"results": []})

    results = []

    # 1. Posts
    posts = Post.objects.filter(
        Q(title__icontains=q) |
        Q(excerpt__icontains=q) |
        Q(content_plain_text__icontains=q)
    ).select_related("category", "subcategory")[:8]

    for p in posts:
        cat = p.category.name if p.category else ""
        sub = p.subcategory.name if p.subcategory else ""
        subtitle = f"{cat} → {sub}".strip(" →") if sub or cat else "Uncategorized"
        results.append({
            "type": "Post",
            "title": p.title,
            "subtitle": subtitle,
            "url": f"/blog/{p.slug}",
            "icon": "faNewspaper",
        })

    # 2. Categories
    categories = Category.objects.filter(name__icontains=q)[:5]
    for c in categories:
        results.append({
            "type": "Category",
            "title": c.name,
            "url": f"/blog/category/{c.slug}",
            "icon": "faFolderBlank",
        })

    # 3. Subcategories
    subcats = Subcategory.objects.filter(
        Q(name__icontains=q) | Q(about__icontains=q)
    )[:5]
    for s in subcats:
        results.append({
            "type": "Subcategory",
            "title": s.name,
            "subtitle": s.category.name,
            "url": f"/blog/subcategory/{s.slug}",
            "icon": "faFolderOpen",
        })

    # 4. Courses
    courses = Course.objects.filter(
        Q(title__icontains=q) | Q(description__icontains=q)
    )[:5]
    for c in courses:
        results.append({
            "type": "Course",
            "title": c.title,
            "subtitle": c.description,
            "url": f"/learn/{c.slug}",
            "icon": "faGraduationCap",
        })

    # 5. Lessons
    lessons = Lesson.objects.filter(
        Q(title__icontains=q) | Q(content_plain_text__icontains=q)
    ).select_related("course")[:6]
    for l in lessons:
        results.append({
            "type": "Lesson",
            "title": l.title,
            "subtitle": l.course.title,
            "url": f"/learn/{l.course.slug}/{l.slug}",
            "icon": "faBookOpen",
        })

    return Response({"results": results})

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(status="published").order_by("-created_at")
    serializer_class = PostSerializer
    lookup_field = "slug"

    # def _get_cached_response(self, cache_key, queryset=None, single=False):
    #     """
    #     Helper to get cached serialized data or compute & cache it.
    #     Accepts QuerySet or list-like. If single=True returns serialized single object or None.
    #     If single=False returns a list of serialized objects.
    #     """
    #     cached_data = cache.get(cache_key)
    #     if cached_data is not None:
    #         return cached_data

    #     data = None

    #     # If no queryset provided, just cache None
    #     if queryset is None:
    #         data = None
    #     else:
    #         # If a QuerySet-like object (has .first()), handle appropriately
    #         if single:
    #             # Single object expected
    #             obj = None
    #             try:
    #                 # QuerySet
    #                 if hasattr(queryset, "first"):
    #                     obj = queryset.first()
    #                 else:
    #                     # list/tuple
    #                     obj = queryset[0] if len(queryset) > 0 else None
    #             except Exception:
    #                 obj = None

    #             serializer = PostSerializer(obj) if obj else None
    #             data = serializer.data if serializer else None
    #         else:
    #             # Multiple objects expected — serializer accepts both QuerySet and list
    #             try:
    #                 serializer = PostSerializer(queryset, many=True)
    #                 data = serializer.data
    #             except Exception:
    #                 # fallback: convert to list and try again
    #                 items = list(queryset)
    #                 serializer = PostSerializer(items, many=True)
    #                 data = serializer.data

    #     cache.set(cache_key, data, CACHE_TTL)
    #     return data
    def _get_cached_response(self, cache_key, queryset=None, single=False):
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            return cached_data

        data = None
        if queryset is not None:
            if single:
                obj = queryset.first() if hasattr(queryset, 'first') else (queryset[0] if queryset else None)
                if obj:
                    serializer = PostSerializer(obj)  # ← NO context → cache works
                    data = serializer.data
            else:
                serializer = PostSerializer(queryset, many=True)  # ← NO context → cache works
                data = serializer.data

        cache.set(cache_key, data, 60 * 15)
        return data

    # SINGLE POST ENDPOINTS (featured, hardware, digitalMoney, social)
    @action(detail=False, methods=['get'])
    def featured(self, request):
        cache_key = "homepage_featured_post"
        qs = Post.objects.filter(
            image__isnull=False,
            subcategory__slug="featured"
        ).order_by('-created_at')
        data = self._get_cached_response(cache_key, qs, single=True)
        return Response({"featured": data})

    @action(detail=False, methods=['get'])
    def hardware(self, request):
        cache_key = "homepage_hardware_post"
        qs = Post.objects.filter(
            image__isnull=False,
            subcategory__slug="hardware"
        ).order_by('-created_at')
        data = self._get_cached_response(cache_key, qs, single=True)
        return Response({"hardware": data})

    @action(detail=False, methods=['get'])
    def digitalMoney(self, request):
        cache_key = "homepage_digital_money_post"
        qs = Post.objects.filter(
            image__isnull=False,
            subcategory__slug="digital-money"
        ).order_by('-created_at')
        data = self._get_cached_response(cache_key, qs, single=True)
        return Response({"digitalMoney": data})

    @action(detail=False, methods=['get'])
    def social(self, request):
        cache_key = "homepage_social_post"
        qs = Post.objects.filter(
            image__isnull=False,
            subcategory__slug="social"
        ).order_by('-created_at')
        data = self._get_cached_response(cache_key, qs, single=True)
        return Response({"social": data})
    
    @action(detail=False, methods=['get'])
    def dataDefense(self, request):
        cache_key = "homepage_data_defense_post"
        qs = Post.objects.filter(
            image__isnull=False,
            subcategory__slug="data-defense"
        ).order_by('-created_at')
        data = self._get_cached_response(cache_key, qs, single=True)
        return Response({"dataDefense": data})
    
    @action(detail=False, methods=['get'])
    def devDigest(self, request):
        cache_key = "homepage_dev_digest_post"
        qs = Post.objects.filter(
            image__isnull=False,
            subcategory__slug="dev-digest"
        ).order_by('-created_at')
        data = self._get_cached_response(cache_key, qs, single=True)
        return Response({"devDigest": data})

    # MULTIPLE POSTS ENDPOINTS (all the [0:3] or [0:4] ones)
    @action(detail=False, methods=['get'])
    def trending(self, request):
        cache_key = "homepage_trending_posts"
        qs = Post.objects.filter(subcategory__slug="trending-now").order_by('-created_at')[:6]
        data = self._get_cached_response(cache_key, qs, single=False)
        return Response({"trending": data})

    @action(detail=False, methods=['get'])
    def spotlight(self, request):
        return self._multi_post_response("spotlight", "entertainment")

    @action(detail=False, methods=['get'])
    def bigDeal(self, request):
        return self._multi_post_response("bigDeal", "big-deal")

    @action(detail=False, methods=['get'])
    def globalLens(self, request):
        return self._multi_post_response("globalLens", "wired-world")

    @action(detail=False, methods=['get'])
    def africaRising(self, request):
        return self._multi_post_response("africaRising", "africa-now")

    @action(detail=False, methods=['get'])
    def emergingTech(self, request):
        return self._multi_post_response("emergingTech", "emerging-tech")

    @action(detail=False, methods=['get'])
    def techCulture(self, request):
        return self._multi_post_response("techCulture", "tech-culture")

    @action(detail=False, methods=['get'])
    def secureHabits(self, request):
        return self._multi_post_response("secureHabits", "secure-habits")

    @action(detail=False, methods=['get'])
    def keyPlayers(self, request):
        return self._multi_post_response("keyPlayers", "key-players")

    @action(detail=False, methods=['get'])
    def AI(self, request):
        return self._multi_post_response("AI", "ai")

    @action(detail=False, methods=['get'])
    def bchCrypto(self, request):
        return self._multi_post_response("bchCrypto", "blockchain-crypto")

    @action(detail=False, methods=['get'])
    def startups(self, request):
        return self._multi_post_response("startups", "startups")

    @action(detail=False, methods=['get'])
    def prvCompliance(self, request):
        return self._multi_post_response("prvCompliance", "privacy-compliance")
    
    @action(detail=False, methods=['get'])
    def stack(self, request):
        return self._multi_post_response("stack", "stack")
    
    @action(detail=False, methods=['get'])
    def buyGuides(self, request):
        return self._multi_post_response("buyGuides", "buy-guides")
    
    @action(detail=False, methods=['get'])
    def theClimb(self, request):
        return self._multi_post_response("theClimb", "the-climb")
    
    @action(detail=False, methods=['get'])
    def rundown(self, request):
        return self._multi_post_response("rundown", "rundown")
    
    @action(detail=False, methods=['get'])
    def industryInsights(self, request):
        return self._multi_post_response("industryInsights", "industry-insights")

    # DRY HELPER FOR THE IDENTICAL MULTI-POST ENDPOINTS
    def _multi_post_response(self, response_key: str, subcategory_slug: str):
        cache_key = f"homepage_{response_key.lower()}_posts"
        qs = Post.objects.filter(subcategory__slug=subcategory_slug).order_by('-created_at')[:3]
        data = self._get_cached_response(cache_key, qs, single=False)
        return Response({response_key: data})


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    lookup_field = "slug"
    
    def get_serializer_class(self):
        # List view → simple serializer
        if self.action == "list":
            return CategorySerializer
        
        # Detail view → nested posts serializer
        if self.action == "retrieve":
            return CategoryPostsSerializer
        
        # Create/update/delete → basic serializer
        return CategorySerializer
    
        
class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.annotate(name_length=Length('name')).order_by('name_length')  # shortest → longest
    serializer_class = SubcategorySerializer
    lookup_field = 'slug'
    
    # print("SubcategoryViewSet queryset:", queryset)
    @action(detail=True, methods=['get'], url_path='posts')
    def posts(self, request, *args, **kwargs):
        subcategory = self.get_object()  # DRF handles slug lookup safely
        posts = Post.objects.filter(
            subcategory=subcategory,
            status='published'
        ).order_by('-created_at')

        serializer = PostSerializer(posts, many=True, context={'request': request})
        subcategory_serializer = SubcategorySerializer(subcategory, context={'request': request})

        return Response({
            "subcategory": subcategory_serializer.data, 
            "count": posts.count(),
            "results": serializer.data
        })
            
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class PostImageViewSet(viewsets.ModelViewSet):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
    
class PostLinkViewSet(viewsets.ModelViewSet):
    queryset = PostLink.objects.all()
    serializer_class = PostLinkSerializer
    
    
class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all().order_by("sort")
    serializer_class = CourseSerializer
    lookup_field = "slug"
    
    
class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    lookup_field = "slug"
    
    
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"


class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer

    def get_queryset(self):
        course_slug = self.kwargs["slug"]
        return Lesson.objects.filter(course__slug=course_slug).order_by("order")


class LessonDetailView(generics.RetrieveAPIView):
    serializer_class = LessonSerializer
    lookup_field = "slug"

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        return Lesson.objects.filter(course__slug=course_slug)
    
    
# ✅ Safe context override
    # def get_serializer_context(self):
    #     """
    #     Ensures that all serializers receive the request context.
    #     This allows things like full URL generation in serializers.
    #     """
    #     context = super().get_serializer_context()
    #     context.update({
    #         "request": self.request,
    #     })
    #     return context
    
    # Use
    # serializer = self.get_serializer(post) if post else None
