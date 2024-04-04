from django.urls import path
from .views import SignupView,GetCSRFToken,LoginView,LogoutView,CheckAuthenticatedView,DeleteAccountView,CheckNotificationAPIView,SendNotificationAPIView,NotificationListAPIView,UserProfileAPIView

urlpatterns = [
    path('authenticated',CheckAuthenticatedView.as_view()),
    path('register',SignupView.as_view()),
    path('login',LoginView.as_view()),
    path('logout',LogoutView.as_view()),
    path('delete',DeleteAccountView.as_view()),
    path('csrf_cookie',GetCSRFToken.as_view()),

    path('check_notification/<int:notification_id>/', CheckNotificationAPIView.as_view(), name='check_notification'),
    path('send_notification/', SendNotificationAPIView.as_view(), name='send_notification'),
    path('notification_list/', NotificationListAPIView.as_view(), name='notification_list'),
    path('profile/', UserProfileAPIView.as_view(), name='user_profile'),
    
]