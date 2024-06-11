from django.urls import path

from .views import *

urlpatterns = [

    path('clients/<int:client_id>/', get_piece_jointe_client, name='clients'),

    path('reclamations_fournisseur/<int:client_id>/', get_piece_jointe_reclamation_client, name='reclamations_fournisseur'),
    path('plans_action/<int:client_id>/', get_piece_jointe_plan_action, name='plans_action'),
    path('fichiers_pdf_reclamation_client/<int:client_id>/', get_piece_jointe_pdf, name='fichiers_pdf_reclamation_client'),

    path('pieces_jointes_enquete_client/<int:client_id>/', get_piece_jointe_enquete_client, name='pieces_jointes_enquete_client'),
    path('pieces_jointes_suggestion_client/<int:client_id>/', get_piece_jointe_suggestion_client, name='pieces_jointes_suggestion_client'),


    path('dashboard_client/<int:pk>/', SingularClientAPIView.as_view(), name='dashboard_client'),
    path('create_client/', CreateClientAPIView.as_view(), name='create_client'),
    path('update_client/<int:pk>/', UpdateClientAPIView.as_view(), name='update_client'),
    path('client/', DashboardClientAPIView.as_view(), name='singular_client'),
    path('delete_client/<int:pk>/', DeleteClientAPIView.as_view(), name='delete_client'),

    path('dashboard_reclamation_client/<int:client_id>/', DashboardReclamationClientAPIView.as_view(), name='dashboard_reclamation_client'),
    path('create_reclamation_client/<int:client_id>/', CreateReclamationClientAPIView.as_view(), name='create_reclamation_client'),
    path('update_reclamation_client/<int:reclamation_id>/', UpdateReclamationClientAPIView.as_view(), name='update_reclamation_client'),
    path('reclamation_client/<int:reclamation_id>/', SingularReclamationClientAPIView.as_view(), name='singular_reclamation_client'),
    path('delete_reclamation_client/<int:pk>/', DeleteReclamationClientAPIView.as_view(), name='delete_reclamation_client'),

    path('dashboard_enquete/', DashboardEnqueteAPIView.as_view(), name='dashboard_enquete'),
    path('create_enquete/', CreateEnqueteAPIView.as_view(), name='create_enquete'),
    path('update_enquete/<int:pk>/', UpdateEnqueteAPIView.as_view(), name='update_enquete'),
    path('enquete/<int:pk>/', SingularEnqueteAPIView.as_view(), name='singular_enquete'),
    path('delete_enquete/<int:pk>/', DeleteEnqueteAPIView.as_view(), name='delete_enquete'),

    path('dashboard_suggestion/<int:client_id>/', DashboardSuggestionAPIView.as_view(), name='dashboard_suggestion'),
    path('create_suggestion/<int:client_id>/', CreateSuggestionAPIView.as_view(), name='create_suggestion'),
    path('update_suggestion/<int:pk>/', UpdateSuggestionAPIView.as_view(), name='update_suggestion'),
    path('suggestion/<int:pk>/', SingularSuggestionAPIView.as_view(), name='singular_suggestion'),
    path('delete_suggestion/<int:pk>/', DeleteSuggestionAPIView.as_view(), name='delete_suggestion'),

    path('allReclamation/', AllReclamationClient.as_view(), name='allReclamation'),







    
]
