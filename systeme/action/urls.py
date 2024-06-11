from django.urls import path
from .views import *

urlpatterns = [

    path('pieces_jointes_action/<int:doc_id>/', get_piece_jointe_action, name='pieces_jointes_action'),

    path('dashboard_action/', DashboardActionAPIView.as_view(), name='dashboard_action'),
    path('create_action/', CreateActionAPIView.as_view(), name='create_action'),
    path('update_action/<int:pk>/', UpdateActionAPIView.as_view(), name='update_action'),
    path('action/<int:pk>/', SingularActionAPIView.as_view(), name='singular_action'),
    path('delete_action/<int:pk>/', DeleteActionAPIView.as_view(), name='delete_action'),
    
]
