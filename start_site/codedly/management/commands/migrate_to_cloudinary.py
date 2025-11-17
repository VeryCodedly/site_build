import os
import cloudinary
import cloudinary.uploader
from django.core.management.base import BaseCommand
from codedly.models import Post, PostImage, Course

# Force Cloudinary config no matter what
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

class Command(BaseCommand):
    help = 'Upload existing images to Cloudinary and update DB'

    def handle(self, *args, **options):
        models = [
            (Post, 'image'),
            (PostImage, 'image'),
            (Course, 'image'),
        ]

        for model, field_name in models:
            qs = model.objects.exclude(**{f"{field_name}__isnull": True})
            for obj in qs:
                image_field = getattr(obj, field_name)
                if not image_field:
                    continue

                # Skip if already a Cloudinary URL
                if str(image_field.url).startswith("https://res.cloudinary.com"):
                    self.stdout.write(f"Skipping {obj} — already on Cloudinary")
                    continue

                try:
                    self.stdout.write(f"Uploading {image_field.name} for {obj}...")
                    upload_source = getattr(image_field, 'path', None) or image_field.file
                    result = cloudinary.uploader.upload(
                        upload_source,
                        folder=os.path.dirname(image_field.name),   # e.g. "posts" or "courses"
                        use_filename=True,
                        unique_filename=False,
                        overwrite=True
                        )
                    secure_url = result.get('secure_url')

                    setattr(obj, field_name, secure_url)
                    obj.save(update_fields=[field_name])
                    self.stdout.write(self.style.SUCCESS(f"✅ Uploaded and updated {obj}"))

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"❌ Failed {obj}: {e}"))
