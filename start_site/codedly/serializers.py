from rest_framework import serializers
from rest_framework.filters import SearchFilter
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson, LessonResource
from taggit.serializers import TagListSerializerField


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["name", "post", "body"]


class PostImageSerializer(serializers.ModelSerializer):    
    class Meta:
        model = PostImage
        fields = ["post", "image", "alt", "caption", "url"]


class PostLinkSerializer(serializers.ModelSerializer):
    target_post = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PostLink
        fields = ["post", "label", "external_url", "type", "position", "target_post"]


class SubcategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True, source='category.name')

    class Meta:
        model = Subcategory
        fields = ["category", "name", "slug", "about"]
        
        
class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    # comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer()
    subcategory = SubcategorySerializer()
    images = PostImageSerializer(many=True, read_only=True)
    content_JSON = serializers.JSONField()

    # content_plain_text = serializers.CharField()
    links = PostLinkSerializer(many=True)
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
        
    class Meta:
        model = Post
        fields = ["title", "slug", "category", "subcategory", "content_JSON", "excerpt", "author", "caption", "image", "images", "alt", "tags", "links", "created_at"]


class PostFeedSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubcategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            "title",
            "slug",
            "excerpt",
            "image",
            "alt",
            "category",
            "subcategory",
            "created_at",
        ]
        read_only_fields = fields

class CategoryPostsSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
        
                
class LessonSerializer(serializers.ModelSerializer):
    previous_lesson = serializers.SerializerMethodField()
    next_lesson = serializers.SerializerMethodField()
    course = serializers.CharField(source="course.title", read_only=True)
    tags = TagListSerializerField()

    class Meta:
        model = Lesson
        fields = ["previous_lesson", "next_lesson", "course", "title", "slug", "description", "content_JSON", "duration", "order", "level", "video_url", "is_preview", "tags"]

    def get_previous_lesson(self, obj):
        prev = Lesson.objects.filter(course=obj.course, order__lt=obj.order).order_by('-order').first()
        return {"slug": prev.slug} if prev else None

    def get_next_lesson(self, obj):
        next = Lesson.objects.filter(course=obj.course, order__gt=obj.order).order_by('order').first()
        return {"slug": next.slug} if next else None


class CourseSerializer(serializers.ModelSerializer):
    image = serializers.CharField()
    lessons = LessonSerializer(many=True, read_only=True)
    tags = TagListSerializerField()
    
    class Meta:
        model = Course
        fields = ["lessons", "title", "slug", "description", "meta", "language", "prerequisites", "sort", "level", "image", "alt", "tags"]
        
        
class LessonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            'slug', 
            'title', 
            'order', 
            'description',
            'duration',
            'created_at',
            'updated_at'
        ]
        read_only_fields = fields


class CourseDetailSerializer(serializers.ModelSerializer):
    """Course detail with nested lessons"""
    lessons = LessonListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id',
            'slug',
            'title',
            'description',
            'image',
            'alt',
            'language',
            'prerequisites',
            'meta',
            'created_at',
            'updated_at',
            'sort',
            'lessons'
        ]


class LessonResourceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LessonResource
        fields = ["title", "url", "lesson", "description", "resource_type"]