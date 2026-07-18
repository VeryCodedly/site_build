import time
from django.core.cache import cache
from .services import get_or_create_daily_handle


ACTIVITY_TIMEOUT = 20
TYPING_TIMEOUT = 3


def get_session_id(request):
    if not request.session.session_key:
        request.session.save()

    return request.session.session_key


def get_room_state(discussion):
    key = f"room-state:{discussion.id}"
    state = cache.get(key)

    if state is None:
        state = {}

    return key, state


def save_room_state(key, state):
    cache.set(
        key,
        state,
        timeout=60 * 60 * 24,
    )
    
    
def touch_activity(*, request, discussion):
    key, state = get_room_state(discussion)
    session = get_session_id(request)
    handle = get_or_create_daily_handle(request)
    
    user = state.get(session, {})
    user["handle"] = handle
    user["last_seen"] = time.time()

    state[session] = user
    save_room_state(key, state)
    
    
def touch_typing(*, request, discussion):
    key, state = get_room_state(discussion)
    session = get_session_id(request)
    handle = get_or_create_daily_handle(request)
    now = time.time()

    user = state.get(session, {})
    user["handle"] = handle
    user["typing"] = now
    user["last_seen"] = now
    
    state[session] = user
    save_room_state(key, state)
    # print("touch_typing", state)
    
    
def cleanup_state(state):
    now = time.time()
    cleaned = {}

    for session, user in state.items():
        if now - user.get("last_seen", 0) > ACTIVITY_TIMEOUT:
            continue
        if (
            "typing" in user
            and now - user["typing"] > TYPING_TIMEOUT
        ):
            user.pop("typing", None)
        cleaned[session] = user
    return cleaned


def get_live_state(*, request, discussion):
    key, state = get_room_state(discussion)
    state = cleanup_state(state)
    save_room_state(key, state)

    current = get_session_id(request)
    typing = []
    online = 0
    
    for session, user in state.items():
        if session == current:
            continue
        online += 1

        if user.get("typing"):
            typing.append(user["handle"])
    # print("live:", typing)
    
    return {
        "typing": typing,
        "online": online,
    }


