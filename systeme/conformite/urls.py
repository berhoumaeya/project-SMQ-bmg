from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard_Exigence/', DashboardExigenceAPIView.as_view(), name='dashboard_Exigence'),
    path('create_Exigence/', CreateExigenceAPIView.as_view(), name='create_Exigence'),
    path('update_Exigence/<int:pk>/', UpdateExigenceAPIView.as_view(), name='update_Exigence'),
    path('Exigence/<int:pk>/', SingularExigenceAPIView.as_view(), name='singular_Exigence'),
    path('delete_Exigence/<int:pk>/', DeleteExigenceAPIView.as_view(), name='delete_Exigence'),

]