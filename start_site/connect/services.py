from django.utils import timezone
from django.conf import settings

from .models import MessageReaction
from .models import Discussion, Room, Message, MessageAction, MessageReaction
import hashlib
from django.core.cache import cache

from .exceptions import RateLimitExceeded
from .handles import generate_handle


OFF_TOPIC_THRESHOLD = 5
BURY_THRESHOLD = 8

MESSAGE_COOLDOWN_SECONDS = 3

def get_or_create_discussion(room: Room, date=None) -> Discussion:
    """
    Return discussion for room on given date.
    Today is default.
    """
    if date is None:
        date = timezone.localdate()

    discussion, _ = Discussion.objects.get_or_create(
        room=room, date=date,
    )

    return discussion


def create_chat_message(*, room, content, ip, request):
    """
    Creates message for day's discussion.
    """
    discussion = get_or_create_discussion(room)
    ip_hash = hashlib.sha256(f"{settings.SECRET_KEY}{ip}".encode()
                ).hexdigest()
    
    check_rate_limit(ip_hash)
    handle = get_or_create_daily_handle(request)

    return Message.objects.create(
        discussion=discussion,
        content=content.strip(),
        ip_hash=ip_hash,
        handle=handle,
    )
    
    
def check_rate_limit(ip_hash):
    key = f"vc-connect-rate-{ip_hash}"

    if cache.get(key):
        raise RateLimitExceeded()

    cache.set(key, True, timeout=MESSAGE_COOLDOWN_SECONDS)
    
    
def get_or_create_daily_handle(request):
    today = timezone.localdate()
    session_key = f"vc-connect_{today.isoformat()}"
    handle = request.session.get(session_key)

    if handle:
        return handle

    while True:
        handle = generate_handle()
        # don't repeat handles
        if not Message.objects.filter(discussion__date=today, handle=handle).exists():
            break

    request.session[session_key] = handle
    request.session.modified = True

    return handle


def add_message_action(*, message, request, action):
    handle = get_or_create_daily_handle(request)
    MessageAction.objects.get_or_create(
        message=message,
        handle=handle,
        action=action,
    )

    off_topic = MessageAction.objects.filter(message=message, action="off_topic",
                ).count()

    bury = MessageAction.objects.filter(message=message, action="bury",
                ).count()

    changed = False

    if off_topic >= OFF_TOPIC_THRESHOLD and not message.off_topic_hidden:
        message.off_topic_hidden = True
        changed = True

    if bury >= BURY_THRESHOLD and not message.buried:
        message.buried = True
        changed = True

    if changed:
        message.save()

    return message


def add_reaction(*, message, request, reaction):
    handle = get_or_create_daily_handle(request)
    obj, created = MessageReaction.objects.get_or_create(
        message=message,
        handle=handle,
        defaults={
            "reaction": reaction,
        },
    )

    if not created:
        if not created:
            # tapped same reaction, remove it
            if obj.reaction == reaction:
                obj.delete()
            else:
                obj.reaction = reaction
                obj.save()


    return message
