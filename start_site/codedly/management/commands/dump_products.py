from django.core.management.base import BaseCommand
from codedly.models import PrintfulProducts

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with open("products_dump.txt", "w") as f:
            for p in PrintfulProducts.objects.all():
                line = f"{p.name}\n"
                print(line.strip())
                f.write(line)

        self.stdout.write(self.style.SUCCESS("Dump complete"))