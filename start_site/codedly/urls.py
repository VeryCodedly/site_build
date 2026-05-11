from django.urls import path
from django.http import HttpResponse
from .views import api_home, global_search, ReadPageDataView, create_store_order, flutterwave_webhook, calculate_shipping_view, track_order, get_order_status, update_order_after_payment

urlpatterns = [
    path('', api_home, name='api_home'),
    path("nkemjika/search/", global_search, name="global_search"),
    path('nkemjika/read-page-data/', ReadPageDataView.as_view()),
    path('nkemjika/store/create-order/', create_store_order, name='create_store_order'),
    path('nkemjika/store/webhook/flutterwave/', flutterwave_webhook, name='flutterwave_webhook'),
    path('nkemjika/store/shipping/', calculate_shipping_view, name='calculate_shipping'),   # new
    path('nkemjika/store/track-order/', track_order, name='track_order'),
    path('nkemjika/store/order-status/', get_order_status, name='get_order_status'),
    path('nkemjika/store/update-payment/', update_order_after_payment, name='update_payment'),

]