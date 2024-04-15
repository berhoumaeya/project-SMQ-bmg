from django.urls import path
from .views import *

urlpatterns = [
    path('meeting-minutes/<int:meeting_id>/', MeetingMinutesAPIView.as_view(), name='meeting_minutes_api'),
    path('dashboard_Meet/', DashboardMeetAPIView.as_view(), name='dashboard_Meet'),
    path('create_Meet/', CreateMeetAPIView.as_view(), name='create_Meet'),
    path('update_Meet/<int:pk>/', UpdateMeetAPIView.as_view(), name='update_Meet'),
    path('Meet/<int:pk>/', SingularMeetAPIView.as_view(), name='singular_Meet'),
    path('delete_Meet/<int:pk>/', DeleteMeetAPIView.as_view(), name='delete_Meet'),
]
   