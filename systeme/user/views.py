from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User , Group
from rest_framework.views import APIView
from rest_framework import permissions
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import *
from doc.models import DemandDocument
from .serializers import NotificationSerializer
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth
import re
import requests




@method_decorator(csrf_protect,name='dispatch')
class CheckAuthenticatedView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user 
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success','id': user.id, 'username': user.first_name})
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
        
        # if not verify_email_with_hunter(self.request,username):
        #     return Response({'error': 'Adresse e-mail non valide ou inexistante'})

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
        notifs = Notification.objects.all()
        data = []
        for notif in notifs : 
            notif_data = {
                'id':notif.id,

            }
        return Response(notif_data, status=status.HTTP_200_OK)
    
class DeleteNotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        notif = get_object_or_404(Notification, pk=pk)
        notif.delete()
        return Response({"message": "La notification a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
class CheckNotificationAPIView(APIView):
    def get(self, request, notification_id):
        notification = get_object_or_404(Notification, id=notification_id)
        if notification.recipient == request.user:
            is_read = notification.is_read
            return Response({'is_read': is_read})
        else:
            return Response({'error': 'Vous n avez pas la permission d accéder à cette notification.'}, status=403)
        
class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        demandes = DemandDocument.objects.filter(created_by = user)
        notifications = Notification.objects.filter(recipient=user)
        
        notifications_data = []
        for notification in notifications:
            notification_data = {
                'sender': notification.sender.first_name + ' ' + notification.sender.last_name,
                'message': notification.message,
                'created_at': notification.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            notifications_data.append(notification_data)

        demandes_data = []
        for demande in demandes:
            demande_data = {
                'id':demande.id,
                'Type': demande.type,
                'document_object': demande.document_object,
                'statut': demande.statut,
                'created_at': demande.created_at.strftime('%Y-%m-%d %H:%M:%S') 
            }
            demandes_data.append(demande_data)
        
        user_data = {
            'username': user.username,
            'Prenom': user.first_name,
            'nom': user.last_name,
            'notifications': notifications_data,
            'Demandes':demandes_data,
        }
        
        return Response(user_data)
    def put(self, request):
        user = request.user
        data = request.data

        # Mettre à jour les champs du profil
        user.first_name = data.get('Prenom', user.first_name)
        user.last_name = data.get('nom', user.last_name)
        user.username = data.get('username', user.username)

        # Enregistrer les modifications
        user.save()
        return Response({'success': 'Profil mis à jour avec succès'}, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        data = request.data

        # Vérifier si les champs du mot de passe sont fournis
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if not old_password or not new_password:
            return Response({'error': 'Veuillez fournir l\'ancien et le nouveau mot de passe'}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier si l'ancien mot de passe est correct
        if not user.check_password(old_password):
            return Response({'error': 'Ancien mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        # Mettre à jour le mot de passe
        user.set_password(new_password)
        user.save()

        return Response({'success': 'Mot de passe mis à jour avec succès'}, status=status.HTTP_200_OK)
    
    
class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        user_data = [{'id': user.id, 'username': user.first_name} for user in users]
        return Response(user_data)
    
class UserDetailAPIView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        user_data = {'id': user.id, 'username': user.first_name}
        return Response(user_data)
    
class AppListAPIView(APIView):
    def get(self, request):
        approbateur_group = Group.objects.get(name='approbateur')
        users = User.objects.filter(groups=approbateur_group)
        user_data = [{'id': user.id, 'username': user.first_name} for user in users]
        return Response(user_data)
    
class AppDetailView(APIView):
    def get(self, request, user_id):
        approbateur_group = Group.objects.get(name='approbateur')
        user = get_object_or_404(User, id=user_id, groups=approbateur_group)
        user_data = {'id': user.id, 'username': user.first_name}
        return Response(user_data)
    
class VerListAPIView(APIView):
    def get(self, request):
        verificateur_group = Group.objects.get(name='verificateur')
        users = User.objects.filter(groups=verificateur_group)
        user_data = [{'id': user.id, 'username': user.first_name} for user in users]
        return Response(user_data)
    
class VerDetailView(APIView):
    def get(self, request, user_id):
        verificateur_group = Group.objects.get(name='verificateur')
        user = get_object_or_404(User, id=user_id, groups=verificateur_group)
        user_data = {'id': user.id, 'username': user.first_name}
        return Response(user_data)
    
class SuppListAPIView(APIView):
    def get(self, request):
        superviseur_group = Group.objects.get(name='superviseur')
        users = User.objects.filter(groups=superviseur_group)
        user_data = [{'id': user.id, 'username': user.first_name} for user in users]
        return Response(user_data)
    
class SuppDetailView(APIView):
    def get(self, request, user_id):
        superviseur_group = Group.objects.get(name='superviseur')
        user = get_object_or_404(User, id=user_id, groups=superviseur_group)
        user_data = {'id': user.id, 'username': user.first_name}
        return Response(user_data)
    
class ResponsableTraitementListAPIView(APIView):
    def get(self, request):
        responsable_traitement_group = Group.objects.get(name='responsable_traitement')
        users = User.objects.filter(groups=responsable_traitement_group)
        user_data = [{'id': user.id, 'username': user.first_name} for user in users]
        return Response(user_data)
    
class ResponsableTraitementDetailView(APIView):
    def get(self, request, user_id):
        responsable_traitement_group = Group.objects.get(name='responsable_traitement')
        user = get_object_or_404(User, id=user_id, groups=responsable_traitement_group)
        user_data = {'id': user.id, 'username': user.first_name}
        return Response(user_data)

def send_test_email(request):
    try:
        send_mail(
            'Test Email',
            'This is a test email.',
            'ferchichizakaria@gmail.com',
            ['ferchichizakaria@gmail.com'],
            fail_silently=False,
        )
        return HttpResponse('Email sent successfully')
    except Exception as e:
        return HttpResponse(f'Failed to send email: {e}')