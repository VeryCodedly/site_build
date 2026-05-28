from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Post, Category, Subcategory, Course, Lesson, StoreProduct, PrintfulProducts


#  GLOBAL CACHE VERSION 
CACHE_VERSION_KEY = "verycodedly_cache_version"

def get_cache_version():
    version = cache.get(CACHE_VERSION_KEY)
    if not version:
        version = "v1"
        cache.set(CACHE_VERSION_KEY, version, timeout=None)
    return version


def make_cache_key(base_key: str, *args) -> str:
    version = get_cache_version()
    parts = [base_key, version] + [str(arg) for arg in args if arg is not None]
    return ":".join(parts)


def bump_cache_version():
    version = get_cache_version()
    new_version = f"v{int(version[1:]) + 1}" if version.startswith('v') else "v2"
    cache.set(CACHE_VERSION_KEY, new_version, timeout=None)
    return new_version


#  INVALIDATION HELPERS 
def invalidate_home_page():
    cache.delete(make_cache_key("read_initial"))
    cache.delete(make_cache_key("read_section_tech"))
    
    cache.delete(make_cache_key("read_section_code"))
    cache.delete(make_cache_key("read_section_culture"))

def invalidate_all_posts():
    cache.delete(make_cache_key("all_posts_list"))
    invalidate_home_page()

def invalidate_post_detail(slug):
    cache.delete(make_cache_key("post_detail", slug))

def invalidate_category_cache(slug):
    cache.delete(make_cache_key("category_posts", slug))
    invalidate_home_page()

def invalidate_subcategory_cache(slug):
    cache.delete(make_cache_key("subcategory_posts", slug))
    invalidate_home_page()

def invalidate_course_list():
    cache.delete(make_cache_key("courses_list"))

def invalidate_course_detail(slug):
    cache.delete(make_cache_key("course_detail", slug))

def invalidate_course_lessons(course_slug):
    cache.delete(make_cache_key("course_lessons", course_slug))

def invalidate_lesson_detail(slug):
    cache.delete(make_cache_key("lesson_detail", slug))

def invalidate_store_cache():
    """Clear Printful caches"""
    cache.delete(make_cache_key("printful_products", None))    # fallback


# ====================== SIGNALS ======================

@receiver(post_save, sender=Post)
@receiver(post_delete, sender=Post)
def post_changed(sender, instance, **kwargs):
    invalidate_all_posts()
    invalidate_post_detail(instance.slug)
    if instance.category:
        invalidate_category_cache(instance.category.slug)
    if instance.subcategory:
        invalidate_subcategory_cache(instance.subcategory.slug)


@receiver(post_save, sender=Category)
@receiver(post_delete, sender=Category)
def category_changed(sender, instance, **kwargs):
    invalidate_home_page()
    invalidate_category_cache(instance.slug)


@receiver(post_save, sender=Subcategory)
@receiver(post_delete, sender=Subcategory)
def subcategory_changed(sender, instance, **kwargs):
    invalidate_home_page()
    invalidate_subcategory_cache(instance.slug)


@receiver(post_save, sender=Course)
@receiver(post_delete, sender=Course)
def course_changed(sender, instance, **kwargs):
    invalidate_course_list()
    invalidate_course_detail(instance.slug)
    invalidate_home_page()


@receiver(post_save, sender=Lesson)
@receiver(post_delete, sender=Lesson)
def lesson_changed(sender, instance, **kwargs):
    invalidate_lesson_detail(instance.slug)
    invalidate_course_lessons(instance.course.slug)
    invalidate_course_detail(instance.course.slug)



@receiver(post_save, sender=PrintfulProducts)
@receiver(post_delete, sender=PrintfulProducts)
def printful_product_changed(sender, instance, **kwargs):
    invalidate_store_cache()