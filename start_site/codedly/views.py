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

