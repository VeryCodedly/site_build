from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Room, Message
from django.shortcuts import get_object_or_404
from .services import add_reaction, get_or_create_daily_handle, get_or_create_discussion, create_chat_message, add_message_action
from .serializers import MessageSerializer, CreateMessageSerializer, RoomSerializer, MessageActionSerializer, MessageReactionSerializer

from .exceptions import RateLimitExceeded
from django.utils.dateparse import parse_datetime
from .room_state import touch_activity, get_live_state, touch_typing
from rest_framework.throttling import BaseThrottle


class NoThrottle(BaseThrottle):
    def allow_request(self, request, view):
        return True


@api_view(["GET"])
@permission_classes([AllowAny])
def room_list(request):
    rooms = Room.objects.filter(is_active=True)
    serializer = RoomSerializer(rooms, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def room_detail(request, slug):
    room = get_object_or_404(Room, slug=slug, is_active=True)
    discussion = get_or_create_discussion(room)
    messages = Message.objects.filter(
        discussion=discussion,
        deleted=False,
    )
    # request.session["connect_test"] = "working"
    # request.session.save()

    return Response({
        "session_key": request.session.session_key,
        "room": RoomSerializer(room).data,
        "discussion_date": discussion.date.strftime("%d-%m-%Y"), # your date style
        "handle": get_or_create_daily_handle(request),
        "messages": MessageSerializer(messages, many=True).data,
    })
    
    
@api_view(["POST"])
@permission_classes([AllowAny])
def create_message(request, slug):
    room = get_object_or_404(Room, slug=slug, is_active=True)
    serializer = CreateMessageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    ip = request.META.get("REMOTE_ADDR", "")

    try:
        message = create_chat_message(
            room=room,
            content=serializer.validated_data["content"], # type: ignore
            ip=ip,
            request=request,
        )

    except RateLimitExceeded:
        return Response(
            {"detail": "Please wait a few seconds before posting again."},
            status=429,
        )

    return Response(
        MessageSerializer(message, context={"request": request}).data,
        status=201,
    )
    
    
@api_view(["GET"])
@permission_classes([AllowAny])
@throttle_classes([NoThrottle])
def room_updates(request, slug):
    room = get_object_or_404(Room, slug=slug, is_active=True)
    discussion = get_or_create_discussion(room)
    after = request.GET.get("after")
    queryset = Message.objects.filter(discussion=discussion, deleted=False)

    if after:
        dt = parse_datetime(after)
        if dt:
            queryset = queryset.filter(updated_at__gt=dt)

    queryset = queryset.order_by("updated_at")
    touch_activity(request=request, discussion=discussion)
    live = get_live_state(request=request, discussion=discussion)

    return Response({
        "messages": MessageSerializer(queryset, many=True, context={"request": request}).data,
        # "typing": get_typing_handles(request=request, discussion=discussion),
        "typing": live["typing"],
        "online": live["online"],
    })
    
    
@api_view(["POST"])
@permission_classes([AllowAny])
def message_action(request, pk):
    message = get_object_or_404(Message, pk=pk, deleted=False)
    serializer = MessageActionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    message = add_message_action(
        message=message,
        request=request,
        action=serializer.validated_data["action"], # type: ignore
    )
    message.save(update_fields=["updated_at"])

    return Response(
        {
            "off_topic": message.actions.filter(action="off_topic").count(), # type: ignore
            "bury": message.actions.filter(action="bury").count(), # type: ignore
            "buried": message.buried,
            "off_topic_hidden": message.off_topic_hidden,
        }
    )
    

@api_view(["POST"])
@permission_classes([AllowAny])
def message_reaction(request, pk):
    message = get_object_or_404(Message, pk=pk, deleted=False)
    serializer = MessageReactionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    message = add_reaction(
        message=message,
        request=request,
        reaction=serializer.validated_data["reaction"], # type: ignore
    )
    message.save(update_fields=["updated_at"])

    return Response({
        "reactions": MessageSerializer(message, context={"request": request}).data["reactions"], # type: ignore
    })
    
    
@api_view(["POST"])
@permission_classes([AllowAny])
def typing(request, slug):
    room = get_object_or_404(Room, slug=slug, is_active=True)
    discussion = get_or_create_discussion(room)

    touch_typing(request=request, discussion=discussion)

    return Response(status=204)