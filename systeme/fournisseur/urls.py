from django.urls import path
from .views import *

urlpatterns = [

    path('dashboard_Fournisseur/', DashboardFournisseurAPIView.as_view(), name='dashboard_Fournisseur'),
    path('create_Fournisseur/', CreateFournisseurAPIView.as_view(), name='create_Fournisseur'),
    path('update_Fournisseur/<int:pk>/', UpdateFournisseurAPIView.as_view(), name='update_Fournisseur'),
    path('Fournisseur/<int:pk>/', SingularFournisseurAPIView.as_view(), name='singular_Fournisseur'),
    path('delete_Fournisseur/<int:pk>/', DeleteFournisseurAPIView.as_view(), name='delete_Fournisseur'),

    path('dashboard_ReclamationFournisseur/', DashboardReclamationFournisseurAPIView.as_view(), name='dashboard_ReclamationFournisseur'),
    path('create_ReclamationFournisseur/', CreateReclamationFournisseurAPIView.as_view(), name='create_ReclamationFournisseur'),
    path('update_ReclamationFournisseur/<int:pk>/', UpdateReclamationFournisseurAPIView.as_view(), name='update_ReclamationFournisseur'),
    path('ReclamationFournisseur/<int:pk>/', SingularReclamationFournisseurAPIView.as_view(), name='singular_ReclamationFournisseur'),
    path('delete_ReclamationFournisseur/<int:pk>/', DeleteReclamationFournisseurAPIView.as_view(), name='delete_ReclamationFournisseur'),
]