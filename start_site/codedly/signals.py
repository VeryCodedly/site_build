# signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post


@receiver([post_save, post_delete], sender=Post)
def invalidate_post_cache(sender, instance, **kwargs):
    """Clear every cache that could possibly show this post."""
    
    # Global / homepage caches
    cache.delete_many([
        "homepage_posts",
        "latest_posts",
        "trending_posts",
        "trending_posts_global",
        "featured_post",
    ])

    # Subcategory page (if post has one)
    if getattr(instance, 'subcategory', None):
        cache.delete(f"posts_subcategory_{instance.subcategory.slug}")

    # Parent CATEGORY page — this is the important one you asked for
    if (getattr(instance, 'subcategory', None) and 
        getattr(instance.subcategory, 'category', None)):
        cache.delete(f"posts_category_{instance.subcategory.category.slug}")

    # Post detail page
    cache.delete(f"post_detail_{instance.id}")
    cache.delete(f"post_detail_{instance.slug}")

    # Optional: main blog list pages (if you use @cache_page on PostListView)
    cache.delete("post_list:1")
    cache.delete("post_list:2")

    # Debug (remove in production if you want)
    print(f"Cache cleared → Post {instance.id} | "
          f"Subcategory: {getattr(instance.subcategory, 'slug', '-')}, "
          f"Category: {getattr(getattr(instance.subcategory, 'category', None), 'slug', '-')}")