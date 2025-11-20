from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post


SUBCACHE_KEYS = {
    "featured": "featured_post",
    "trending-now": "trending_posts",
    "entertainment": "spotlight_posts",
    "big-deal": "bigdeal_posts",
    "wired-world": "global_lens_posts",
    "africa-now": "africa_rising_posts",
    "hardware": "hardware_post",
    "emerging-tech": "emerging_tech_posts",
    "digital-money": "digital_money_post",
    "tech-culture": "tech_culture_posts",
    "secure-habits": "secure_habits_posts",
    "key-players": "key_players_posts",
    "ai": "ai_posts",
    "blockchain-crypto": "bch_crypto_posts",
    "startups": "startups_posts",
    "privacy-compliance": "prv_compliance_posts",
    "social": "social_post",
}

@receiver([post_save, post_delete], sender=Post)
def clear_post_cache(sender, instance, **kwargs):
    """
    Invalidate cached subcategory lists when a Post is saved/deleted.
    clears homepage cache due to pulls from multiple sources.
    """
    # Get subcategory slug safely
    sub_slug = None
    if instance.subcategory and instance.subcategory.slug:
        sub_slug = instance.subcategory.slug

    # Clear specific subcategory cache
    if sub_slug and sub_slug in SUBCACHE_KEYS:
        cache.delete(SUBCACHE_KEYS[sub_slug])

    # Always clear, they depend on posts
    cache.delete("homepage_posts")
    cache.delete("latest_posts")        # if 
    cache.delete("trending_posts_global")  # if global version
    cache.delete_many(cache.keys("post_list_*"))  # optional: nuke all

    # Optional: log for debugging
    print(f"Cache cleared for post {instance.id} | sub: {sub_slug}")