from rest_framework import serializers
from .models import Topic, Format, Series, Media


class TopicSerializer(serializers.ModelSerializer):
    media_count = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = ("title", "slug", "description", "media_count")
        
    def get_media_count(self, obj):
        return obj.media.filter(status="published").count()
        
        
class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = ("title", "slug")        
        
        
class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ("title", "slug", "description")
        
        
class MediaCardSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    media_format = FormatSerializer(read_only=True)
    series = SeriesSerializer(read_only=True)
    
    class Meta:
        model = Media
        fields = ["title", "slug", "topic", "media_format", "series", "length", "thumbnail", "video_preview", "duration", "views", "featured", "published_at"]
        
        
class MediaSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    media_format = FormatSerializer(read_only=True)
    series = SeriesSerializer(read_only=True)
    tags = serializers.StringRelatedField(many=True)
    related = serializers.SerializerMethodField()
    series_media = serializers.SerializerMethodField()
    # topic_media = serializers.SerializerMethodField()    
    
    class Meta:
        model = Media
        fields = ["title", "slug", "topic", "media_format", "series", "length", "description", "transcript", "featured", "thumbnail", "video_preview", "duration", "views", 
                  "youtube_url", "instagram_url", "tiktok_url", "facebook_url", "linkedin_url", "spotify_url", "apple_url", "tags", "published_at", "status", "created_at", "updated_at", "related", "series_media"
        ] #  "topic_media"
        
    def get_related(self, obj):
        queryset = (
            Media.objects.filter(
                status="published",
                topic=obj.topic,
            )
            .exclude(pk=obj.pk)
            .order_by("-published_at")[:3]
        )

        return MediaCardSerializer(queryset, many=True).data
    
    def get_series_media(self, obj):
        if not obj.series:
            return []

        queryset = (
            Media.objects
            .select_related("media_format", "series")
            .filter(
                status="published",
                series=obj.series,
            )
            .exclude(pk=obj.pk)
            .order_by("-published_at")[:4]
        )

        return MediaCardSerializer(queryset, many=True).data 
        
    # def get_topic_media(self, obj):
    #     queryset = (
    #         Media.objects
    #         .select_related("topic", "media_format", "series")
    #         .filter(
    #             status="published",
    #             topic=obj.topic,
    #         )
    #         .exclude(pk=obj.pk)
    #         .order_by("-published_at")[:4]
    #     )

    #     return MediaCardSerializer(queryset, many=True).data 
        