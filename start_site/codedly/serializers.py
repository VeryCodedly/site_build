from rest_framework import serializers
from rest_framework.filters import SearchFilter
from .models import Post, Category, Comment, Subcategory


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    filter_backends = [SearchFilter]
    search_fields = ['title', 'content', 'tags__name']
    
    class Meta:
        model = Post
        fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['id', 'name', 'slug', 'created_at']
        
        
class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
