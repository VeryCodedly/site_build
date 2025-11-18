from django.db import models
from django.utils.text import slugify
from taggit.managers import TaggableManager
# from django.contrib.auth.models import User

RESOURCE_TYPES = [
        ("article", "Article"),
        ("video", "Video"),
        ("book", "Book / PDF"),
        ("repo", "GitHub Repo"),
        ("docs", "Documentation"),
        ("other", "Other"),
    ]

STATUS_CHOICES = [
        ("draft", "Draft"),
        ("scheduled", "Scheduled"),
        ("published", "Published"),
        ("archived", "Archived"),
    ]


def flatten_blocks(content_json: dict) -> str:
    """
    Flattens structured JSON blocks into plain text for SEO, search, and previews.
    Handles paragraphs, headings, lists, code, quotes, images, and inline spans.
    """

    if not content_json or "blocks" not in content_json:
        return ""

    parts = []

    for block in content_json.get("blocks", []):
        block_type = block.get("type")

        # --- Text-based blocks (paragraph, heading, etc.)
        if "content" in block:
            content = block["content"]

            if isinstance(content, list):
                spans = []
                for span in content:
                    text = span.get("text", "")
                    url = span.get("url")
                    if url:
                        # Inline link fallback → "text (url)"
                        spans.append(f"{text} ({url})")
                    else:
                        spans.append(text)
                text = "".join(spans)
            else:
                text = str(content)
                
                # Flatten inline spans (bold, italic, links etc.)
            #     text = "".join(span.get("text", "") for span in content)
            # else:
            #     text = str(content)

            # if block_type == "heading":
            #     text = text.title().strip().capitalize()  # optional: make headings stand out

            parts.append(text.strip())

        # --- Lists (bulleted or numbered)
        elif "items" in block:
            items = block.get("items", [])
            style = block.get("style", "bullet")  # default = bullet

            if style == "number":
                text = "\n".join(f"{i+1}. {item}" for i, item in enumerate(items))
            else:
                text = "\n".join(f"• {item}" for item in items)

            parts.append(text.strip())

        # Links
        elif block_type == "link":
            text = f"{block.get('text', '')} ({block.get('url', '')})"
            parts.append(text.strip())
            
                # --- Tables
        elif block_type == "table":
            headers = block.get("headers", [])
            rows = block.get("rows", [])

            # Convert header row
            if headers:
                parts.append(" | ".join(headers))

            # Convert each table row
            for row in rows:
                parts.append(" | ".join(str(cell) for cell in row))

        # --- Code blocks
        elif block_type == "code":
            code = block.get("content", "")
            parts.append(f"[CODE]\n{code}\n[/CODE]")

        # --- Quotes
        elif block_type == "quote":
            content = block.get("content", "")
            parts.append(f"“{content}”")

        # --- Images
        elif block_type == "image":
            caption = block.get("caption", "")
            if caption:
                parts.append(f"[Image: {caption}]")

        # --- Fallback (if no recognized keys)
        else:
            text = str(block.get("content", "")).strip()
            if text:
                parts.append(text)
        
    return "\n\n".join(p for p in parts if p)



class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=40, unique=True, blank=True)
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
    slug = models.SlugField(max_length=40, unique=True, blank=True)
    about = models.TextField(blank=True, null=True, help_text="Short 'About this' section for context.")
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
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=60, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=False, null=True, related_name="posts")
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, blank=False, null=True, related_name="posts")  

    content_JSON = models.JSONField(default=dict, blank=True)
    content_plain_text = models.TextField(blank=True)
    excerpt = models.CharField(max_length=300, blank=True)
    author = models.CharField(max_length=50, default="Admin")
    
    image = models.URLField(max_length=500, blank=True, null=True, default='https://res.cloudinary.com/verycodedly/image/upload/v1763448383/very-codedly-banner.png')
    caption = models.CharField(max_length=200, blank=True)
    alt = models.CharField(max_length=100, blank=True)
    
    tags = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="draft"
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            
        # auto-populate content_plain_text from JSON
        if self.content_JSON:
            self.content_plain_text = flatten_blocks(self.content_JSON)

        # auto-generate excerpt if empty
        if not self.excerpt and self.content_plain_text:
            self.excerpt = self.content_plain_text[:250] + "..."
            
        # handle image caption + alt
        if self.image:
            filename = self.image.name.split("/")[-1].rsplit(".", 1)[0]

            if not self.caption:
                self.caption = filename.replace("_", " ").replace("-", " ").title()

            if not self.alt:
                self.alt = self.caption.lower().replace(" ", "-")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title}"


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)
    image = models.URLField(max_length=500, blank=True, null=True)
    alt = models.CharField(max_length=150, blank=True) 
    caption = models.CharField(max_length=200, blank=True) 
    
    url = models.URLField(blank=True)  # optional link
    position = models.PositiveIntegerField(default=0)  # for ordering in frontend
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["position"]
    
    def save(self, *args, **kwargs):
        # Auto-fill alt if empty, using caption
        # If caption  empty, use filename (without extension)
        if not self.caption and self.image:
            filename = self.image.name.split("/")[-1].rsplit(".", 1)[0]
            self.caption = filename.replace("_", " ").replace("-", " ").title()

        # If alt is empty, copy caption
        if not self.alt and self.caption:
            # hyphenate for alt text
            self.alt = self.caption.lower().replace(" ", "-")
        
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.caption} for {self.post.title}"
    

class PostLink(models.Model):
    post = models.ForeignKey(Post, related_name="links", on_delete=models.CASCADE)
    label = models.CharField(max_length=200)
    
    # Optional external link
    external_url = models.URLField(blank=True)
    target_post = models.ForeignKey(
        Post, null=True, blank=True, on_delete=models.SET_NULL,
        help_text="Optional: link to another post internally"
    )
    type = models.CharField(
        max_length=20,
        choices=[("affiliate", "Affiliate"), ("reference", "Reference")],
        default="reference"
    )
    position = models.PositiveIntegerField(default=0)  # for ordering

    class Meta:
        ordering = ["position"]

    def __str__(self):
        if self.target_post:
            return f"Link from '{self.post.title}' to '{self.target_post.title}'"
        elif self.external_url:
            return f"Link from '{self.post.title}' to {self.external_url}"
        return f"Link from '{self.post.title}' (no target)"    
 
    
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    body = models.TextField(max_length=300)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.name}"


class Course(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=40, unique=True, blank=True)
    description = models.TextField(blank=True)
    meta = models.CharField(max_length=170, blank=True)
    language = models.CharField(max_length=50, choices=[('HTML','HTML'), ('CSS','CSS'), ('Python','Python'),('JavaScript','JavaScript'), ('Git', 'Git'), ('React', 'React')])
    prerequisites = models.CharField(max_length=255, default="Basic computer literacy")
    
    sort = models.PositiveIntegerField(default=1, blank=True, null=True)
    
    level = models.CharField(max_length=50, default="Beginner")
    image = models.URLField(max_length=500, null=True, blank=True)
    alt = models.CharField(max_length=100, blank=True)
    keywords = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            
        if self.image:
            filename = self.image.name.split("/")[-1].rsplit(".", 1)[0]

            if not self.alt:
                self.alt = filename.title()

           
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title


class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=40, blank=True)
    order = models.PositiveIntegerField(default=1)
    duration = models.CharField(null=True, blank=True) 
    level = models.CharField(max_length=50, default="Beginner", choices=[('Beginner','Beginner'),
                            ('Intermediate','Intermediate'),('Advanced','Advanced')])
    
    content_JSON = models.JSONField(blank=True, default=dict)
    content_plain_text = models.TextField(null=True, blank=True)
    video_url = models.URLField(blank=True, null=True)      # embedding videos
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="published"
    )
    
    is_preview = models.BooleanField(default=False)         # free preview lessons
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta():
        unique_together = ('course', 'slug')
        ordering = ['course', 'order',]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
           
        self.content_plain_text = flatten_blocks(self.content_JSON)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.course.title} - {self.title}"


class LessonResource(models.Model):
    lesson = models.ForeignKey(
        "Lesson",
        related_name="resources",
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True) 
    
    url = models.URLField()
    resource_type = models.CharField(
        max_length=20,
        choices=RESOURCE_TYPES,
        default="other"
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.lesson.title} - {self.title}"


# class Progress(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
#     completed = models.BooleanField(default=False)
#     completed_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         unique_together = ('user', 'lesson')


    # def extract_plain_text(self):
    #     """Extracts plain text from JSON blocks including paragraphs, lists, and nested text arrays."""
    #     try:
    #         parts = []

    #         for block in self.content_JSON.get("blocks", []):
    #             block_type = block.get("type")

    #             # Paragraph or heading-like blocks
    #             if "content" in block:
    #                 content = block["content"]

    #                 if isinstance(content, list):
    #                     # Flatten text spans (handles bold/italic etc.)
    #                     text = "".join(span.get("text", "") for span in content)
    #                 else:
    #                     text = str(content)

    #                 parts.append(text.strip())

    #             # List blocks
    #             elif "items" in block:
    #                 items = block.get("items", [])
    #                 style = block.get("style", "bullet")  # default = bullet

    #                 if style == "number":
    #                     text = "\n".join(f"{i+1}. {item}" for i, item in enumerate(items))
    #                 else:
    #                     text = "\n".join(f"• {item}" for item in items)

    #                 parts.append(text.strip())

    #         return "\n\n".join(p for p in parts if p)
    #     except Exception:
    #         return ""