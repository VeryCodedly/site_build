# middleware/odeshi.py
import os
import ipaddress
from django.conf import settings
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

def load_allowed_networks():
    networks = []

    raw_ips = os.getenv("IP_ADDY", "").strip()

    if raw_ips:
        for entry in raw_ips.split(","):
            entry = entry.strip()
            try:
                networks.append(ipaddress.ip_network(entry, strict=False))
            except:
                pass

    # Always allow localhost for sanity
    networks.extend([
        ipaddress.ip_network("127.0.0.1"),
        ipaddress.ip_network("::1"),
    ])

    return networks


ALLOWED_NETWORKS = load_allowed_networks()


class OdeshiMiddleware(MiddlewareMixin):

    def process_request(self, request):
        path = request.path_info

        # ─────────────────────────────────────────────
        # 1. NEVER block yourself in dev
        # ─────────────────────────────────────────────
        if settings.DEBUG:
            return None

        # ─────────────────────────────────────────────
        # 2. Bot allowance
        # ─────────────────────────────────────────────
        ua = request.META.get("HTTP_USER_AGENT", "")
        if any(bot in ua for bot in GOOD_BOTS):
            return None

        # ─────────────────────────────────────────────
        # 3. IP check
        # ─────────────────────────────────────────────
        client_ip = self._get_client_ip(request)

        if not self._is_ip_allowed(client_ip):
            if path.startswith("/admin/"):
                return HttpResponseForbidden("NO")

            if path.startswith("/api/"):
                return HttpResponseNotFound()

        return None

    def _get_client_ip(self, request):
        """
        Priority:
        1. Cloudflare True IP
        2. X-Forwarded-For (proxy)
        3. REMOTE_ADDR (direct)
        """
        ip = (
            request.META.get("HTTP_CF_CONNECTING_IP") or
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip() or
            request.META.get("REMOTE_ADDR")
        )
        return ip or ""

    def _is_ip_allowed(self, ip):
        try:
            ip_obj = ipaddress.ip_address(ip)
            return any(ip_obj in net for net in ALLOWED_NETWORKS)
        except:
            return False
