# middleware.py
from django.http import HttpResponseNotFound
from django.conf import settings

ALLOWED_ADMIN_IPS = [
    ip.strip() for ip in settings.IP_ADDY.split(",") if ip.strip()
] + ["127.0.0.1", "::1"]

class AdminIPRestrictMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/admin/") and not settings.DEBUG:
            # visitor IP (works behind Cloudflare, Render, etc.)
            ip = (
                request.META.get("HTTP_CF_CONNECTING_IP") or
                request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip() or
                request.META.get("REMOTE_ADDR", "")
            )

            if ip not in ALLOWED_ADMIN_IPS:
                return HttpResponseNotFound()

        return self.get_response(request)