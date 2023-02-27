from django.urls import path, include
from .views import index
import sys

USE_REST_FRAMEWORK = True
try:
    import rest_framework
except:    
    USE_REST_FRAMEWORK = False

urlpatterns = [
    path('', index),
]

if USE_REST_FRAMEWORK:
    from profiles.views import (
        BiographyListView,
        BiographyDetailView,
        BiographyCreateView,
        BiographyUpdateView,
        BiographyDeleteView,
        
        PengalamanListView,
        PengalamanDetailView,
        PengalamanCreateView,
        PengalamanUpdateView,
        PengalamanDeleteView,
    
        PendidikanListView,
        PendidikanDetailView,
        PendidikanCreateView,
        PendidikanUpdateView,
        PendidikanDeleteView,\
    )
    
    if USE_REST_FRAMEWORK:
        urlpatterns += [
            path('biography/', BiographyListView.as_view(), name='biography_list'),
            path('biography/<int:pk>/', BiographyDetailView.as_view(), name='biography_detail'),
            path('biography/create/', BiographyCreateView.as_view(), name='biography_create'),
            path('biography/update/<int:pk>/', BiographyUpdateView.as_view(), name='biography_update'),
            path('biography/delete/<int:pk>/', BiographyDeleteView.as_view(), name='biography_delete'),
            path('pengalaman/', PengalamanListView.as_view(), name='pengalaman_list'),
            path('pengalaman/<int:pk>/', PengalamanDetailView.as_view(), name='pengalaman_detail'),
            path('pengalaman/create/', PengalamanCreateView.as_view(), name='pengalaman_create'),
            path('pengalaman/update/<int:pk>/', PengalamanUpdateView.as_view(), name='pengalaman_update'),
            path('pengalaman/delete/<int:pk>/', PengalamanDeleteView.as_view(), name='pengalaman_delete'),
            path('pendidikan/', PendidikanListView.as_view(), name='pendidikan_list'),
            path('pendidikan/<int:pk>/', PendidikanDetailView.as_view(), name='pendidikan_detail'),
            path('pendidikan/create/', PendidikanCreateView.as_view(), name='pendidikan_create'),
            path('pendidikan/update/<int:pk>/', PendidikanUpdateView.as_view(), name='pendidikan_update'),
            path('pendidikan/delete/<int:pk>/', PendidikanDeleteView.as_view(), name='pendidikan_delete'),        
        ]
        