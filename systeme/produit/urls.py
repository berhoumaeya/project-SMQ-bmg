from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard_Produit/', DashboardProduitAPIView.as_view(), name='dashboard_Produit'),
    path('create_Produit/', CreateProduitAPIView.as_view(), name='create_Produit'),
    path('update_Produit/<int:pk>/', UpdateProduitAPIView.as_view(), name='update_Produit'),
    path('Produit/<int:pk>/', SingularProduitAPIView.as_view(), name='singular_Produit'),
    path('delete_Produit/<int:pk>/', DeleteProduitAPIView.as_view(), name='delete_Produit'),

    path('dashboard_Fiche/', DashboardFicheAPIView.as_view(), name='dashboard_Fiche'),
    path('create_Fiche/', CreateFicheAPIView.as_view(), name='create_Fiche'),
    path('update_Fiche/<int:pk>/', UpdateFicheAPIView.as_view(), name='update_Fiche'),
    path('Fiche/<int:pk>/', SingularFicheAPIView.as_view(), name='singular_Fiche'),
    path('delete_Fiche/<int:pk>/', DeleteFicheAPIView.as_view(), name='delete_Fiche'),

    path('dashboard_TraiterNonConformite/', DashboardTraiterNonConformiteAPIView.as_view(), name='dashboard_TraiterNonConformite'),
    path('create_TraiterNonConformite/', CreateTraiterNonConformiteAPIView.as_view(), name='create_TraiterNonConformite'),
    path('update_TraiterNonConformite/<int:pk>/', UpdateTraiterNonConformiteAPIView.as_view(), name='update_TraiterNonConformite'),
    path('TraiterNonConformite/<int:pk>/', SingularTraiterNonConformiteAPIView.as_view(), name='singular_TraiterNonConformite'),
    path('delete_TraiterNonConformite/<int:pk>/', DeleteTraiterNonConformiteAPIView.as_view(), name='delete_TraiterNonConformite'),
]