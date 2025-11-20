from django.contrib import admin
from .models import Post, Category, Comment, PostImage, Subcategory, PostLink, Course, Lesson, LessonResource
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin, SortableAdminBase
from .cache_helpers import clear_all_homepage_caches


class LessonInline(SortableInlineAdminMixin, admin.TabularInline):
    model = Lesson
    extra = 1
    fields = ('title', 'order', 'level', 'is_preview', 'status')
    ordering = ('order',)
    show_change_link = True
    
    
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
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {"slug": ("name",)}
    inlines = [SubcategoryInline]  # show subs in category edit page


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'slug', 'created_at')
    list_filter = ('category', 'name')
    prepopulated_fields = {"slug": ("name",)}

    
@admin.action(description="Clear all homepage caches")
def clear_homepage_cache(modeladmin, request, queryset):
    clear_all_homepage_caches()
    modeladmin.message_user(request, "Homepage caches cleared successfully!")

    
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'category', 'get_tags', 'created_at']
    search_fields = ['title', 'tags__name']
    list_filter = ['category', 'subcategory','created_at']
    
    inlines = [PostImageInline, PostLinkInline]

    actions = [clear_homepage_cache]  # Add action to admin

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
class CourseAdmin(SortableAdminBase, admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    
    inlines = [LessonInline]


@admin.register(Lesson)
class LessonAdmin(SortableAdminBase, admin.ModelAdmin):
    list_display = ('title', 'order', 'slug', 'level') # 'display_order', 
    list_filter = ('course',) 
    prepopulated_fields = {"slug": ("title",)}
    ordering = ('course', 'order',)
    
    inlines = [LessonResourceInline]
    
    # def display_order(self, obj):
    #     return obj.order
    # display_order.short_description = 'Order'