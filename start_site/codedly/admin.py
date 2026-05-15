from django.contrib import admin
from django.db import models
from django.forms import Textarea
from .models import Post, Category, Comment, PostImage, Subcategory, PostLink, Course, Lesson, LessonResource, StoreOrder, StoreProduct
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin, SortableAdminBase
from django.contrib import admin
from .models import PrintfulProducts, PrintfulVariant
from django.contrib import messages
from .cache_utils import bump_cache_version, invalidate_home_page, invalidate_store_cache

@admin.action(description="🔄 Clear ALL Cache")
def clear_all_cache(modeladmin, request, queryset):
    new_version = bump_cache_version()
    modeladmin.message_user(request, f"✅ All cache cleared! New version: {new_version}", messages.SUCCESS)


@admin.action(description="🏠 Clear Home Cache")
def clear_home_cache(modeladmin, request, queryset):
    invalidate_home_page()
    modeladmin.message_user(request, "✅ Home page cache cleared", messages.SUCCESS)


@admin.action(description="🛒 Clear Store Cache")
def clear_store_cache(modeladmin, request, queryset):
    invalidate_store_cache()
    modeladmin.message_user(request, "✅ Store cache cleared", messages.SUCCESS)
    
    
@admin.register(PrintfulVariant)
class PrintfulVariantAdmin(admin.ModelAdmin):
    # 1. Fields to display in the list table
    list_display = ('product', 'variant_id', 'sku', 'size', 'color', 'price', 'active', 'created_at')
    
    # 2. Add side filters for quick sorting
    list_filter = ('active',)
    
    # 3. Make the name and category searchable
    search_fields = ('name', 'product', 'sku')
    
    ordering = ['name', 'sku']
    
    # formfield_overrides = {
    #     models.TextField: {'widget': Textarea(attrs={'rows': 7, 'cols': 41})},
    # }
    
    
@admin.register(PrintfulProducts)
class PrintfulProductsAdmin(admin.ModelAdmin):
    # 1. Fields to display in the list table
    list_display = ('thumbnail', 'name', 'category', 'price', 'is_active', 'updated_at')
    
    # 2. Add side filters for quick sorting
    list_filter = ('category', 'is_active')
    
    # 3. Make the name and category searchable
    search_fields = ('name', 'category', 'tagline')
    
    ordering = ['category', 'name']
    
    # 4. Group fields into logical sections in the edit form
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'fancy_name', 'tagline', 'category', 'description', 'price', 'image_url', 'thumbnail_url', 'status')
        }),
        ('Printful Configuration', {
            'fields': ('printful_id', 'slug', 'variant_mapping'),
            'description': 'Mapping data fetched from Printful API'
        }),
        ('Brand & Visibility', {
            'fields': ('is_active',),
        }),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 7, 'cols': 41})},
    }

    # 5. Read-only fields to prevent accidental edits to API data
    readonly_fields = ('printful_id', 'updated_at', 'created_at')
    actions = [clear_all_cache, clear_store_cache]

    # Optional: Display a small thumbnail in the list view if image_url exists
    def thumbnail(self, obj):
        from django.utils.html import format_html
        if obj.image_url:
            return format_html('<img src="{}" style="width: 45px; height: 45px; border-radius: 5px;" />', obj.image_url)
        return "No Image"
    
    thumbnail.short_description = 'Preview'
    # Add 'thumbnail' to list_display if you want to see the image in the list


@admin.register(StoreProduct)
class StoreProductAdmin(admin.ModelAdmin):
    list_display = ['product_id', 'name', 'price', 'category', 'status', 'sort_order', 'created_at']
    list_filter = ['category', 'status', 'created_at']
    search_fields = ['product_id', 'name', 'description']
    list_editable = ['price', 'status', 'sort_order']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('product_id', 'name', 'description', 'price', 'category')
        }),
        ('Details & Images', {
            'fields': ('details', 'images'),
            # 'help_text': 'Details: JSON array of strings. Images: JSON array of objects with src, alt, side'
        }),
        ('Status & Ordering', {
            'fields': ('status', 'sort_order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'cols': 40})},
    }
    actions = [clear_all_cache, clear_home_cache]
    
    def save_model(self, request, obj, form, change):
        # Ensure product_id is unique and properly formatted
        if not obj.product_id:
            import uuid
            obj.product_id = str(uuid.uuid4())[:8].upper()
        super().save_model(request, obj, form, change)
        
        
@admin.register(StoreOrder)
class StoreOrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'customer_name', 'customer_email', 'total_amount', 'currency', 'status', 'created_at']
    list_filter = ['status', 'payment_status', 'created_at', 'currency']
    search_fields = ['order_id', 'customer_name', 'customer_email', 'payment_reference']
    readonly_fields = ['order_id', 'payment_reference', 'created_at', 'updated_at', 'payment_response']
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_id', 'status', 'created_at', 'updated_at')
        }),
        ('Customer Details', {
            'fields': ('customer_name', 'customer_email', 'customer_phone')
        }),
        ('Shipping Address', {
            'fields': ('shipping_address', 'shipping_address2', 'shipping_city', 'shipping_state', 'shipping_country', 'shipping_postal')
        }),
        ('Order Items', {
            'fields': ('items', 'subtotal', 'shipping_cost', 'tax', 'total_amount', 'currency')
        }),
        ('Payment', {
            'fields': ('tx_ref', 'flw_ref', 'payment_reference', 'payment_status', 'payment_response')
        }),
        ('Fulfillment', {
            'fields': ('tracking_number', 'tracking_url', 'notes')
        }),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'cols': 40})},
    }
    
    # def get_readonly_fields(self, request, obj=None):
    #     if obj:  # Editing existing object
    #         return self.readonly_fields + ['payment_reference', 'payment_status']
    #     return self.readonly_fields


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
    
    actions = [clear_all_cache, clear_home_cache]


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'slug', 'created_at')
    list_filter = ('category', 'name')
    prepopulated_fields = {"slug": ("name",)}
    
    actions = [clear_all_cache, clear_home_cache]

    
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'subcategory', 'get_tags', 'created_at']
    search_fields = ['title', 'tags__name']
    list_filter = ['category', 'subcategory','created_at']
    list_per_page = 200
    
    inlines = [PostImageInline, PostLinkInline]
    actions = [clear_all_cache, clear_home_cache]

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
    actions = [clear_all_cache, clear_home_cache]


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
