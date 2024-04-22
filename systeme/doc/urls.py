from django.urls import path
from .views import *

urlpatterns = [
    path('create-demand/', CreateDemandAPIView.as_view(), name='create_demand'),
    path('document-pending/', DocumentPendingAPIView.as_view(), name='document_pending'),
    path('create-document-interne/', CreateDocumentInterneAPIView.as_view(), name='create_document_interne'),
    path('documents/verification/', DocumentVerifAPIView.as_view(), name='document_verification'),
    path('documents/Approuve/', DocumentApprouveAPIView.as_view(), name='document_Approuve'),
    path('documents/Update/<int:pk>/', UpdateDocAPIView.as_view(), name='document_Update'),
    path('documents/Delete/<int:pk>/', DeleteDocIntAPIView.as_view(), name='document_Delete'),
    path('documents/', DashboardDocIntAPIView.as_view(), name='document-detail'),
    path('documents/<int:pk>/', DocumentDetailsAPIView.as_view(), name='document-download'),

    path('create-document-Externe/', CreateDocumentExterneAPIView.as_view(), name='create_document_Externe'),
    path('documentsExt/Update/<int:pk>/', UpdateExtDocAPIView.as_view(), name='document_Update'),
    path('documentsExt/<int:pk>/', DocumentExtDetailsAPIView.as_view(), name='document-download'),
    path('documentsExt/', DashboardDocExtAPIView.as_view(), name='document-detail'),
    path('documentsExt/Delete/<int:pk>/', DeleteDocExtAPIView.as_view(), name='document_Delete'),

]
