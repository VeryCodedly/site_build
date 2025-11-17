from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = "Create or update superuser from environment variables"

    def handle(self, *args, **options):
        User = get_user_model()
        username = os.getenv("DJANGO_SUPERUSER_USERNAME")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "")

        if not username or not password:
            self.stdout.write(self.style.ERROR("Missing DJANGO_SUPERUSER_USERNAME or PASSWORD"))
            return

        user, created = User.objects.get_or_create(username=username)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        if email:
            user.email = email
        user.save()

        self.stdout.write(self.style.SUCCESS(f"Superuser {username} {'created' if created else 'updated'}"))
