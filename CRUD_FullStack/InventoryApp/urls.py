from django.urls import path, re_path
from InventoryApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('item/', views.itemApi),  # For simple paths
    re_path(r'^item/([0-9]+)$', views.itemApi),  # For regex-based paths
    path('category/', views.categoryApi),  # For simple paths
    re_path(r'^category/([0-9]+)$', views.categoryApi),  # For regex-based paths
    path('item/savefile', views.SaveFile),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
