from django.contrib import admin

# Register your models here.
from .models import Topic, Format, Series, Media
from django.utils import timezone
from django.forms import Textarea
from django.db import models


@admin.action(description="Publish selected media")
def publish_media(modeladmin, request, queryset):
    queryset.update(status="published", published_at=timezone.now(),)
    
@admin.action(description="Archive selected media")
def archive_media(modeladmin, request, queryset):
    queryset.update(status="archived")
    
@admin.action(description="Mark media as featured")
def mark_featured(modeladmin, request, queryset):
    queryset.update(featured=True)   

@admin.action(description="Mark media as not featured")
def remove_featured(modeladmin, request, queryset):
    queryset.update(featured=False)
    
          
@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'featured', 'sort_order')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ['title', 'description']
    list_editable = ("featured", "sort_order")
    
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'cols': 40})},
    }

@admin.register(Format)
class FormatAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'featured', 'sort_order')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ['title', 'slug']
    list_editable = ("featured", "sort_order")
    
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'cols': 40})},
    }

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'featured', 'sort_order')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ['title', 'description']
    list_editable = ("featured", "sort_order")
    
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'cols': 40})},
    }


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('preview_thumbnail', 'title', 'topic', 'media_format', 'status', 'featured', 'published_at')
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ('status', 'featured', 'topic', 'media_format')
    search_fields = ['title', 'description', 'transcript', 'tags__name']
    
    readonly_fields = ('views', 'created_at', 'updated_at')
    actions = [publish_media, archive_media, mark_featured, remove_featured]
    list_editable = ("status", "featured")
    autocomplete_fields = ("topic", "media_format", "series")
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description')
        }),
        ('Classification', {
            'fields': ('topic', 'media_format', 'series', 'length', 'tags'),
        }),
        ('Media', {
            'fields': ('thumbnail', 'video_preview', 'duration', 'views')
        }),
        ('Links', {
            'fields': ('youtube_url', 'instagram_url', 'tiktok_url', 'twitter_url', 'facebook_url', 'linkedin_url', 'spotify_url', 'apple_url'),
            # 'classes': ('collapse',)
        }),
        ('Publishing', {
            'fields': ('status', 'featured', 'published_at'),
            # 'classes': ('collapse',)
        }),
        ("Transcript", {
            "fields": ("transcript",),
            "classes": ("collapse",),
        }),
    )
    
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'cols': 40})},
    }
    
    # Optional: Display a small thumbnail in the list view if image_url exists
    def preview_thumbnail(self, obj):
        from django.utils.html import format_html
        if obj.thumbnail:
            return format_html('<img src="{}" loading="lazy" style="width: 45px; height: 45px; border-radius: 5px;" />', obj.thumbnail)
        return "No Image"
    
    preview_thumbnail.short_description = 'Preview'
