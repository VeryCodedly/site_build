from django.contrib import admin
from .models import Post, Category, Comment, PostImage, Subcategory, PostLink, Course, Lesson, LessonResource
from adminsortable2.admin import SortableAdminMixin


class LessonResourceInline(admin.TabularInline):
    model = LessonResource
    extra = 1

class SubcategoryInline(admin.TabularInline):  
    model = Subcategory
    extra = 1


class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1  
   
   
class PostLinkInline(admin.TabularInline):
    model = PostLink
    extra = 1
    fk_name = "post"   # relate this inline to Post
    
       
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {"slug": ("name",)}
    inlines = [SubcategoryInline]  # show subs in category edit page


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'slug', 'created_at')
    list_filter = ('category',)
    prepopulated_fields = {"slug": ("name",)}
    
    
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'category', 'get_tags', 'created_at']
    search_fields = ['title', 'tags__name']
    list_filter = ['category', 'created_at']
    
    inlines = [PostImageInline, PostLinkInline]

    def get_tags(self, obj):
        return ", ".join(tag.name for tag in obj.tags.all())
    get_tags.short_description = 'Tags'


@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ['post', 'alt', 'caption', 'created_at']
    search_fields = ['post__title', 'alt', 'caption']
    list_filter = ['created_at']
    

@admin.register(PostLink)
class PostLinkAdmin(admin.ModelAdmin):
    list_display = ['post', 'label', 'external_url', 'target_post', 'type']
    search_fields = ['post__title', 'label', 'external_url', 'target_post', 'type']
    list_filter = ['type']
    
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['post', 'name', 'created_at']
    search_fields = ['name', 'body']
    list_filter = ['created_at']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Lesson)
class LessonAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('title', 'order', 'created_at') # 'display_order', 
    prepopulated_fields = {"slug": ("title",)}
    ordering = ('order',)
    
    inlines = [LessonResourceInline]
    
    # def display_order(self, obj):
    #     return obj.order
    # display_order.short_description = 'Order'