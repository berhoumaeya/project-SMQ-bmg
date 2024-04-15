from django.urls import path
from .views import CreateDemandAPIView, DocumentPendingAPIView, CreateDocumentInterneAPIView,DocumentDetailAPIView

urlpatterns = [
    path('create-demand/', CreateDemandAPIView.as_view(), name='create_demand'),
    path('document-pending/', DocumentPendingAPIView.as_view(), name='document_pending'),
    path('create-document-interne/', CreateDocumentInterneAPIView.as_view(), name='create_document_interne'),
    path('documents/<int:pk>/', DocumentDetailAPIView.as_view(), name='document-detail'),
    path('documents/<int:pk>/download/', DocumentDetailAPIView.as_view(), name='document-download'),
]
