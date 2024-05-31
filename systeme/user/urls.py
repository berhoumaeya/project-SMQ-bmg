from django.urls import path
from .views import *

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

    path('users/', UserListAPIView.as_view(), name='user-list'),
    path('app/', AppListAPIView.as_view(), name='app-list'),
    path('verif/', VerListAPIView.as_view(), name='verif-list'),
    path('supp/', SuppListAPIView.as_view(), name='supp-list'),
    path('resTrait/', ResponsableTraitementListAPIView.as_view(), name='supp-list'),

    path('users/<int:user_id>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('app/<int:user_id>/', AppDetailView.as_view(), name='app-detail'),
    path('verif/<int:user_id>/', VerDetailView.as_view(), name='ver-detail'),
    path('supp/<int:user_id>/', SuppDetailView.as_view(), name='supp-detail'),

    
]