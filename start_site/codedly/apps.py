from django.apps import AppConfig


class CodedlyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'codedly'
    verbose_name = "VeryCodedly"
    
    def ready(self):
        import codedly.signals