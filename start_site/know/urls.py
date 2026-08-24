from django.urls import path
from .views import TopicListView, FormatListView, SeriesListView, MediaListView, MediaDetailView, TopicDetailView, FormatDetailView, SeriesDetailView, KnowFormatSectionView, KnowHomeView, KnowSearchView, MediaViewCountView, MediaSitemapView


urlpatterns = [
    path("topics/", TopicListView.as_view(), name="topic-list"),
    path("topic/<slug:slug>/", TopicDetailView.as_view(), name="topic-detail"),
    path("formats/", FormatListView.as_view(), name="format-list"),
    path("format/<slug:slug>/", FormatDetailView.as_view(), name="format-detail"),
    path("series/", SeriesListView.as_view(), name="series-list"),
    path("series/<slug:slug>/", SeriesDetailView.as_view(), name="series-detail"),
    path("media/", MediaListView.as_view(), name="media-list"),
    path("media/<slug:slug>/", MediaDetailView.as_view(), name="media-detail"),
    path("know-home/", KnowHomeView.as_view(), name="know-home"),
    path("know-section/<str:section>/", KnowFormatSectionView.as_view(), name="know-section"), 
    path("search/", KnowSearchView.as_view(), name="know-search"),
    path("media/<slug:slug>/view/", MediaViewCountView.as_view(), name="media-view"),
    path("sitemap/media/", MediaSitemapView.as_view(), name="media-sitemap"),
    
]
