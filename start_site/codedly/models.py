from django.db import models
from django.utils.text import slugify
from taggit.managers import TaggableManager
# from django.contrib.auth.models import User
import uuid
from decimal import Decimal

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

ORDER_STATUS = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    )

PRODUCT_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
        ('pre_order', 'Pre-order'),
        ('sold_out', 'Sold Out'),
    )

PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('confirmed', 'Confirmed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    )

FULFILLMENT_STATUS = (
        ('not_sent', 'Not Sent'),
        ('queued', 'Queued'),
        ('processing', 'Processing'),
        ('fulfilled', 'Fulfilled'),
        ('failed', 'Failed'),
    )
 
def flatten_blocks(content_json: dict) -> str:
    """
    Flattens structured JSON blocks into plain text for SEO, search, and previews.
    Handles paragraphs, headings, callouts, lists, code, quotes, images, review images, tables, links, and inline spans.
    Maintains existing functionality and avoids errors for strings vs dicts.
    """

    if not content_json or "blocks" not in content_json:
        return ""

    parts = []

    for block in content_json.get("blocks", []):
        block_type = block.get("type")

        # --- Text-based blocks: paragraph, heading, callout
        if block_type in ["paragraph", "heading", "callout"]:
            content = block.get("content", "")

            if isinstance(content, list):
                spans = []
                for span in content:
                    if isinstance(span, dict):
                        text = span.get("text", "")
                        url = span.get("url")
                        if url:
                            spans.append(f"{text} ({url})")
                        else:
                            spans.append(text)
                    else:
                        spans.append(str(span))  # fallback if span is a string
                text = "".join(spans)
            else:
                text = str(content)

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
        
        # --- Links
        elif block_type == "link":
            text = f"{block.get('text', '')} ({block.get('url', '')})"
            parts.append(text.strip())

        # --- Tables
        elif block_type == "table":
            headers = block.get("headers", [])
            rows = block.get("rows", [])
            if headers:
                parts.append(" | ".join(str(h) for h in headers))
            for row in rows:
                parts.append(" | ".join(str(cell) for cell in row))

        # --- Code
        elif block_type == "code":
            code = block.get("content", "")
            parts.append(f"[CODE]\n{code}\n[/CODE]")

        # --- Quotes
        elif block_type == "quote":
            content = block.get("content", "")
            parts.append(f"“{content}”")

        # --- Images
        elif block_type in ["image", "reviewImg"]:
            caption = block.get("caption", "")
            if caption:
                parts.append(f"[Image: {caption}]")
            else:
                parts.append("[Image]")

        # --- Fallback for any block with a content key
        else:
            content = block.get("content", "")
            if isinstance(content, str):
                text = content.strip()
            elif isinstance(content, list):
                text = "".join(
                    str(span.get("text", "")) if isinstance(span, dict) else str(span)
                    for span in content
                )
            else:
                text = str(content)
            if text:
                parts.append(text)

    return "\n\n".join(p for p in parts if p)


def generate_order_id():
    """Generate a random 8-character order ID"""
    return str(uuid.uuid4())[:8].upper()

def generate_payment_reference():
    """Generate a unique payment reference"""
    return f"VC-{str(uuid.uuid4())[:8].upper()}"


class PrintfulVariant(models.Model):
    variant_id = models.PositiveIntegerField(unique=True, primary_key=True)
    sync_id = models.CharField(max_length=50, unique=True, blank=True, null=True) 
    
    product = models.ForeignKey(
        'PrintfulProducts', 
        on_delete=models.CASCADE, 
        related_name='variants'
    )
    
    sku = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=255, blank=True)
    size = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    active = models.BooleanField(default=True)
    
    preview_image = models.URLField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    
    raw_data = models.JSONField(default=dict)   # Keep full original object as backup
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['product', 'size', 'color']
        indexes = [
            models.Index(fields=['variant_id']),
            models.Index(fields=['active']),
        ]

    def __str__(self):
        return f"{self.variant_id} - {self.name} (${self.price})"
    
    
class PrintfulProducts(models.Model):
    CATEGORY_CHOICES = [
        ("hoodies", "Hoodies"),
        ("sweatshirts", "Sweatshirts"),
        ("tshirts", "T-Shirts"),
        ("hats", "Hats"),
        ("drink", "Drink"),
        ("workspace", "Workspace"),
        ("totes", "Totes"),
        ("mini dev", "Mini Dev"),
        ("accessories", "Accessories"),
    ]
    # Core Printful Identifiers
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=40, unique=True, blank=True, null=True)
    printful_id = models.DecimalField(unique=True, max_digits=15, decimal_places=0) # SyncProduct ID from Printful
    fancy_name = models.CharField(blank=True, null=True)
    
    # Classification for testing SHELLy tags and categories
    category = models.CharField(
                max_length=50,
                choices=CATEGORY_CHOICES,
                default="accessories"
            )
    description = models.TextField(blank=True)
    # has_mascot = models.BooleanField(default=False)
    
    # Deep Data Storage
    variant_mapping = models.JSONField(default=dict)
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Starting price")
    image_url = models.URLField(blank=True, null=True)
    thumbnail_url = models.URLField(blank=True, null=True)
    
    # Logic Controls
    is_active = models.BooleanField(default=True)
    tagline = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=PRODUCT_CHOICES, default='published')
    
    # Audit trail for sync tests
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name = 'Printful Products'
        verbose_name_plural = 'Printful Products'
        
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name or self.fancy_name or "product")[:40]
            slug = base_slug
            counter = 1

            while PrintfulProducts.objects.filter(slug=slug).exclude(id=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = slug

        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"[SYNC] {self.name}"


class StoreProduct(models.Model):
    PRODUCT_CATEGORIES = (
        ('mug', 'Mug'),
        ('hat', 'Hat'),
        ('shirt', 'T-Shirt'),
        ('hoodie', 'Hoodie'),
        ('digital', 'Digital'),
        ('cheatsheet', 'Cheatsheet'),
    )
    
    # Basic info
    product_id = models.CharField(max_length=50, unique=True)  # e.g., "dev-mug-1"
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=PRODUCT_CATEGORIES)
    
    # Details (stored as JSON array of strings)
    details = models.JSONField(default=list)  # ["📏 11oz / 330ml", "🍽️ Microwave safe", ...]
    
    # Images (stored as JSON array of objects)
    images = models.JSONField(default=list)  # [{src: "...", alt: "...", side: "f"}, ...]
    
    # Metadata
    status = models.CharField(max_length=20, choices=PRODUCT_CHOICES, default='published')
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['sort_order', 'created_at']
        verbose_name = 'Store Product'
        verbose_name_plural = 'Store Products'
        
    def save(self, *args, **kwargs):
        # Auto-generate product_id from name if empty
        if not self.product_id:
            self.product_id = slugify(self.name)
           
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} - ${self.price}"
    

class StoreOrder(models.Model):    
    # Order identification
    order_id = models.CharField(max_length=20, unique=True, default=generate_order_id)
    printful_order_id = models.CharField(max_length=100, blank=True, null=True)
    
    # Customer information
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    
    # Shipping address
    shipping_address = models.TextField()
    shipping_address2 = models.CharField(max_length=200, blank=True)
    shipping_city = models.CharField(max_length=100)
    shipping_state = models.CharField(max_length=100)
    shipping_country = models.CharField(max_length=100)
    shipping_postal = models.CharField(max_length=20, blank=True)
    
    shipping_details = models.JSONField(null=True, blank=True) # new
    
    # Order details
    items = models.JSONField()  # Stores cart items as JSON
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    
    # Payment details
    tx_ref = models.CharField(max_length=100, unique=True, null=True, blank=True)
    flw_ref = models.CharField(max_length=100, unique=True, null=True, blank=True)
    payment_reference = models.CharField(max_length=100, unique=True, default=generate_payment_reference)
    payment_status = models.CharField(max_length=50, default='pending', choices=PAYMENT_STATUS)
    payment_gateway = models.CharField(max_length=20, default='flutterwave')
    payment_response = models.JSONField(null=True, blank=True)  # Store full webhook response
    
    # Order status
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    fulfillment_status = models.CharField(max_length=50, choices=FULFILLMENT_STATUS, default='not_sent')
    fulfillment_response = models.CharField(max_length=50, blank=True, null=True)
    
    # Tracking
    tracking_number = models.CharField(max_length=100, blank=True)
    tracking_url = models.URLField(blank=True)
    notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Store Order'
        verbose_name_plural = 'Store Orders'
    
    def __str__(self):
        return f"#{self.order_id} - {self.customer_name} - {self.total_amount} {self.currency}"
    
    
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
    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True, db_index=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=False, null=True, related_name="posts", db_index=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, blank=False, null=True, related_name="posts", db_index=True)  

    content_JSON = models.JSONField(default=dict, blank=True)
    content_plain_text = models.TextField(blank=True)
    excerpt = models.CharField(max_length=300, blank=True, db_index=True)
    author = models.CharField(max_length=50, default="Chrise", db_index=True)
    
    image = models.URLField(max_length=500, blank=True, null=True, default='https://res.cloudinary.com/verycodedly/image/upload/v1763878238/very-codedly-banner.png', db_index=True)
    caption = models.CharField(max_length=200, blank=True, db_index=True)
    alt = models.CharField(max_length=100, blank=True, db_index=True)
    
    tags = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="published"
    )

    class Meta:
        ordering = ["-created_at"]

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
            # Extract filename from URL
            filename = self.image.split("/")[-1].rsplit(".", 1)[0]

            # Auto-generate caption if empty
            if not self.caption:
                self.caption = filename.replace("_", " ").replace("-", " ").title()

            # Auto-generate alt if empty
            if not self.alt:
                self.alt = slugify(self.caption)

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
        # If caption  empty, use URL (without paths)
        if not self.caption and self.image:
            filename = self.image.split("/")[-1].rsplit(".", 1)[0]
            self.caption = filename.replace("_", " ").replace("-", " ").title()

        # Auto-fill alt if empty
        if not self.alt and self.caption:
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
    tags = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Auto-generate slug from title if empty
        if not self.slug:
            self.slug = slugify(self.title)

        # Auto-generate alt from image URL if alt is empty
        if self.image and not self.alt:
            # Extract filename from URL
            filename = self.image.split("/")[-1].rsplit(".", 1)[0]
            self.alt = filename.replace("_", " ").replace("-", " ").title()

           
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title


class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=60, blank=True)
    order = models.PositiveIntegerField(default=1)
    duration = models.CharField(null=True, blank=True) 
    level = models.CharField(max_length=50, default="Beginner", choices=[('Beginner','Beginner'),
                            ('Intermediate','Intermediate'),('Advanced','Advanced')])
    
    description = models.CharField(null=True, blank=True) 
    content_JSON = models.JSONField(blank=True, default=dict)
    content_plain_text = models.TextField(null=True, blank=True)
    video_url = models.URLField(blank=True, null=True)      # embedding videos
    
    tags = TaggableManager()
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