from django.shortcuts import render

# Create your views here.
# from rest_framework.decorators import api_view
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
            <a href="/api/">VeryCodedly</a>
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
        posts = Post.objects.filter(status="published", subcategory__slug="africa-now").distinct()[0:3]
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

    # 12
    @action(detail=False, methods=['get'])
    def keyPlayers(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="key-players").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"keyPlayers": serializer.data})

    # 13
    @action(detail=False, methods=['get'])
    def AI(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="ai").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"AI": serializer.data})
    
    # 14
    @action(detail=False, methods=['get'])
    def bchCrypto(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="blockchain-crypto").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"bchCrypto": serializer.data})
    
    # 15
    @action(detail=False, methods=['get'])
    def startups(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="startups").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"startups": serializer.data})
    
    # 16
    @action(detail=False, methods=['get'])
    def prvCompliance(self, request):
        posts = Post.objects.filter(status="published", subcategory__slug="privacy-compliance").distinct()[0:3]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        # print("big_deal posts fetched:", posts)
        return Response({"prvCompliance": serializer.data})
    
    # 17
    @action(detail=False, methods=['get'])
    def social(self, request):
        post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="social").order_by('-created_at').first()
        serializer = PostSerializer(post, context={'request': request}) if post else None
        return Response({"social": serializer.data if serializer else None})


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
