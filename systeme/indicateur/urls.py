from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard_Indicateur/', DashboardIndicateurAPIView.as_view(), name='dashboard_Indicateur'),
    path('create_Indicateur/', CreateIndicateurAPIView.as_view(), name='create_Indicateur'),
    path('update_Indicateur/<int:pk>/', UpdateIndicateurAPIView.as_view(), name='update_Indicateur'),
    path('Indicateur/<int:pk>/', SingularIndicateurAPIView.as_view(), name='singular_Indicateur'),
    path('delete_Indicateur/<int:pk>/', DeleteIndicateurAPIView.as_view(), name='delete_Indicateur'),

    path('dashboard_SuiviIndicateur/', DashboardSuiviIndicateurAPIView.as_view(), name='dashboard_SuiviIndicateur'),
    path('create_SuiviIndicateur/', CreateSuiviIndicateurAPIView.as_view(), name='create_SuiviIndicateur'),
    path('update_SuiviIndicateur/<int:pk>/', UpdateSuiviIndicateurAPIView.as_view(), name='update_SuiviIndicateur'),
    path('SuiviIndicateur/<int:pk>/', SingularSuiviIndicateurAPIView.as_view(), name='singular_SuiviIndicateur'),
    path('delete_SuiviIndicateur/<int:pk>/', DeleteSuiviIndicateurAPIView.as_view(), name='delete_SuiviIndicateur'),
]