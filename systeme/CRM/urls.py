from django.urls import path

from .views import *

urlpatterns = [

    path('dashboard_client/', DashboardClientAPIView.as_view(), name='dashboard_client'),
    path('create_client/', CreateClientAPIView.as_view(), name='create_client'),
    path('update_client/<int:pk>/', UpdateClientAPIView.as_view(), name='update_client'),
    path('client/<int:pk>/', SingularClientAPIView.as_view(), name='singular_client'),
    path('delete_client/<int:pk>/', DeleteClientAPIView.as_view(), name='delete_client'),

    path('dashboard_reclamation_client/', DashboardReclamationClientAPIView.as_view(), name='dashboard_reclamation_client'),
    path('create_reclamation_client/', CreateReclamationClientAPIView.as_view(), name='create_reclamation_client'),
    path('update_reclamation_client/<int:pk>/', UpdateReclamationClientAPIView.as_view(), name='update_reclamation_client'),
    path('reclamation_client/<int:pk>/', SingularReclamationClientAPIView.as_view(), name='singular_reclamation_client'),
    path('delete_reclamation_client/<int:pk>/', DeleteReclamationClientAPIView.as_view(), name='delete_reclamation_client'),

    path('dashboard_enquete/', DashboardReclamationClientAPIView.as_view(), name='dashboard_enquete'),
    path('create_enquete/', CreateEnqueteAPIView.as_view(), name='create_enquete'),
    path('update_enquete/<int:pk>/', UpdateReclamationClientAPIView.as_view(), name='update_enquete'),
    path('enquete/<int:pk>/', SingularReclamationClientAPIView.as_view(), name='singular_enquete'),
    path('delete_enquete/<int:pk>/', DeleteReclamationClientAPIView.as_view(), name='delete_enquete'),

    path('dashboard_suggestion/', DashboardReclamationClientAPIView.as_view(), name='dashboard_suggestion'),
    path('create_suggestion/', CreateReclamationClientAPIView.as_view(), name='create_suggestion'),
    path('update_suggestion/<int:pk>/', UpdateReclamationClientAPIView.as_view(), name='update_suggestion'),
    path('suggestion/<int:pk>/', SingularReclamationClientAPIView.as_view(), name='singular_suggestion'),
    path('delete_suggestion/<int:pk>/', DeleteReclamationClientAPIView.as_view(), name='delete_suggestion'),




    
]
