from django.db import models
from django.utils.text import slugify
from taggit.managers import TaggableManager


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    category = models.ForeignKey(
        Category,
        related_name="subcategories",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Subcategories"
        unique_together = ('category', 'slug')  # avoid duplicates under same category

    def __str__(self):
        return f"{self.category.name} → {self.name}"

    
class Post(models.Model):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("scheduled", "Scheduled"),
        ("published", "Published"),
        ("archived", "Archived"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=False, null=True, related_name="posts")
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, blank=False, null=True, related_name="posts")  

    content_JSON = models.JSONField(default=dict, blank=True)
    content_plain_text = models.TextField(blank=True)
    excerpt = models.CharField(max_length=300, blank=True)
    author = models.CharField(max_length=50, default="Admin")
    
    image = models.ImageField(upload_to='posts/', null=True)
    tags = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="draft"
    )

    def extract_plain_text(self):
        """Extracts plain text from JSON blocks if available."""
        try:
            return "\n\n".join(block.get("content", "") for block in self.content_JSON.get("blocks", []))
        except Exception:
            return ""

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            
        # auto-populate content_plain_text from JSON
        if self.content_JSON:
            self.content_plain_text = self.extract_plain_text()

        # auto-generate excerpt if empty
        if not self.excerpt and self.content_plain_text:
            self.excerpt = self.content_plain_text[:250] + "..."
            
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    body = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.name}"
