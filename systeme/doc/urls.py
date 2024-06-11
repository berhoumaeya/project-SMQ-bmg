from django.urls import path
from .views import *

urlpatterns = [

    path('demand_attachments/<int:doc_id>/', get_piece_jointe_demande, name='demand_attachments'),
    path('documents/<int:doc_id>/', get_piece_jointe_docInt, name='documents'),
    path('documentsExt/<int:doc_id>/', get_piece_jointe_docExt, name='documentsExt'),


    path('create-demand/', CreateDemandAPIView.as_view(), name='create_demand'),
    path('document-pending/', DemandePendingAPIView.as_view(), name='document_pending'),
    path('document-Accepted/', DocumentAcceptedAPIView.as_view(), name='document_Accepted'),

    path('document-pending/<int:document_id>/', DemandePendingAPIView.as_view(), name='document_update'),
    path('create-document-interne/<int:document_id>/', CreateDocumentInterneAPIView.as_view(), name='create-document-interne'),
    path('documents/verification/', DocumentVerifAPIView.as_view(), name='document_verification'),
    path('documents/verification/<int:document_id>/', DocumentVerifAPIView.as_view(), name='document_verification_update'),

    path('documents/Approuve/', DocumentApprouveAPIView.as_view(), name='document_Approuve'),
    path('documents/Approuve/<int:document_id>/', DocumentApprouveAPIView.as_view(), name='document_Approuve_update'),

    path('documents/Update/<int:pk>/', UpdateDocAPIView.as_view(), name='document_Update'),
    path('documents/Delete/<int:pk>/', DeleteDocIntAPIView.as_view(), name='document_Delete'),
    path('documents/', DashboardDocIntAPIView.as_view(), name='document-detail'),
    path('details/<int:pk>/', DocIntDetailView.as_view(), name='doc-detail'),

    path('detailsExt/<int:pk>/', DocExtDetailView.as_view(), name='docExt-detail'),

    
    path('historique/<int:pk>', DocumentDetailsAPIView.as_view(), name='document-download'),

    path('create-document-Externe/', CreateDocumentExterneAPIView.as_view(), name='create_document_Externe'),
    path('documentsExt/Update/<int:pk>/', UpdateExtDocAPIView.as_view(), name='document_Update'),
    path('documentsExt/<int:pk>/', DocumentExtDetailsAPIView.as_view(), name='document-download'),
    path('documentsExt/', DashboardDocExtAPIView.as_view(), name='document-detail'),
    path('documentsExt/Delete/<int:pk>/', DeleteDocExtAPIView.as_view(), name='document_Delete'),

]
