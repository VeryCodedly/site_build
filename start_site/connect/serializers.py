from rest_framework import serializers
from django.utils import timezone

from .services import get_or_create_daily_handle
from .models import Room
from .models import Message


MAX_MESSAGE_LENGTH = 2000

class RoomSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ("title", "slug", "icon", "description", "accent", "participants")
        
    def get_participants(self, room):
        today_discussion = room.discussions.filter(
            date=timezone.localdate()
        ).first()

        if not today_discussion:
            return 0

        return (
            Message.objects.filter(discussion=today_discussion, deleted=False)
            .values("handle")
            .distinct()
            .count()
        )
        
        
class MessageSerializer(serializers.ModelSerializer):
    off_topic = serializers.SerializerMethodField()
    bury = serializers.SerializerMethodField()
    reactions = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = ("id", "handle", "content", "created_at", "off_topic", "bury", "off_topic_hidden", "buried", "updated_at", "reactions")
        
    def get_off_topic(self, obj):
        return obj.actions.filter(
            action="off_topic"
        ).count()

    def get_bury(self, obj):
        return obj.actions.filter(
            action="bury"
        ).count()
        
    def get_reactions(self, obj):
        request = self.context.get("request")
        mine = None
        if request:
            handle = get_or_create_daily_handle(request)
            mine = (
                obj.reactions.filter(handle=handle)
                .values_list("reaction", flat=True)
                .first()
            )
        
        return {
            "counts": {
            "valid": obj.reactions.filter(reaction="valid").count(),
            "props": obj.reactions.filter(reaction="props").count(),
            "yikes": obj.reactions.filter(reaction="yikes").count(),
            "sus": obj.reactions.filter(reaction="sus").count(),
            "nope": obj.reactions.filter(reaction="nope").count(),
        },
        "mine": mine,
        }
        
        
class CreateMessageSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=MAX_MESSAGE_LENGTH, trim_whitespace=True)
    
    def validate_content(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError(
                "Message can't be empty."
            )
        return value
    

class MessageActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(
        choices=[
            "off_topic",
            "bury",
        ]
    )
    
    
class MessageReactionSerializer(serializers.Serializer):
    reaction = serializers.ChoiceField(
        choices=["valid", "props", "yikes", "sus", "nope"]
    )
    