from rest_framework import serializers
from rest_framework.filters import SearchFilter
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson, LessonResource


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PostImageSerializer(serializers.ModelSerializer):    
    class Meta:
        model = PostImage
        fields = '__all__'


class PostLinkSerializer(serializers.ModelSerializer):
    target_post = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PostLink
        fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True, source='category.name')

    class Meta:
        model = Subcategory
        fields = '__all__'
        
        
class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer()
    subcategory = SubcategorySerializer()
    images = PostImageSerializer(many=True, read_only=True)
    content_JSON = serializers.JSONField()

    # content_plain_text = serializers.CharField()
    links = PostLinkSerializer(many=True)
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    
    queryset = Post.objects.filter(status="published")
    filter_backends = [SearchFilter]
    search_fields = '__all__'
    
    class Meta:
        model = Post
        fields = '__all__'

        
class LessonSerializer(serializers.ModelSerializer):
    previous_lesson = serializers.SerializerMethodField()
    next_lesson = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = "__all__"

    def get_previous_lesson(self, obj):
        prev = Lesson.objects.filter(course=obj.course, order__lt=obj.order).order_by('-order').first()
        return {"slug": prev.slug} if prev else None

    def get_next_lesson(self, obj):
        next = Lesson.objects.filter(course=obj.course, order__gt=obj.order).order_by('order').first()
        return {"slug": next.slug} if next else None

class CourseSerializer(serializers.ModelSerializer):
    image = serializers.CharField()
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'
        
        
class LessonResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonResource
        fields = ["title", "url"]