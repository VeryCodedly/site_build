from django.urls import path

from . import views

urlpatterns = [
    path("rooms/", views.room_list, name="room-list"),
    path("rooms/<slug:slug>/", views.room_detail, name="room-detail"),
    path("rooms/<slug:slug>/messages/", views.create_message, name="create-message"),
    path("rooms/<slug:slug>/updates/", views.room_updates, name="room-updates"),
    path("messages/<int:pk>/action/", views.message_action, name="message-action"),
    path("messages/<int:pk>/reaction/", views.message_reaction, name="message-reaction"),
    path("rooms/<slug:slug>/typing/", views.typing, name="typing"),
    
]