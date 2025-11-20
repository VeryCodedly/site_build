from django.core.cache import cache

# List all homepage cache keys (same as in signals)
HOMEPAGE_CACHE_KEYS = [
    "featured_post",
    "trending_posts",
    "spotlight_posts",
    "bigdeal_posts",
    "global_lens_posts",
    "africa_rising_posts",
    "hardware_post",
    "emerging_tech_posts",
    "digital_money_post",
    "tech_culture_posts",
    "secure_habits_posts",
    "key_players_posts",
    "ai_posts",
    "bch_crypto_posts",
    "startups_posts",
    "prv_compliance_posts",
    "social_post",
]

def clear_all_homepage_caches():
    """Clears all cached homepage sections"""
    for key in HOMEPAGE_CACHE_KEYS:
        cache.delete(key)
    print(f"Cleared {len(HOMEPAGE_CACHE_KEYS)} homepage cache keys.")
