from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import Article

def home(request):
    return HttpResponse("Hello world, from VeryCodedly!")

def article_list(request):
    articles = Article.objects.filter(is_draft=False).order_by('-published')
    return render(request, 'article_list.html', {'articles': articles})

def article_detail(request, slug):
    article = get_object_or_404(Article, slug=slug)
    return render(request, 'article_detail.html', {'article': article})

import requests
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ContactSerializer

class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data.pop('recaptcha_token')

            # Verify reCAPTCHA
            r = requests.post('https://www.google.com/recaptcha/api/siteverify', data={
                'secret': settings.RECAPTCHA_SECRET_KEY,
                'response': token
            })
            result = r.json()
            if not result.get('success'):
                return Response({'detail': 'reCAPTCHA failed'}, status=status.HTTP_400_BAD_REQUEST)

            # Send confirmation to user
            user_email = serializer.validated_data['email']
            user_name = serializer.validated_data['name']
            user_message = serializer.validated_data['message']

            send_mail(
                subject='Thanks for contacting us!',
                message=f'Hi {user_name},\n\nThanks for reaching out! We’ll get back to you soon.\n\nYour message:\n"{user_message}"',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user_email],
                fail_silently=False,
            )

            # Send notification to admin
            send_mail(
                subject='New Contact Form Submission',
                message=f"Name: {user_name}\nEmail: {user_email}\nMessage: {user_message}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            return Response({'detail': 'Message sent successfully.'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

