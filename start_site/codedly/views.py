from django.shortcuts import render

# Create your views here.
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from rest_framework import viewsets
from django.http import HttpResponse
from .models import Post, Category, Comment, Subcategory
from .serializers import PostSerializer, CategorySerializer, CommentSerializer, SubcategorySerializer

def api_home(request):
    return HttpResponse("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VeryCodedly API</title>
            <link rel="icon" href="/static/favicon.svg" type="image/x-icon">
            <style>
                /* Base Reset */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Segoe UI", Roboto, Arial, sans-serif;
                    background: linear-gradient(105deg, #000000, #111111, #222222);
                    color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    overflow: hidden;
                }

                /* Neon Glow Accent */
                body::before, body::after {
                    content: "";
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.25;
                }
                body::before {
                    width: 350px;
                    height: 350px;
                    left: -100px;
                    top: 40%;
                    background: #000000;
                }
                body::after {
                    width: 250px;
                    height: 250px;
                    right: -80px;
                    top: 10%;
                    background: #111111;
                }

                .container {
                    max-width: 780px;
                    width: 90%;
                    text-align: center;
                    padding: 3rem;
                    border-radius: 1.5rem;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(0, 50, 5, 0.5);
                    box-shadow: 0 8px 30px rgba(0, 150, 0, 0.25);
                    position: relative;
                    z-index: 10;
                }

                .brand {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                    color: #ff9900; /* Neon Orange */
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                h1 {
                    font-size: 2.8rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: linear-gradient(90deg, #fff, #39ff14);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 12px rgba(57, 255, 20, 0.7);
                }

                p {
                    margin: 0.5rem 0 2.5rem;
                    color: #bbbbbb;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }

                .links {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                a {
                    padding: 0.9rem 1.6rem;
                    background: #0f0f0f;
                    color: #39ff14;
                    text-decoration: none;
                    border-radius: 2rem;
                    font-weight: 600;
                    border: 1px solid #39ff14;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 0 #39ff14;
                }

                a:hover {
                    background: #39ff14;
                    color: #000;
                    transform: translateY(-2px);
                    box-shadow: 0 0 14px #39ff14;
                }

                a:active {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 #39ff14;
                }

                .footer {
                    margin-top: 2.5rem;
                    font-size: 0.85rem;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="brand">⚡ VeryCodedly API</div>
                <h1>Greetings, Developer.</h1>
                <p>
                    The official VeryCodedly API is live.<br/>
                    Explore endpoints, test integrations, and bring your ideas to life.
                </p>
                <div class="links">
                    <a href="/api/">API Docs</a>
                    <a href="/redoc/">Redoc</a>
                    <a href="/swagger/">Swagger UI</a>
                    <a href="/community/">Community</a>
                </div>
                <div class="footer">
                    &copy; 2025 VeryCodedly. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    """)

@api_view(['POST'])
def contact_view(request):
    name = request.data.get("name")
    email = request.data.get("email")
    message = request.data.get("message")

    if not name or not email or not message:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        subject = f"New Contact Form Submission from {name}"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

        send_mail(
            subject,
            body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],  # receive messages
        )
        return Response({"success": "Message sent successfully!"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all().order_by("name")
    serializer_class = SubcategorySerializer
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
