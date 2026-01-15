# VeryCodedly - Backend

The engine behind https://verycodedly.com

Django REST Framework + PostgreSQL.  
No cookies, no login, no tracking.

## What it does

- Serves the JSON API for the Next.js frontend
- Handles posts, images, categories, tags, courses, etc.

## Stack

- Django 5 + Django REST Framework
- PostgreSQL
- Cloudflare

## Running locally

```bash
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
