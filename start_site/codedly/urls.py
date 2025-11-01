from django.urls import path
from .views import api_home # contact_view

urlpatterns = [
    path('', api_home, name='api_home'),
    # path("contact/", contact_view, name="contact"),
    
]
