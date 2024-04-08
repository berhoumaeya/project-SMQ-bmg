from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard_Risk/', DashboardRiskAPIView.as_view(), name='dashboard_Risk'),
    path('create_Risk/', CreateRiskAPIView.as_view(), name='create_Risk'),
    path('update_Risk/<int:pk>/', UpdateRiskAPIView.as_view(), name='update_Risk'),
    path('Risk/<int:pk>/', SingularRiskAPIView.as_view(), name='singular_Risk'),
    path('delete_Risk/<int:pk>/', DeleteRiskAPIView.as_view(), name='delete_Risk'),
]