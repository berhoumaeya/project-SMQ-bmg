from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import *
from .serializers import NotificationSerializer
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth
import re

@method_decorator(csrf_protect,name='dispatch')
class CheckAuthenticatedView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user 
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success', 'username': user.first_name})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong'})

@method_decorator(csrf_protect,name='dispatch')


class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        username = data.get('username', '')
        password = data.get('password', '')
        re_password = data.get('re_password', '')
        prenom = data.get('prenom', '')
        nom = data.get('nom','')

        if not re.match(r'^[\w\.-]+@[\w\.-]+$', username):
            return Response({'error': 'Saisir adresse e-mail valide'})

        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'adresse e-mail déjà existant'})
            else:
                if len(password) < 8:
                    return Response({'error': 'Le mot de passe doit comporter au moins 8 caractères'})
                else:
                    user = User.objects.create_user(username=username, password=password)
                    user.first_name = prenom
                    user.last_name = nom  
                    user.save()
                    return Response({'success': 'Utilisateur créé avec succès'})

        else:
            return Response({'error': 'Les mots de passe ne correspondent pas'})

        
@method_decorator(csrf_protect,name='dispatch')     
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        user = auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return Response({'success':'User authenticated', 'Logged as :': user.last_name})
        else:
            return Response({'error':'Error Authenticating'})
        
class LogoutView(APIView):
    def post(self,request,format=None):
        try:
            auth.logout(request)
            return Response({'success':'Logout Out'})
        except:
            return Response({'error':'Something went wrong when logging out'})

@method_decorator(ensure_csrf_cookie,name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,format=None):
        return Response({'success':'CSRF cookie set'})

class DeleteAccountView(APIView):
    def delete(self, request,format=None):
        user = self.request.user
        try:
            user = User.objects.filter(id=user.id).delete()
            return Response({'success':'User deleted successfully'})
        except:
            return Response({'error':'Something wrong while try to delete'})
        

class SendNotificationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        recipient_username = request.data.get('recipient')
        try:
            recipient = User.objects.get(username=recipient_username)
        except User.DoesNotExist:
            return Response({"recipient": ["L'utilisateur spécifié n'existe pas."]}, status=status.HTTP_400_BAD_REQUEST)
        request.data['recipient'] = recipient.pk
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data.get('message')  
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(sender=request.user)
            
            send_notification(request.user, recipient, message)  

            return Response("Notification envoyée avec succès!", status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class NotificationListAPIView(APIView):
    def get(self, request):
        notifications = get_unread_notifications(request.user)  
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CheckNotificationAPIView(APIView):
    def get(self, request, notification_id):
        notification = get_object_or_404(Notification, id=notification_id)
        if notification.recipient == request.user:
            is_read = notification.is_read
            return Response({'is_read': is_read})
        else:
            return Response({'error': 'Vous n avez pas la permission d accéder à cette notification.'}, status=403)
        
class UserProfileAPIView(APIView):
    def get(self, request):
        user = request.user
        
        notifications = Notification.objects.filter(recipient=user)
        
        notifications_data = []
        for notification in notifications:
            notification_data = {
                'sender': notification.sender.first_name + ' ' + notification.sender.last_name,
                'message': notification.message,
                'created_at': notification.created_at.strftime('%Y-%m-%d %H:%M:%S') if notification.created_at else None
            }
            notifications_data.append(notification_data)
        
        user_data = {
            'username': user.username,
            'Prenom': user.first_name,
            'nom': user.last_name,
            'notifications': notifications_data
        }
        
        return Response(user_data)
