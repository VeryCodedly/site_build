from django.db import models
from django.db import models
from django.utils import timezone
import hashlib
from django.db import models

# Create your models here.

class Room(models.Model):
    title = models.CharField(max_length=60)
    slug = models.SlugField(unique=True)
    description = models.CharField(max_length=120, blank=True)
    icon = models.CharField(max_length=20, blank=True)
    accent = models.CharField(max_length=20, default="lime")
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self):
        return self.title


class Discussion(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="discussions")
    date = models.DateField(default=timezone.localdate)
    opened_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-date"]
        constraints = [
            models.UniqueConstraint(
                fields=["room", "date"],
                name="unique_room_per_day"
            )
        ]

    def __str__(self):
        return f"{self.room.title} ({self.date.strftime('%d-%m-%Y')})"


class Message(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE,related_name="messages")
    handle = models.CharField(max_length=20)
    content = models.TextField(max_length=2000)
    ip_hash = models.CharField(max_length=64, blank=True, editable=False)
    
    off_topic_hidden = models.BooleanField(default=False)
    buried = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.handle}: {self.content[:40]}"
    
    
class MessageAction(models.Model):
    OFF_TOPIC = "off_topic"
    BURY = "bury"

    ACTIONS = (
        (OFF_TOPIC, "Off Topic"),
        (BURY, "Bury"),
    )

    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name="actions")
    handle = models.CharField(max_length=50)
    action = models.CharField(max_length=20, choices=ACTIONS)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "message",
                    "handle",
                    "action",
                ],
                name="unique_action_per_handle",
            )
        ]
        
        
class MessageReaction(models.Model):
    message = models.ForeignKey(Message, related_name="reactions", on_delete=models.CASCADE)
    handle = models.CharField(max_length=50)
    reaction = models.CharField(
        max_length=20,
        choices=[
            ("valid", "Valid"),
            ("props", "Props"),
            ("yikes", "Yikes"),
            ("sus", "Sus"),
            ("nope", "Nope"),
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "message",
            "handle",
        )