from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from rest_framework import status
# from django.conf import settings
from rest_framework.decorators import action
from django.db.models import Q
# from functools import wraps

from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from collections import defaultdict

# from django.http import JsonResponse
# from django.views.generic import ListView
# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response

from rest_framework import viewsets
from rest_framework import generics
from django.http import HttpResponse
from django.db.models.functions import Length
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson
from .serializers import CategoryPostsSerializer, PostSerializer, PostFeedSerializer, CategorySerializer, CommentSerializer, SubcategorySerializer, PostImageSerializer, PostLinkSerializer, LessonSerializer, CourseSerializer, CourseDetailSerializer 


CACHE_TIMEOUT = 300

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
            # <span>As you don reach here, well don, you try, but as I dey look you, waka commot before I close eye, open am. Nice meeting you.</span>
    
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
            "url": f"/read/{p.slug}",
            "icon": "faNewspaper",
        })

    # 2. Categories
    categories = Category.objects.filter(name__icontains=q)[:5]
    for c in categories:
        results.append({
            "type": "Category",
            "title": c.name,
            "url": f"/read/category/{c.slug}",
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
            "url": f"/read/subcategory/{s.slug}",
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
    search_fields = ["title", "excerpt"]


class ReadPageDataView(APIView):

    CACHE_KEY = "read_page_data"

    CATEGORY_CONFIG = {
        "featured": ("featured", 3),
        "right-now": ("trending", 6),
        "showtime": ("spotlight", 6),
        "digital-money": ("digitalMoney", 3),
        "blockchain-crypto": ("bchCrypto", 6),
        "key-players": ("keyPlayers", 6),
        "ai": ("AI", 6),
        "big-deal": ("bigDeal", 6),
        "hardware": ("hardware", 3),
        "policy-progress": ("policyProgress", 6),
        "wired-world": ("globalLens", 3),
        "africa-now": ("africaRising", 6),
        "data-defense": ("dataDefense", 3),
        "secure-habits": ("secureHabits", 6),
        "privacy-compliance": ("prvCompliance", 6),
        "beginner-guides": ("buyGuides", 6),
        "dev-digest": ("devDigest", 3),
        "upskill": ("upskill", 6),
    }

    def get(self, request):

        cached = cache.get(self.CACHE_KEY)
        if cached:
            return Response(cached)

        data = {}

        slugs = list(self.CATEGORY_CONFIG.keys())

        # ONE query for all section posts
        posts = (
            Post.objects
            .select_related("subcategory")
            .filter(
                status="published",
                subcategory__slug__in=slugs
            )
            .only(
                "id",
                "title",
                "slug",
                "image",
                "category",
                "created_at",
                "subcategory_id"
            )
            .order_by("-created_at")
        )

        grouped = defaultdict(list)

        for post in posts:

            slug = post.subcategory.slug
            key, limit = self.CATEGORY_CONFIG[slug]

            if len(grouped[slug]) < limit:
                grouped[slug].append(post)

        # serialize grouped data
        for slug, items in grouped.items():

            key, _ = self.CATEGORY_CONFIG[slug]

            data[key] = PostFeedSerializer(
                items,
                many=True,
                context={"request": request}
            ).data

        # latest posts query
        latest_posts = (
            Post.objects
            .select_related("subcategory")
            .filter(status="published")
            .only(
                "id",
                "title",
                "slug",
                "excerpt",
                "image",
                "category",
                "created_at",
                "subcategory_id"
            )
            .order_by("-created_at")[:9]
        )

        data["latest"] = PostFeedSerializer(
            latest_posts,
            many=True,
            context={"request": request}
        ).data

        cache.set(self.CACHE_KEY, data, timeout=CACHE_TIMEOUT)

        return Response(data)

        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return CategorySerializer
        if self.action == "retrieve":
            return CategoryPostsSerializer
        return CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        category = self.get_object()
        cache_key = f"category_{category.slug}_posts"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        # Fetch minimal fields for published posts
        posts = Post.objects.filter(category=category, status="published") \
            .only("title", "slug", "image", "created_at", "alt") \
            .order_by("-created_at")

        # Serialize
        serialized_posts = PostSerializer(posts, many=True, context={"request": request}).data

        # Build dict in shape CategoryPostsSerializer expects
        data = CategoryPostsSerializer(category, context={"request": request}).data
        data["posts"] = serialized_posts

        # Cache and return
        cache.set(cache_key, data, timeout=CACHE_TIMEOUT)
        return Response(data)


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.annotate(name_length=Length("name")).order_by("name_length")
    serializer_class = SubcategorySerializer
    lookup_field = "slug"

    @action(detail=True, methods=["get"], url_path="posts")
    def posts(self, request, *args, **kwargs):
        subcategory = self.get_object()  # safe DRF lookup
        cache_key = f"subcategory_{subcategory.slug}_posts"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        posts = (
            Post.objects.filter(subcategory=subcategory, status="published")
            .only("title", "slug", "image", "created_at", "alt")
            .order_by("-created_at")
        )

        serialized_posts = PostSerializer(posts, many=True, context={"request": request}).data
        data = {
            "subcategory": SubcategorySerializer(subcategory, context={"request": request}).data,
            "count": posts.count(),
            "results": serialized_posts
        }

        cache.set(cache_key, data, timeout=CACHE_TIMEOUT)
        return Response(data)


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
    lookup_field = "slug"


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    lookup_field = "slug"


class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer
    lookup_field = "slug"

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
