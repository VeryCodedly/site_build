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
    images = PostImageSerializer(many=True)
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
    class Meta:
        model = Lesson
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'
        
        
class LessonResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonResource
        fields = ["title", "url"]