from django.urls import path
from django.http import HttpResponse
from .views import api_home, global_search, ReadPageDataView

urlpatterns = [
    path('', api_home, name='api_home'),
    path("ping/", lambda request: HttpResponse("OK")),
    path("nkemjika/search/", global_search, name="global_search"),
    path('nkemjika/read-page-data/', ReadPageDataView.as_view()),

]
