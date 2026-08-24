from django.db import models
from taggit.managers import TaggableManager

# Create your models here.
STATUS_CHOICES = [
        ("draft", "Draft"),
        ("scheduled", "Scheduled"),
        ("published", "Published"),
        ("archived", "Archived"),
    ]


class Topic(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
            return self.title
    
    
class Format(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    def __str__(self):
            return self.title
    
    
class Series(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    def __str__(self):
            return self.title


class Media(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="media")
    media_format = models.ForeignKey(Format, on_delete=models.CASCADE, related_name="media")
    length = models.CharField( max_length=10, choices=[("short","Short"), ("long","Long")])
    
    series = models.ForeignKey(Series, null=True, blank=True, on_delete=models.CASCADE, related_name="media")
    description = models.TextField()
    transcript = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    
    thumbnail = models.URLField(default="https://res.cloudinary.com/verycodedly/image/upload/v1779024976/back-post-img.png")
    video_preview = models.URLField(blank=True)
    duration = models.CharField(max_length=10, blank=True, null=True, help_text="Actual Duration")
    views = models.PositiveIntegerField(default=1)
    
    youtube_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    tiktok_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    facebook_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    spotify_url = models.URLField(blank=True, null=True)
    apple_url = models.URLField(blank=True, null=True)
    
    tags = TaggableManager(blank=True)
    published_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="published")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
            ordering = ["-published_at", "-created_at",]
    
    def __str__(self):
            return self.title