from datetime import datetime
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q

from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from collections import defaultdict

from decimal import Decimal
from django.db import transaction

from rest_framework import viewsets
from rest_framework import generics
from django.http import HttpResponse
from django.db.models.functions import Length
from .models import Post, Category, Comment, Subcategory, PostImage, PostLink, Course, Lesson, StoreOrder, StoreProduct, PrintfulProducts
from .serializers import CategoryPostsSerializer, PostSerializer, PostFeedSerializer, CategorySerializer, CommentSerializer, StoreProductSerializer, SubcategorySerializer, PostImageSerializer, PostLinkSerializer, LessonSerializer, CourseSerializer, CourseDetailSerializer, StoreOrderSerializer, StoreProductSerializer, PrintfulProductSerializer

import uuid
import os
import json
import hmac
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.permissions import AllowAny
import requests
from django.db import transaction
from dotenv import load_dotenv

load_dotenv()

 
CACHE_TIMEOUT = 1800

def api_home(request):
    return HttpResponse("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VeryCodedly API</title>
            <link rel="icon" href="/static/favicon.svg">
            <style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body {
                    font-family: system-ui, sans-serif;
                    background: #000;
                    color: #fff;
                    min-height: 100vh;
                    display: grid;
                    place-items: center;
                }
                a {
                    padding: 1rem 2rem;
                    background: transparent;
                    color: #9AE600;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-decoration: none;
                    border: 2px solid #9AE600;
                    border-radius: 5rem;
                    transition: all .25s ease;
                    box-shadow: 0 0 20px rgba(57,255,20,.3);
                }
                a:hover {
                    background: #9AE600;
                    color: #000;
                    box-shadow: 0 0 30px rgba(57,255,20,.6);
                }
            </style>
        </head>
        <body>
            <a href="/">VeryCodedly</a>
        </body>
        </html>
    """)
            # <span>As you don reach here, well don, you try, but as I dey look you, waka commot before I close eye, open am. Nice meeting you.</span>
    
@api_view(["GET"])
def global_search(request):
    q = request.GET.get("q", "").strip()
    if len(q) < 2:
        return Response({"results": []})

    results = []

    # 1. Posts
    posts = Post.objects.filter(
        Q(title__icontains=q) |
        Q(excerpt__icontains=q) |
        Q(content_plain_text__icontains=q)
    ).select_related("category", "subcategory")[:8]

    for p in posts:
        cat = p.category.name if p.category else ""
        sub = p.subcategory.name if p.subcategory else ""
        subtitle = f"{cat} → {sub}".strip(" →") if sub or cat else "Uncategorized"
        results.append({
            "type": "Post",
            "title": p.title,
            "subtitle": subtitle,
            "url": f"/read/{p.slug}",
            "icon": "faNewspaper",
        })

    # 2. Categories
    categories = Category.objects.filter(name__icontains=q)[:5]
    for c in categories:
        results.append({
            "type": "Category",
            "title": c.name,
            "url": f"/read/category/{c.slug}",
            "icon": "faFolderBlank",
        })

    # 3. Subcategories
    subcats = Subcategory.objects.filter(
        Q(name__icontains=q) | Q(about__icontains=q)
    )[:5]
    for s in subcats:
        results.append({
            "type": "Subcategory",
            "title": s.name,
            "subtitle": s.category.name,
            "url": f"/read/subcategory/{s.slug}",
            "icon": "faFolderOpen",
        })

    # 4. Courses
    courses = Course.objects.filter(
        Q(title__icontains=q) | Q(description__icontains=q)
    )[:5]
    for c in courses:
        results.append({
            "type": "Course",
            "title": c.title,
            "subtitle": c.description,
            "url": f"/learn/{c.slug}",
            "icon": "faGraduationCap",
        })

    # 5. Lessons
    lessons = Lesson.objects.filter(
        Q(title__icontains=q) | Q(content_plain_text__icontains=q)
    ).select_related("course")[:6]
    for l in lessons:
        results.append({
            "type": "Lesson",
            "title": l.title,
            "subtitle": l.course.title,
            "url": f"/learn/{l.course.slug}/{l.slug}",
            "icon": "faBookOpen",
        })

    return Response({"results": results})


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(status="published").order_by("-created_at")
    serializer_class = PostSerializer
    lookup_field = "slug"
    search_fields = ["title", "excerpt"]


class ReadPageDataView(APIView):

    CACHE_KEY = "read_page_data"

    CATEGORY_CONFIG = {
        "featured": ("featured", 3),
        "right-now": ("trending", 6),
        "showtime": ("spotlight", 6),
        "digital-money": ("digitalMoney", 3),
        "blockchain-crypto": ("bchCrypto", 6),
        "key-players": ("keyPlayers", 6),
        "ai": ("AI", 6),
        "big-deal": ("bigDeal", 6),
        "hardware": ("hardware", 3),
        "policy-progress": ("policyProgress", 6),
        "wired-world": ("globalLens", 3),
        "africa-now": ("africaRising", 6),
        "data-defense": ("dataDefense", 3),
        "secure-habits": ("secureHabits", 6),
        "privacy-compliance": ("prvCompliance", 6),
        "beginner-guides": ("buyGuides", 6),
        "dev-digest": ("devDigest", 3),
        "upskill": ("upskill", 6),
    }

    def get(self, request):

        cached = cache.get(self.CACHE_KEY)
        if cached:
            return Response(cached)

        data = {}

        slugs = list(self.CATEGORY_CONFIG.keys())

        # ONE query for all section posts
        posts = (
            Post.objects
            .select_related("subcategory")
            .filter(
                status="published",
                subcategory__slug__in=slugs
            )
            .only(
                "id",
                "title",
                "slug",
                "image",
                "category",
                "created_at",
                "subcategory_id"
            )
            .order_by("-created_at")
        )

        grouped = defaultdict(list)

        for post in posts:

            slug = post.subcategory.slug
            key, limit = self.CATEGORY_CONFIG[slug]

            if len(grouped[slug]) < limit:
                grouped[slug].append(post)

        # serialize grouped data
        for slug, items in grouped.items():

            key, _ = self.CATEGORY_CONFIG[slug]

            data[key] = PostFeedSerializer(
                items,
                many=True,
                context={"request": request}
            ).data

        # latest posts query
        latest_posts = (
            Post.objects
            .select_related("subcategory")
            .filter(status="published")
            .only(
                "id",
                "title",
                "slug",
                "excerpt",
                "image",
                "category",
                "created_at",
                "subcategory_id"
            )
            .order_by("-created_at")[:9]
        )

        data["latest"] = PostFeedSerializer(
            latest_posts,
            many=True,
            context={"request": request}
        ).data

        cache.set(self.CACHE_KEY, data, timeout=CACHE_TIMEOUT)

        return Response(data)

        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return CategorySerializer
        if self.action == "retrieve":
            return CategoryPostsSerializer
        return CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        category = self.get_object()
        cache_key = f"category_{category.slug}_posts"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        # Fetch minimal fields for published posts
        posts = Post.objects.filter(category=category, status="published") \
            .only("title", "slug", "image", "created_at", "alt") \
            .order_by("-created_at")

        # Serialize
        serialized_posts = PostSerializer(posts, many=True, context={"request": request}).data

        # Build dict in shape CategoryPostsSerializer expects
        data = CategoryPostsSerializer(category, context={"request": request}).data
        data["posts"] = serialized_posts

        # Cache and return
        cache.set(cache_key, data, timeout=CACHE_TIMEOUT)
        return Response(data)


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.annotate(name_length=Length("name")).order_by("name_length")
    serializer_class = SubcategorySerializer
    lookup_field = "slug"

    @action(detail=True, methods=["get"], url_path="posts")
    def posts(self, request, *args, **kwargs):
        subcategory = self.get_object()  # safe DRF lookup
        cache_key = f"subcategory_{subcategory.slug}_posts"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        posts = (
            Post.objects.filter(subcategory=subcategory, status="published")
            .only("title", "slug", "image", "created_at", "alt")
            .order_by("-created_at")
        )

        serialized_posts = PostSerializer(posts, many=True, context={"request": request}).data
        data = {
            "subcategory": SubcategorySerializer(subcategory, context={"request": request}).data,
            "count": posts.count(),
            "results": serialized_posts
        }

        cache.set(cache_key, data, timeout=CACHE_TIMEOUT)
        return Response(data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class PostImageViewSet(viewsets.ModelViewSet):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
    
class PostLinkViewSet(viewsets.ModelViewSet):
    queryset = PostLink.objects.all()
    serializer_class = PostLinkSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all().order_by("sort")
    serializer_class = CourseSerializer
    lookup_field = "slug"
    
    
class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    lookup_field = "slug"
    
    
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    lookup_field = "slug"


class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer
    lookup_field = "slug"

    def get_queryset(self):
        course_slug = self.kwargs["slug"]
        return Lesson.objects.filter(course__slug=course_slug).order_by("order")


class LessonDetailView(generics.RetrieveAPIView):
    serializer_class = LessonSerializer
    lookup_field = "slug"

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        return Lesson.objects.filter(course__slug=course_slug)
    

class StoreProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StoreProduct.objects.filter(status='published')  # only show published
    serializer_class = StoreProductSerializer
    lookup_field = 'pk'
    pagination_class = None
    
     
class PrintfulProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrintfulProductSerializer
    lookup_field = "slug"
    lookup_url_kwarg = "slug"
    pagination_class = None
    
    def get_queryset(self):
        queryset = PrintfulProducts.objects.filter(
            status="published",
            is_active=True,
            slug__isnull=False
        ).order_by("category", "name")

        # handle query params
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)

        exclude = self.request.query_params.get("exclude")
        if exclude:
            queryset = queryset.exclude(id=exclude)
            
        # limit related products
        if self.action == "list" and category:
            return queryset[:4]

        return queryset

   
@api_view(['POST'])
@permission_classes([AllowAny])
def create_store_order(request):
    print("=== CREATE ORDER VIEW HIT ===")
    data = request.data
    cart_items = data.get('cart_items', [])

    if not cart_items:
        return Response({"error": "Cart is empty, let's fix that."}, status=400)

    try:
        total_amount = Decimal('0.00')
        verified_items = []
        resolved_items_for_shipping = []

        for item in cart_items:
            variant_id = item.get('variant_id')
            if not variant_id:
                return Response({"error": "variant_id is missing"}, status=400)

            product = None
            matching_variant = None
            for p in PrintfulProducts.objects.iterator():
                for v in p.variant_mapping:
                    if str(v.get("variant_id")) == str(variant_id):
                        product = p
                        matching_variant = v
                        break
                if product:
                    break

            if not product or not matching_variant:
                return Response({"error": f"Variant {variant_id} not found"}, status=404)

            item_price = Decimal(matching_variant["price"])
            item_total = item_price * Decimal(item["quantity"])
            total_amount += item_total

            verified_items.append({
                'id': product.id,
                'name': product.name,
                'price': float(item_price),
                'quantity': item['quantity'],
                'variant_id': int(matching_variant["variant_id"]),
            })

            resolved_items_for_shipping.append({
                "variant_id": int(matching_variant["variant_id"]),
                "quantity": item["quantity"]
            })

        shipping_data = data.get("shipping_address")
        if not shipping_data:
            return Response({"error": "Shipping address required"}, status=400)

        shipping_cost = calculate_shipping(resolved_items_for_shipping, shipping_data)
        final_total = total_amount + shipping_cost

        # Generate IDs
        order_id = str(uuid.uuid4())[:8].upper()
        tx_ref = f"VC-{order_id}-{int(datetime.now().timestamp())}"

        order = StoreOrder.objects.create(
            order_id=order_id,
            customer_name=f"{data.get('first_name', '')} {data.get('last_name', '')}".strip(),
            customer_email=data['email'],
            customer_phone=data['phone'],
            shipping_address=shipping_data.get("address"),
            shipping_address2=shipping_data.get("address2", ""),
            shipping_city=shipping_data.get("city"),
            shipping_state=shipping_data.get("state"),
            shipping_country=shipping_data.get("country"),
            shipping_postal=shipping_data.get("postal_code"),
            items=verified_items,
            subtotal=total_amount,
            shipping_cost=shipping_cost,
            total_amount=final_total,
            currency=data.get('currency', 'USD'),
            shipping_details=shipping_data,

            # Payment fields
            tx_ref=tx_ref,
            payment_reference=tx_ref,
            payment_status='pending',
            status='pending',
            payment_gateway='flutterwave',
        )

        return Response({
            'success': True,
            'order_id': order_id,
            'tx_ref': tx_ref,
            'amount': float(final_total)
        }, status=201)

    except Exception as e:
        print("ERROR in create_store_order:", str(e))
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
@permission_classes([AllowAny])
def update_order_after_payment(request):
    """Called from Flutterwave callback to update flw_ref and mark as paid"""
    order_id = request.data.get('order_id')
    flw_ref = request.data.get('flw_ref')
    tx_ref = request.data.get('tx_ref')
    payment_response = request.data.get('payment_response')

    if not order_id or not flw_ref:
        return Response({"error": "order_id and flw_ref are required"}, status=400)

    try:
        order = StoreOrder.objects.get(order_id=order_id)

        order.flw_ref = flw_ref
        order.payment_status = 'success'
        order.status = 'paid'
        if payment_response:
            order.payment_response = payment_response

        order.save()

        print(f"✅ Order {order_id} updated with flw_ref: {flw_ref}")

        return Response({
            'success': True,
            'order_id': order_id,
            'message': 'Order updated successfully'
        })

    except StoreOrder.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    except Exception as e:
        print("Error updating order:", str(e))
        return Response({"error": str(e)}, status=500)
    
   
def calculate_shipping(items_for_printful, shipping):
    payload = {
        "recipient": {
            "name": f"{shipping.get('first_name', '')} {shipping.get('last_name', '')}".strip(),
            "email": shipping["email"],
            "phone": shipping["phone"],
            "address1": shipping["address"],
            "city": shipping["city"],
            "state_code": shipping["state"],
            "country_code": shipping["country"],
            "zip": shipping["postal_code"],
        },
        "items": items_for_printful
    }

    response = requests.post(
        os.getenv("SHIPPING_URL"),
        headers={
            "Authorization": f"Bearer {os.getenv('PRINTFUL_ACCESS_KEY')}",
            "Content-Type": "application/json",
            "X-PF-Store-Id": f"{os.getenv('PRINTFUL_STORE_ID')}"
        },
        json=payload, timeout=30
    )
    if response.status_code != 200:
        raise Exception(f"Printful error: {response.text}")

    data = response.json()
    rates = data.get("result", [])

    if not rates:
        raise Exception("No shipping rates returned")

    cheapest = min(rates, key=lambda x: float(x["rate"]))

    return Decimal(str(cheapest["rate"]))

@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_shipping_view(request):
    print("=== SHIPPING ENDPOINT HIT ===")
    print("Received data:", request.data)

    data = request.data
    cart_items = data.get('cart_items', [])
    shipping = data.get('shipping')

    if not cart_items:
        return Response({"error": "Cart is empty, let's fix that."}, status=400)
    
    if not shipping:
        return Response({"error": "Shipping address is required"}, status=400)

    try:
        # Convert to Printful format
        items_for_printful = [
            {
                "variant_id": int(item["variant_id"]),
                "quantity": int(item["quantity"])
            }
            for item in cart_items
        ]

        # Call your existing function
        shipping_cost = calculate_shipping(items_for_printful, shipping)

        print(f"✅ Shipping calculated successfully: ${shipping_cost}")

        return Response({
            "success": True,
            "rate": float(shipping_cost)
        })

    except Exception as e:
        print("❌ Shipping Error:", str(e))
        return Response({"error": str(e)}, status=400)

def create_printful_order(order):
    items = []

    for item in order.items:
        items.append({
            "variant_id": int(item["variant_id"]),
            "quantity": item["quantity"]
        })

    payload = {
        "recipient": {
            "name": order.customer_name,
            "email": order.customer_email,
            "phone": order.customer_phone,
            "address1": order.shipping_address,
            "address2": order.shipping_address2 or "",
            "city": order.shipping_city,
            "state_code": order.shipping_state,
            "country_code": order.shipping_country,
            "zip": order.shipping_postal,
        },
        "items": items
    }

    response = requests.post(
        os.getenv("PRINTFUL_ORDER_URL"),
        headers={
            "Authorization": f"Bearer {os.getenv('PRINTFUL_ACCESS_KEY')}",
            "Content-Type": "application/json",
            "X-PF-Store-Id": f"{os.getenv('PRINTFUL_STORE_ID')}",  # store ID
        },
        json=payload,
        timeout=30
    )

    if response.status_code not in [200, 201]:
        raise Exception(f"Printful order failed: {response.text}")

    return response.json()

@csrf_exempt
def flutterwave_webhook(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    signature = request.headers.get('verif-hash')
    secret_hash = os.getenv('FLW_SECRET_HASH')

    if not signature or signature != secret_hash:
        print("Invalid webhook signature")
        return JsonResponse({'status': 'error', 'message': 'Invalid hash'}, status=401)

    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

    data = payload.get('data', {})
    event = payload.get('event')

    if event == 'charge.completed' and data.get('status') == 'successful':
        tx_ref = data.get('tx_ref')
        if not tx_ref:
            return JsonResponse({'status': 'error', 'message': 'Missing tx_ref'}, status=400)

        try:
            with transaction.atomic():
                order = StoreOrder.objects.select_for_update().get(payment_reference=tx_ref)

                if order.payment_status == 'success':
                    return JsonResponse({'status': 'already_processed'})

                flw_amount = Decimal(str(data.get('amount')))
                flw_currency = data.get('currency')

                # Strict amount & currency check
                if (flw_amount.quantize(Decimal("0.01")) != order.total_amount.quantize(Decimal("0.01")) or 
                    flw_currency != order.currency):
                    order.payment_status = 'flagged'
                    order.status = 'payment_mismatch'
                    order.save()
                    return JsonResponse({'status': 'error', 'message': 'Amount mismatch'}, status=400)

                # Mark as paid
                order.payment_status = 'success'
                order.status = 'paid'
                order.payment_response = payload
                order.save()

            # Create Printful order
            try:
                fulfillment = create_printful_order(order)
                order.status = 'processing'
                order.fulfillment_response = fulfillment
                order.printful_order_id = fulfillment.get("result", {}).get("id")
                order.save()
            except Exception as e:
                print(f"Fulfillment failed: {str(e)}")
                order.status = 'fulfillment_failed'
                order.save()

            # Send email
            try:
                send_mail(
                    subject=f"Your VeryCodedly Order #{order.order_id} - Confirmed",
                    message=f"""Hi {order.customer_name},

Payment received! We are now processing your order.

Order Number: {order.order_id}
Total: {order.total_amount} {order.currency}
Ref: {order.payment_reference}


You can track your order here:
https://verycodedly.com/track-order

Thanks, enjoy your merch!

VeryCodedly Team
""",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[order.customer_email],
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Email Error: {str(e)}")

            return JsonResponse({'status': 'success'})

        except StoreOrder.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Order not found'}, status=404)
        except Exception as e:
            print(f"Webhook Error: {str(e)}")
            return JsonResponse({'status': 'error', 'message': 'Processing failed'}, status=500)

    return JsonResponse({'status': 'ignored'})


@api_view(['POST'])
@permission_classes([AllowAny])
def track_order(request):
    order_id = request.data.get('order_id')
    email = request.data.get('email')
    payment_reference = request.data.get('payment_reference')

    if not order_id or not email:
        return Response({"error": "Order ID and Email are required"}, status=400)

    try:
        # Main query - be more flexible
        queryset = StoreOrder.objects.filter(
            order_id=order_id,
            customer_email__iexact=email
        )

        # If payment_reference is provided, use it for extra security
        if payment_reference:
            queryset = queryset.filter(payment_reference=payment_reference)

        order = queryset.first()

        if not order:
            return Response({"error": "Order not found or details don't match"}, status=404)

        return Response({
            "order_id": order.order_id,
            "status": order.status,
            "payment_reference": order.payment_reference,
            "payment_status": order.payment_status,
            "fulfillment_status": getattr(order, 'fulfillment_status', None),
            "tracking_number": getattr(order, 'tracking_number', None),
            "tracking_url": getattr(order, 'tracking_url', None),
            "name": order.customer_name,
            "email": order.customer_email,
            "phone": order.customer_phone,
            "shipping_address": order.shipping_address,
            "city": order.shipping_city,
            "state": order.shipping_state,
            "country": order.shipping_country,
            "items": order.items,
            "created_at": order.created_at,
            "shipping_cost": order.shipping_cost,
            "total_amount": float(order.total_amount),
            "currency": order.currency,
            "flw_ref": order.flw_ref,          # optional but useful
        })

    except Exception as e:
        print("Track order error:", str(e))
        return Response({"error": "Something went wrong"}, status=500)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_order_status(request):
    payment_ref = request.GET.get("payment_reference")
    
    if not payment_ref:
        return Response({"error": "Payment reference required"}, status=400)

    try:
        order = StoreOrder.objects.get(payment_reference=payment_ref)
        return Response({
            "order_id": order.order_id,
            "status": order.status,
            "payment_status": order.payment_status,
        })
    except StoreOrder.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
    
    
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def track_order(request, order_id):
#     try:
#         order = StoreOrder.objects.get(order_id=order_id)
        
#         return Response({
#             "order_id": order.order_id,
#             "status": order.status,
#             "payment_reference": order.payment_reference,
#             "payment_status": order.payment_status,
#             "fulfillment_status": getattr(order, 'fulfillment_status', None),
#             "tracking_number": getattr(order, 'tracking_number', None),
#             "tracking_url": getattr(order, 'tracking_url', None),
#             "name": order.customer_name,
#             "email": order.customer_email,
#             "phone": order.customer_phone,
#             "shipping_address": order.shipping_address,
#             "city": order.shipping_city,
#             "state": order.shipping_state,
#             "country": order.shipping_country,
#             "items": order.items,
#             "created_at": order.created_at,
#             "shipping_cost": order.shipping_cost,
#             "total_amount": float(order.total_amount),
#             "currency": order.currency,
#         })
#     except StoreOrder.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)
    
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_order_status(request):
#     order_id = request.GET.get("order_id")
#     email = request.GET.get("email")
#     payment_ref = request.GET.get("payment_reference")

#     if not order_id or not email or not payment_ref:
#         return Response(
#             {"error": "Missing required parameters"},
#             status=400
#         )

#     try:
#         order = StoreOrder.objects.get(
#             order_id=order_id,
#             email__iexact=email,
#             payment_reference=payment_ref
#         )

#         return Response({
#             "order_id": order.order_id,
#             "status": order.status,
#             "payment_status": order.payment_status,
#             "fulfillment_status": order.fulfillment_status,
#             "tracking_number": order.tracking_number,
#             "tracking_url": order.tracking_url,
#             "payment_reference": order.payment_reference,
#         })

#     except StoreOrder.DoesNotExist:
#         return Response(
#             {"error": "Order not found"},
#             status=404
#         )

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def create_store_order(request):
#     print("=== CREATE ORDER VIEW HIT ===")
#     data = request.data
#     cart_items = data.get('cart_items', [])

#     if not cart_items:
#         return Response({"error": "Cart is empty, let's fix that."}, status=400)

#     try:
#         total_amount = Decimal('0.00')
#         verified_items = []
#         resolved_items_for_shipping = []

#         for item in cart_items:
#             variant_id = item.get('variant_id')
#             if not variant_id:
#                 return Response({"error": "variant_id is missing"}, status=400)

#             # Find product and variant
#             product = None
#             matching_variant = None
#             for p in PrintfulProducts.objects.iterator():
#                 for v in p.variant_mapping:
#                     if str(v.get("variant_id")) == str(variant_id):
#                         product = p
#                         matching_variant = v
#                         break
#                 if product:
#                     break

#             if not product or not matching_variant:
#                 return Response({
#                     "error": f"Variant {variant_id} not found in any product"
#                 }, status=404)

#             item_price = Decimal(matching_variant["price"])
#             item_total = item_price * Decimal(item["quantity"])
#             total_amount += item_total

#             verified_items.append({
#                 'id': product.id,
#                 'name': product.name,
#                 'price': float(item_price),
#                 'quantity': item['quantity'],
#                 'variant_id': int(matching_variant["variant_id"]),
#             })

#             resolved_items_for_shipping.append({
#                 "variant_id": int(matching_variant["variant_id"]),
#                 "quantity": item["quantity"]
#             })

#         # Calculate Shipping
#         shipping_data = data.get("shipping_address")
#         if not shipping_data:
#             return Response({"error": "Shipping address required"}, status=400)

#         shipping_cost = calculate_shipping(resolved_items_for_shipping, shipping_data)
#         final_total = total_amount + shipping_cost

#         print(f"Subtotal: ${total_amount} | Shipping: ${shipping_cost} | Final Total: ${final_total}")

#         # Create Order
#         order_id = str(uuid.uuid4())[:8].upper()
#         tx_ref = f"VC-{order_id}-{int(datetime.now().timestamp())}"

#         order = StoreOrder.objects.create(
#             order_id=order_id,
#             customer_name=f"{data.get('first_name', '')} {data.get('last_name', '')}".strip(),
#             customer_email=data['email'],
#             customer_phone=data['phone'],
#             shipping_address=shipping_data.get("address"),
#             shipping_address2=shipping_data.get("address2", ""),
#             shipping_city=shipping_data.get("city"),
#             shipping_state=shipping_data.get("state"),
#             shipping_country=shipping_data.get("country"),
#             shipping_postal=shipping_data.get("postal_code"),
#             items=verified_items,
#             subtotal=total_amount,
#             total_amount=final_total,           # for Flutterwave
#             currency=data.get('currency', 'USD'),
#             shipping_cost=shipping_cost,
#             payment_reference=tx_ref,
#             payment_status='pending',
#             status='pending',
#             shipping_details=shipping_data,
#         )

#         return Response({
#             'success': True,
#             'order_id': order_id,
#             'tx_ref': tx_ref,
#             'amount': float(final_total)        # final total with shipping
#         }, status=201)

#     except Exception as e:
#         print("ERROR in create_store_order:", str(e))
#         return Response({'error': str(e)}, status=500)
    
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def track_order(request):
#     order_id = request.data.get('order_id')
#     email = request.data.get('email')
#     payment_reference = request.data.get('payment_reference')

#     if not order_id or not email or not payment_reference:
#         return Response({"error": "Order ID, Email and Payment Reference are required"}, status=400)

#     try:
#         order = StoreOrder.objects.get(
#             order_id=order_id,
#             customer_email__iexact=email,
#             payment_reference=payment_reference
#         )

#         return Response({
#             "order_id": order.order_id,
#             "status": order.status,
#             "payment_reference": order.payment_reference,
#             "payment_status": order.payment_status,
#             "fulfillment_status": getattr(order, 'fulfillment_status', None),
#             "tracking_number": getattr(order, 'tracking_number', None),
#             "tracking_url": getattr(order, 'tracking_url', None),
#             "name": order.customer_name,
#             "email": order.customer_email,
#             "phone": order.customer_phone,
#             "shipping_address": order.shipping_address,
#             "city": order.shipping_city,
#             "state": order.shipping_state,
#             "country": order.shipping_country,
#             "items": order.items,
#             "created_at": order.created_at,
#             "shipping_cost": order.shipping_cost,
#             "total_amount": float(order.total_amount),
#             "currency": order.currency,
#         })

#     except StoreOrder.DoesNotExist:
#         return Response({"error": "Order not found or details don't match"}, status=404)
#     except Exception as e:
#         return Response({"error": "Something went wrong"}, status=500)
