from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard_audit/', DashboardauditAPIView.as_view(), name='dashboard_audit'),
    path('create_audit/', CreateauditAPIView.as_view(), name='create_audit'),
    path('update_audit/<int:pk>/', UpdateauditAPIView.as_view(), name='update_audit'),
    path('audit/<int:pk>/', SingularauditAPIView.as_view(), name='singular_audit'),
    path('delete_audit/<int:pk>/', DeleteauditAPIView.as_view(), name='delete_audit'),


    path('dashboard_PlanAudit/', DashboardPlanAuditAPIView.as_view(), name='dashboard_PlanAudit'),
    path('create_PlanAudit/', CreatePlanAuditAPIView.as_view(), name='create_PlanAudit'),
    path('update_PlanAudit/<int:pk>/', UpdatePlanAuditAPIView.as_view(), name='update_PlanAudit'),
    path('PlanAudit/<int:pk>/', SingularPlanAuditAPIView.as_view(), name='singular_PlanAudit'),
    path('delete_PlanAudit/<int:pk>/', DeletePlanAuditAPIView.as_view(), name='delete_PlanAudit'),
]