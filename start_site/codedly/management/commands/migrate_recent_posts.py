import json
from django.core.management.base import BaseCommand
from django.core import serializers
from taggit.models import Tag, TaggedItem
from django.utils import timezone
from datetime import timedelta
from codedly.models import Post
import os

class Command(BaseCommand):
    help = "Export published posts from the last X hours without duplicates"

    # Change this to 24 or 48 as needed
    HOURS_WINDOW = 24

    LOG_FILE = "migrated_slugs.txt"

    def handle(self, *args, **options):
        since_time = timezone.now() - timedelta(hours=self.HOURS_WINDOW)

        # Load already migrated slugs
        if os.path.exists(self.LOG_FILE):
            with open(self.LOG_FILE) as f:
                migrated_slugs = set(line.strip() for line in f)
        else:
            migrated_slugs = set()

        # Filter posts
        recent_posts = Post.objects.filter(
            status="published", 
            created_at__gte=since_time
        ).exclude(slug__in=migrated_slugs)

        if not recent_posts.exists():
            self.stdout.write("No new posts to migrate.")
            return

        # Serialize to JSON
        data = serializers.serialize("json", recent_posts)
        parsed = json.loads(data)

        # Save to file
        filename = f"recent_posts_{timezone.now().strftime('%Y%m%d_%H%M')}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(parsed, f, ensure_ascii=False, indent=2)

        # Append slugs to log
        with open(self.LOG_FILE, "a") as f:
            for post in recent_posts:
                f.write(post.slug + "\n")

        self.stdout.write(self.style.SUCCESS(
            f"Exported {recent_posts.count()} posts to {filename} (last {self.HOURS_WINDOW} hours)"
        ))
