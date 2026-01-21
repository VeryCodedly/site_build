from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post
from .views import ReadPageDataView

@receiver([post_save, post_delete], sender=Post)
def clear_read_page_cache(sender, instance, **kwargs):
    # Always clear cache on create, update, or delete
    cache.delete(ReadPageDataView.CACHE_KEY)
