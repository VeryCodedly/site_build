# middleware/odeshi.py
import os
import ipaddress
from django.http import HttpResponseNotFound, HttpResponseForbidden
from django.utils.deprecation import MiddlewareMixin


GOOD_BOTS = [
    "Googlebot", "Mediapartners-Google", "Google-InspectionTool", "GoogleOther",
    "bingbot", "msnbot", "BingPreview",
    "DuckDuckBot", "DuckDuckGo",
    "YandexBot", "YandexMobileBot", "YandexImages",
    "Baiduspider", "Sogou", "Naverbot", "Yeti", "Daumoa", "SeznamBot",
    "AhrefsBot", "SemrushBot", "MJ12bot", "PetalBot", "Dotbot",
    "facebookexternalhit", "Facebot", "LinkedInBot", "Twitterbot",
    "WhatsApp", "TelegramBot", "Discordbot", "Slackbot", "Slack-ImgProxy",
    "SkypeUriPreview", "Pinterestbot", "Tumblr", "RedditBot", "Embedly",
    "Applebot", "ia_archiver", "archive.org_bot", "CCBot", "Curl", "Wget",
    "UptimeRobot", "Pingdom", "NewRelicPinger", "StatusCake", "HetrixTools",
]

# Build allowed networks 
def _get_allowed_networks():
    networks = []
    raw_ips = os.getenv("IP_ADDY", "")
    for entry in [x.strip() for x in raw_ips.split(",") if x.strip()]:
        try:
            networks.append(ipaddress.ip_network(entry, strict=False))
        except ValueError:
            pass
    networks.extend([
        ipaddress.ip_network("127.0.0.1"),
        ipaddress.ip_network("::1"),
    ])
    return networks

ALLOWED_NETWORKS = _get_allowed_networks()

class OdeshiMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response
        self._cache = {}  # will store: request → bool

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        path = request.path_info

        # Skip if decided
        cache_key = id(request)
        if cache_key in self._cache:
            if not self._cache[cache_key]:
                if path.startswith("/admin/"):
                    return HttpResponseNotFound("NO")
                if path.startswith("/api/"):
                    return HttpResponseNotFound()
            return None

        # Check if allowed
        allowed = self._is_allowed(request)
        self._cache[cache_key] = allowed

        if not allowed:
            if path.startswith("/admin/"):
                return HttpResponseForbidden("go away")
            if path.startswith("/api/"):
                return HttpResponseNotFound()

        return None

    def _get_client_ip(self, request):
        ip = (
            request.META.get("HTTP_CF_CONNECTING_IP") or
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",", 1)[0].strip() or
            request.META.get("REMOTE_ADDR", "")
        )
        return ip or ""

    def _is_allowed(self, request):
        ua = request.META.get("HTTP_USER_AGENT", "")
        if any(bot in ua for bot in GOOD_BOTS):
            return True

        # IP?
        ip = self._get_client_ip(request)
        if not ip:
            return False
        try:
            client_ip = ipaddress.ip_address(ip)
            return any(client_ip in net for net in ALLOWED_NETWORKS)
        except ValueError:
            return False