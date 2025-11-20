from django.http import HttpResponseNotFound
from django.conf import settings
import ipaddress

# Only for /api/ when not in DEBUG
# TRUSTED_PROXIES = ["127.0.0.1", "::1"]

GOOD_BOT_PARTIAL_STRINGS = [
    # Search engines
    "Googlebot", "Mediapartners-Google", "Google-InspectionTool", "GoogleOther",
    "bingbot", "msnbot", "BingPreview",
    "DuckDuckBot", "DuckDuckGo",
    "YandexBot", "YandexMobileBot", "YandexImages",
    "Baiduspider",
    "Sogou", "Sogou-Test-Spider",
    "Naverbot", "Yeti",               # Naver (Korea)
    "Daumoa",                         # Daum (Korea)
    "SeznamBot", "SeznamScreenshot",  # Czech Republic
    "AhrefsBot",                      # SEO tool (very respectful)
    "SemrushBot",                     # SEO tool
    "MJ12bot",                        # Majestic SEO
    "PetalBot",                       # Huawei
    "Dotbot",                         # Moz

    # Social & link preview 
    "facebookexternalhit", "Facebot",
    "LinkedInBot",
    "Twitterbot",
    "WhatsApp", "TelegramBot", "Discordbot", "Slackbot-LinkExpanding", "Slack-ImgProxy",
    "SkypeUriPreview", "Pinterestbot", "Pinterest",
    "Tumblr", "RedditBot", "Quora Bot", "Embedly", "OEmbed",

    # Apple / Microsoft / others
    "Applebot",
    "ia_archiver",                    # Internet Archive / Wayback Machine
    "archive.org_bot",
    "CCBot",                          # CommonCrawl (open dataset)
    "Curl", "Wget",                   # researchers 

    # Monitoring & uptime bots
    "UptimeRobot", "Pingdom", "NewRelicPinger", "StatusCake", "HetrixTools",
    "GoogleStackdriverMonitoring", "CloudMonitor",
]

# allowed IPs from .env
ALLOWED_IPS = []
if hasattr(settings, "IP_ADDY"):
    for ip in settings.IP_ADDY.split(","):
        ip = ip.strip()
        if ip:
            ALLOWED_IPS.append(ip)

# Convert CIDR ranges into networks for fast lookup
ALLOWED_NETWORKS = []
for ip in ALLOWED_IPS:
    try:
        net = ipaddress.ip_network(ip, strict=False)
        ALLOWED_NETWORKS.append(net)
    except ValueError:
        # Not CIDR, treat as single IP
        try:
            ipaddress.ip_address(ip)
            ALLOWED_NETWORKS.append(ipaddress.ip_network(ip))
        except:
            pass

class APIAccessControlMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 1. Local dev
        origin = request.headers.get("origin", "")
        referer = request.headers.get("referer", "")
        if "http://localhost:3000" in origin or "http://localhost:3000" in referer:
            return self.get_response(request)

        if not request.path.startswith("/api/"):
            return self.get_response(request)

        if settings.DEBUG:
            return self.get_response(request)

        # 2. Get real client IP (works behind Cloudflare, Render, etc.)
        client_ip = (
            request.META.get("HTTP_CF_CONNECTING_IP") or
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip() or
            request.META.get("REMOTE_ADDR", "")
        )

        # 3. Allow YOUR IPs from IP_ADDY
        if client_ip:
            try:
                ip_obj = ipaddress.ip_address(client_ip)
                if any(ip_obj in net for net in ALLOWED_NETWORKS):
                    return self.get_response(request)
            except ValueError:
                pass  # invalid IP → block

        # 4. Server-to-server calls (Render, Vercel, etc.)
        if (
            request.headers.get("x-forwarded-for") or
            request.headers.get("x-vercel-forwarded-for") or
            request.headers.get("x-render-origin-server") or
            "render.com" in request.headers.get("via", "").lower() or
            "vercel" in request.headers.get("via", "").lower() or
            request.headers.get("user-agent", "").startswith("node-fetch")
        ):
            return self.get_response(request)

        # 5. Good bots
        ua = request.headers.get("User-Agent", "")
        if any(bot in ua for bot in GOOD_BOT_PARTIAL_STRINGS):
            return self.get_response(request)

        return HttpResponseNotFound()