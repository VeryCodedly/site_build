from django.shortcuts import render

# Create your views here.
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from django.conf import settings
from rest_framework.decorators import action

from rest_framework import viewsets
from rest_framework import generics
from django.http import HttpResponse
from django.db.models.functions import Length
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson
from .serializers import PostSerializer, CategorySerializer, CommentSerializer, SubcategorySerializer, PostImageSerializer, PostLinkSerializer, LessonSerializer, CourseSerializer

def api_home(request):
    return HttpResponse("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VeryCodedly API</title>
            <link rel="icon" href="/static/favicon.svg" type="image/x-icon">
            <style>
                /* Base Reset */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Segoe UI", Roboto, Arial, sans-serif;
                    background: linear-gradient(105deg, #000000, #111111, #222222);
                    color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    overflow: hidden;
                }

                /* Neon Glow Accent */
                body::before, body::after {
                    content: "";
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.25;
                }
                body::before {
                    width: 350px;
                    height: 350px;
                    left: -100px;
                    top: 40%;
                    background: #000000;
                }
                body::after {
                    width: 250px;
                    height: 250px;
                    right: -80px;
                    top: 10%;
                    background: #111111;
                }

                .container {
                    max-width: 780px;
                    width: 90%;
                    text-align: center;
                    padding: 3rem;
                    border-radius: 1.5rem;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(0, 50, 5, 0.5);
                    box-shadow: 0 8px 30px rgba(0, 150, 0, 0.25);
                    position: relative;
                    z-index: 10;
                }

                .brand {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                    color: #ff9900; /* Neon Orange */
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                h1 {
                    font-size: 2.8rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: linear-gradient(90deg, #fff, #39ff14);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 12px rgba(57, 255, 20, 0.7);
                }

                p {
                    margin: 0.5rem 0 2.5rem;
                    color: #bbbbbb;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }

                .links {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                a {
                    padding: 0.9rem 1.6rem;
                    background: #0f0f0f;
                    color: #39ff14;
                    text-decoration: none;
                    border-radius: 2rem;
                    font-weight: 600;
                    border: 1px solid #39ff14;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 0 #39ff14;
                }

                a:hover {
                    background: #39ff14;
                    color: #000;
                    transform: translateY(-2px);
                    box-shadow: 0 0 14px #39ff14;
                }

                a:active {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 #39ff14;
                }

                .footer {
                    margin-top: 2.5rem;
                    font-size: 0.85rem;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="brand">⚡ VeryCodedly API</div>
                <h1>Greetings, Developer.</h1>
                <p>
                    The official VeryCodedly API is live.<br/>
                    Explore endpoints, test integrations, and bring your ideas to life.
                </p>
                <div class="links">
                    <a href="/api/">API Docs</a>
                    <a href="/redoc/">Redoc</a>
                    <a href="/swagger/">Swagger UI</a>
                    <a href="/community/">Community</a>
                </div>
                <div class="footer">
                    &copy; 2025 VeryCodedly. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    """)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(status="published").order_by("-created_at")
    serializer_class = PostSerializer
    lookup_field = "slug"
    
    # 1. Featured post (most recent with image)
    @action(detail=False, methods=['get'])
    def featured(self, request):
        post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="featured").order_by('-created_at').first()
        serializer = PostSerializer(post, context={'request': request}) if post else None
        return Response({"featured": serializer.data if serializer else None})

    # 2. Trending (most viewed – add view_count later, or use recent)
    @action(detail=False, methods=['get'])
    def trending(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="trending-now").order_by('-created_at')[0:4]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response({"trending": serializer.data})

    # 3. Spotlight (manual tag or field later)
    @action(detail=False, methods=['get'])
    def spotlight(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="entertainment").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("Spotlight posts fetched:", posts)
        return Response({"spotlight": serializer.data})
    
    # 4
    @action(detail=False, methods=['get'])
    def bigDeal(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="big-deal").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"bigDeal": serializer.data})
    
    # 5
    @action(detail=False, methods=['get'])
    def globalLens(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="wired-world").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"globalLens": serializer.data})
    
    # 6
    @action(detail=False, methods=['get'])
    def africaRising(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="africa-rising").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"africaRising": serializer.data})
    
    # 7
    @action(detail=False, methods=['get'])
    def hardware(self, request):
        post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="hardware").order_by('-created_at').first()
        serializer = PostSerializer(post, context={'request': request}) if post else None
        return Response({"hardware": serializer.data if serializer else None})
    
    # 8
    @action(detail=False, methods=['get'])
    def emergingTech(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="emerging-tech").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"emergingTech": serializer.data})
    
    # 9
    @action(detail=False, methods=['get'])
    def digitalMoney(self, request):
        post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="digital-money").order_by('-created_at').first()
        serializer = PostSerializer(post, context={'request': request}) if post else None
        return Response({"digitalMoney": serializer.data if serializer else None})
    
    #10
    @action(detail=False, methods=['get'])
    def techCulture(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="tech-culture").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"techCulture": serializer.data})
    
    # 11
    @action(detail=False, methods=['get'])
    def secureHabits(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="secure-habits").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"secureHabits": serializer.data})


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer

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
    queryset = Course.objects.all()
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
