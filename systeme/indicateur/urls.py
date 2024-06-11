from django.urls import path
from .views import *

urlpatterns = [
    path('pieces_jointes_indicateur/<int:fiche_id>/', get_piece_jointe_indicateur, name='piece_jointe_suivi'),
    path('pieces_jointes_suivi/<int:fiche_id>/', get_piece_jointe_suivi, name='piece_jointe_suivi'),


    path('dashboard_Indicateur/', DashboardIndicateurAPIView.as_view(), name='dashboard_Indicateur'),
    path('create_Indicateur/', CreateIndicateurAPIView.as_view(), name='create_Indicateur'),
    path('update_Indicateur/<int:pk>/', UpdateIndicateurAPIView.as_view(), name='update_Indicateur'),
    path('Indicateur/<int:pk>/', SingularIndicateurAPIView.as_view(), name='singular_Indicateur'),
    path('delete_Indicateur/<int:pk>/', DeleteIndicateurAPIView.as_view(), name='delete_Indicateur'),

    path('dashboard_SuiviIndicateur/<int:pk>/', DashboardSuiviIndicateurAPIView.as_view(), name='dashboard_SuiviIndicateur'),
    path('create_SuiviIndicateur/<int:pk>/', CreateSuiviIndicateurAPIView.as_view(), name='create_SuiviIndicateur'),
    path('update_SuiviIndicateur/<int:pk>/', UpdateSuiviIndicateurAPIView.as_view(), name='update_SuiviIndicateur'),
    path('SuiviIndicateur/<int:pk>/', SingularSuiviIndicateurAPIView.as_view(), name='singular_SuiviIndicateur'),
    path('delete_SuiviIndicateur/<int:pk>/', DeleteSuiviIndicateurAPIView.as_view(), name='delete_SuiviIndicateur'),

]