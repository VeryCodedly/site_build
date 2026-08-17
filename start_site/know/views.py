from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Topic, Format, Series, Media
from .serializers import TopicSerializer, FormatSerializer, SeriesSerializer, MediaCardSerializer, MediaSerializer
from django.db.models import Q
from rest_framework.request import Request
from rest_framework.views import APIView
from django.core.cache import cache
from codedly.cache_utils import make_cache_key
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import F


HOME_CACHE_TTL = 86400

KNOW_MAIN_CONFIG = {
    "videos": ("video", 4),
    "shorts": ("short", 4),
    "skits": ("skit", 4),
    "episodes": ("episode", 4),
}

KNOW_MORE_CONFIG = {
    "podcasts": ("podcast", 4),
    "interviews": ("interview", 4),
    "livestreams": ("livestream", 4),
    "talks": ("talk", 4),
}

KNOW_SECTION_MAP = {
    "main": KNOW_MAIN_CONFIG,
    "more": KNOW_MORE_CONFIG,
}


class TopicListView(generics.ListAPIView):
    queryset = Topic.objects.all().order_by("title")
    serializer_class = TopicSerializer
    lookup_field = "slug"
    

class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.all().order_by("title")
    serializer_class = TopicSerializer
    lookup_field = "slug"

    
class FormatListView(generics.ListAPIView):
    queryset = Format.objects.all().order_by("title")
    serializer_class = FormatSerializer
    lookup_field = "slug"
    

class FormatDetailView(generics.RetrieveAPIView):
    queryset = Format.objects.all().order_by("title")
    serializer_class = FormatSerializer
    lookup_field = "slug"
    
        
class SeriesListView(generics.ListAPIView):
    queryset = Series.objects.all().order_by("sort_order", "title")
    serializer_class = SeriesSerializer
    lookup_field = "slug"
    

class SeriesDetailView(generics.RetrieveAPIView):
    queryset = Series.objects.all().order_by("title")
    serializer_class = SeriesSerializer
    lookup_field = "slug"
    
            
class MediaListView(generics.ListAPIView):
    request: Request    # For Pylance warning, dont use GET
    serializer_class = MediaCardSerializer
    lookup_field = "slug"
    
    def get_queryset(self):
        queryset = (
            Media.objects
            .filter(status="published")
            .select_related("topic", "media_format", "series")
            .prefetch_related("tags")
            .order_by("-published_at", "-created_at")
        )
        
        topic = self.request.query_params.get("topic")
        media_format = self.request.query_params.get("format")
        series = self.request.query_params.get("series")
        length = self.request.query_params.get("length")
        featured = self.request.query_params.get("featured")
        tag = self.request.query_params.get("tag")
        sort = self.request.query_params.get("sort")

        if sort == "popular":
            queryset = queryset.order_by("-views")
        elif sort == "oldest":
            queryset = queryset.order_by("published_at")
        else:
            queryset = queryset.order_by("-published_at")

        if topic:
            queryset = queryset.filter(topic__slug=topic)
        if media_format:
            queryset = queryset.filter(media_format__slug=media_format)
        if series:
            queryset = queryset.filter(series__slug=series)
        if length:
            queryset = queryset.filter(length=length)
        if featured == "true":
            queryset = queryset.filter(featured=True)
        if tag:
            queryset = queryset.filter(tags__slug=tag)

        return queryset.distinct().order_by("-published_at", "-created_at")
      
            
class MediaDetailView(generics.RetrieveAPIView):
    queryset = Media.objects.filter(status="published").order_by("-created_at")
    serializer_class = MediaSerializer
    lookup_field = "slug"
    # search_fields = ["title", "topic__title", "description", "series__title", "tags__name"]
    
    def get_queryset(self):
        return (
            Media.objects
            .filter(status="published")
            .select_related("topic", "media_format", "series")
            .prefetch_related("tags")
            .order_by("-published_at", "-created_at")
        )   


class KnowHomeView(APIView):
    def get(self, request):
        cache_key = make_cache_key("know_home")
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        featured = (
            Media.objects
            .select_related("topic", "media_format", "series")
            .filter(
                status="published",
                featured=True,
            )
            .order_by("-published_at")[:4]
        )

        latest = (
            Media.objects
            .select_related("topic", "media_format", "series")
            .filter(status="published")
            .order_by("-published_at")[:8]
        )

        data = {
            "featured": MediaCardSerializer(
                featured,
                many=True,
                context={"request": request},
            ).data,

            "latest": MediaCardSerializer(
                latest,
                many=True,
                context={"request": request},
            ).data,
        }

        cache.set(cache_key, data, timeout=HOME_CACHE_TTL)
        return Response(data)
    
    
class KnowFormatSectionView(APIView):
    def get_media(self, slug, limit, request):
        queryset = (
            Media.objects.select_related(
                "topic",
                "media_format",
                "series",
            )
            .filter(
                status="published",
                media_format__slug=slug,
            )
            .order_by("-published_at")[:limit]
        )

        return MediaCardSerializer(
            queryset,
            many=True,
            context={"request": request},
        ).data

    def get(self, request, section):
        config = KNOW_SECTION_MAP.get(section)
        
        if not config:
            return Response(
                {"detail": "Invalid section"},
                status=404,
            )
            
        cache_key = make_cache_key(f"know_section_{section}")
        cached = cache.get(cache_key)
        
        if cached:
            return Response(cached)

        data = {}
            # "videos": self.get_media("video", 4, request),
            # "shorts": self.get_media("short", 4, request),
            # "skits": self.get_media("skit", 4, request),
            # "episodes": self.get_media("episode", 4, request),
            # "podcasts": self.get_media("podcast", 4, request),
            # "interviews": self.get_media("interview", 4, request),
            # "livestreams": self.get_media("livestream", 4, request),
            # "talks": self.get_media("talk", 4, request),
            
        for key, (slug, limit) in config.items():
            data[key] = self.get_media(
                slug=slug,
                limit=limit,
                request=request,
            )

        cache.set(cache_key, data, timeout=HOME_CACHE_TTL)
        return Response(data)
    
    

class KnowSearchPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 24


class KnowSearchView(APIView):
    def get(self, request):
        query = request.query_params.get("q", "").strip()

        if not query:
            return Response({
                "count": 0,
                "next": None,
                "previous": None,
                "results": [],
            })

        queryset = (
            Media.objects
            .select_related(
                "topic",
                "media_format",
                "series",
            )
            .filter(
                status="published",
            )
            .filter(
                Q(title__icontains=query)
                | Q(description__icontains=query)
                | Q(transcript__icontains=query)
                | Q(topic__title__icontains=query)
                | Q(media_format__title__icontains=query)
                | Q(series__title__icontains=query)
                | Q(tags__name__icontains=query)
            )
            .order_by(
                "-published_at",
                "-created_at",
            )
            .distinct()
        )

        paginator = KnowSearchPagination()
        page = paginator.paginate_queryset(queryset, request)

        serializer = MediaCardSerializer(page, many=True, context={"request": request})

        return paginator.get_paginated_response(serializer.data)
    
    
class MediaViewCountView(APIView):
    def post(self, request, slug):
        updated = Media.objects.filter(
            slug=slug,
            status="published",
        ).update(
            views=F("views") + 1
        )

        if not updated:
            return Response(status=404)

        return Response(status=204)