from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from django.conf import settings
from rest_framework.decorators import action
from django.db.models import Q
from functools import wraps
import time
from django.core.cache import cache

from django.http import JsonResponse
from django.views.generic import ListView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import viewsets
from rest_framework import generics
from django.http import HttpResponse
from django.db.models.functions import Length
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson
from .serializers import CategoryPostsSerializer, PostSerializer, CategorySerializer, CommentSerializer, SubcategorySerializer, PostImageSerializer, PostLinkSerializer, LessonSerializer, CourseSerializer


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
    search_fields = '__all__'

    # SINGLE POST ENDPOINTS
    # @action(detail=False, methods=['get'])
    # def featured(self, request):
    #     post = Post.objects.filter(
    #         image__isnull=False,
    #         subcategory__slug="featured"
    #     ).order_by('-created_at').first()
    #     data = PostSerializer(post).data if post else None
    #     return Response({"featured": data})

    # @action(detail=False, methods=['get'])
    # def hardware(self, request):
    #     post = Post.objects.filter(subcategory__slug="hardware", image__isnull=False).order_by('-created_at').first()
    #     data = PostSerializer(post).data if post else None
    #     return Response({"hardware": data})
    
    # MULTIPLE POSTS ENDPOINTS
    @action(detail=False, methods=['get'])
    def featured(self, request):
        posts = Post.objects.filter(subcategory__slug="featured").order_by('-created_at')[:3]
        data = PostSerializer(posts, many=True).data
        return Response({"featured": data})
    
    @action(detail=False, methods=['get'])
    def hardware(self, request):
        posts = Post.objects.filter(subcategory__slug="hardware").order_by('-created_at')[:3]
        data = PostSerializer(posts, many=True).data
        return Response({"hardware": data})
    
    @action(detail=False, methods=['get'])
    def digitalMoney(self, request):
        posts = Post.objects.filter(subcategory__slug="digital-money").order_by('-created_at')[:3]
        data = PostSerializer(posts, many=True).data
        return Response({"digitalMoney": data})
    
    @action(detail=False, methods=['get'])
    def globalLens(self, request):
        posts = Post.objects.filter(subcategory__slug="wired-world").order_by('-created_at')[:3]
        data = PostSerializer(posts, many=True).data
        return Response({"globalLens": data})
    
    @action(detail=False, methods=['get'])
    def dataDefense(self, request):
        posts = Post.objects.filter(subcategory__slug="data-defense").order_by('-created_at')[:3]
        data = PostSerializer(posts, many=True).data
        return Response({"dataDefense": data})
    
    @action(detail=False, methods=['get'])
    def devDigest(self, request):
        posts = Post.objects.filter(subcategory__slug="dev-digest").order_by('-created_at')[:3]
        data = PostSerializer(posts, many=True).data
        return Response({"devDigest": data})

    @action(detail=False, methods=['get'])
    def trending(self, request):
        posts = Post.objects.filter(subcategory__slug="trending-now").order_by('-created_at')[:6]
        data = PostSerializer(posts, many=True).data
        return Response({"trending": data})
    
    # DRY helper for the [:6]
    def _multi_posts(self, subcategory_slug):
        posts = Post.objects.filter(subcategory__slug=subcategory_slug).order_by('-created_at')[:6]
        return PostSerializer(posts, many=True).data

    @action(detail=False, methods=['get'])
    def spotlight(self, request): 
        return Response({"spotlight": self._multi_posts("entertainment")})
    @action(detail=False, methods=['get'])
    def bigDeal(self, request): 
        return Response({"bigDeal": self._multi_posts("big-deal")})
    @action(detail=False, methods=['get'])
    def policyProgress(self, request): 
        return Response({"policyProgress": self._multi_posts("policy-progress")})
    @action(detail=False, methods=['get'])
    def africaRising(self, request): 
        return Response({"africaRising": self._multi_posts("africa-now")})
    @action(detail=False, methods=['get'])
    def emergingTech(self, request): 
        return Response({"emergingTech": self._multi_posts("emerging-tech")})
    @action(detail=False, methods=['get'])
    def techCulture(self, request): 
        return Response({"techCulture": self._multi_posts("tech-culture")})
    @action(detail=False, methods=['get'])
    def secureHabits(self, request): 
        return Response({"secureHabits": self._multi_posts("secure-habits")})
    @action(detail=False, methods=['get'])
    def keyPlayers(self, request): 
        return Response({"keyPlayers": self._multi_posts("key-players")})
    @action(detail=False, methods=['get'])
    def AI(self, request): 
        return Response({"AI": self._multi_posts("ai")})
    @action(detail=False, methods=['get'])
    def bchCrypto(self, request): 
        return Response({"bchCrypto": self._multi_posts("blockchain-crypto")})
    @action(detail=False, methods=['get'])
    def startups(self, request): 
        return Response({"startups": self._multi_posts("startups")})
    @action(detail=False, methods=['get'])
    def prvCompliance(self, request): 
        return Response({"prvCompliance": self._multi_posts("privacy-compliance")})
    @action(detail=False, methods=['get'])
    def stack(self, request): 
        return Response({"stack": self._multi_posts("stack")})
    @action(detail=False, methods=['get'])
    def buyGuides(self, request): 
        return Response({"buyGuides": self._multi_posts("beginner-guides")})
    @action(detail=False, methods=['get'])
    def theClimb(self, request): 
        return Response({"theClimb": self._multi_posts("the-climb")})
    @action(detail=False, methods=['get'])
    def rundown(self, request): 
        return Response({"rundown": self._multi_posts("rundown")})
    @action(detail=False, methods=['get'])
    def industryInsights(self, request): 
        return Response({"industryInsights": self._multi_posts("industry-insights")})


class ReadPageDataView(APIView):
    def get(self, request):
        viewset = PostViewSet()
        viewset.request = request  # needed for full URLs in serializer

        def multi(slug, limit=3):
            posts = Post.objects.filter(subcategory__slug=slug).order_by('-created_at')[:limit]
            return PostSerializer(posts, many=True, context={'request': request}).data

        return Response({
            "latest": PostSerializer(
                Post.objects.filter(status="published").order_by('-created_at')[:10],
                many=True,
                context={'request': request}
            ).data,

            "featured": multi("featured", 3),
            "trending": viewset._multi_posts("trending-now"),
            "spotlight": viewset._multi_posts("entertainment"),
            "bigDeal": viewset._multi_posts("big-deal"),
            "digitalMoney": multi("digital-money", 3),
            "bchCrypto": viewset._multi_posts("blockchain-crypto"),
            "startups": viewset._multi_posts("startups"),
            "prvCompliance": viewset._multi_posts("privacy-compliance"),
            "AI": viewset._multi_posts("ai"),
            "emergingTech": viewset._multi_posts("emerging-tech"),
            "hardware": multi("hardware", 3),
            "techCulture": viewset._multi_posts("tech-culture"),
            "policyProgress": viewset._multi_posts("policy-progress"),
            "globalLens": multi("wired-world", 3),
            "africaRising": viewset._multi_posts("africa-now"),
            "keyPlayers": viewset._multi_posts("key-players"),
            "dataDefense": multi("data-defense", 3),
            "secureHabits": viewset._multi_posts("secure-habits"),
            "stack": viewset._multi_posts("stack"),
            "buyGuides": viewset._multi_posts("beginner-guides"),
            "devDigest": multi("dev-digest", 3),
            "theClimb": viewset._multi_posts("the-climb"),
            "rundown": viewset._multi_posts("rundown"),
            "industryInsights": viewset._multi_posts("industry-insights"),
        })
        
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
    lookup_field = "slug"


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
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
