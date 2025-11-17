import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "codedly.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
username = os.getenv("DJANGO_SUPERUSER_USERNAME")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
email = os.getenv("DJANGO_SUPERUSER_EMAIL", "")

user, created = User.objects.get_or_create(username=username)
user.set_password(password)
user.is_superuser = True
user.is_staff = True
if email:
    user.email = email
user.save()
print(f"Superuser {username} {'created' if created else 'updated'}")
