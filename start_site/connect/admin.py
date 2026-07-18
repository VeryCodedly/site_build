from django.contrib import admin
from .models import Room, Discussion, Message

# Register your models here.

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "icon", "sort_order", "is_active")

    list_editable = ("sort_order", "is_active")

    prepopulated_fields = {
        "slug": ("title",)
    }

    ordering = ("sort_order", "title")
    
    
@admin.register(Discussion)
class DiscussionAdmin(admin.ModelAdmin):
    list_display = ("room", "date", "opened_at", "closed_at")

    list_filter = ("room", "date")

    ordering = ("-date",)
    
    
@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("handle", "discussion", "preview", "created_at", "deleted")

    list_filter = ("deleted", "discussion__room")

    search_fields = ("handle", "content")

    list_editable = ("deleted",)

    ordering = ("-created_at",)

    readonly_fields = ("created_at", "ip_hash")

    def preview(self, obj):
        return obj.content[:70]

    preview.short_description = "Message"