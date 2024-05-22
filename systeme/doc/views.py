from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import *
from .models import*
from user.serializers import NotificationSerializer
from django.contrib.auth.decorators import login_required
from braces.views import GroupRequiredMixin
from user.models import send_notification
import json

#Créer demande
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDemandAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'redacteur'

    def post(self, request):
        recipient_username = None
        selection_superviseur = request.data.get('selection_superviseur')
        if selection_superviseur:
            recipient_username = selection_superviseur
        else:
            recipient_username = request.data.get('recipient')

        try:
            recipient = User.objects.get(username=recipient_username)
        except User.DoesNotExist:
            return Response({"recipient": ["L'utilisateur spécifié n'existe pas."]}, status=status.HTTP_400_BAD_REQUEST)

        request.data['recipient'] = recipient.pk
        serializer2 = NotificationSerializer(data=request.data)
        serializer = DemandSerializer(data=request.data)
        if serializer.is_valid() and serializer2.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            client_data = serializer.data
            client_data['created_by'] = request.user.first_name
            client_data['created_at'] = created_at
            client_data['id'] = serializer.instance.id 
            client_data['statut'] = serializer.validated_data.get('is_validated', False)
            message = serializer2.validated_data.get('message')  
            serializer2.validated_data['created_at'] = created_at
            serializer2.save(sender=request.user)
            send_notification(request.user, recipient, message)  
            return Response(client_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class DocumentPendingAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'superviseur' 

    def get(self, request):
        fiches_pending = DemandDocument.objects.filter(is_validated=False)
        data = []
        for fiche in fiches_pending:
            fiche_data = {
                'id': fiche.id,
                'Type': fiche.type.type_de_document,
                'attached_file': fiche.attached_file if fiche.attached_file else None,
                'statut': fiche.is_validated,
                'created_by': fiche.created_by.first_name,
                'created_at': fiche.created_at
            }
            data.append(fiche_data)
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, document_id):
        is_validated = request.data.get('is_validated')

        if is_validated is None:
            return Response({"message": "Le nouveau statut est requis."}, status=status.HTTP_400_BAD_REQUEST)
        document = get_object_or_404(DemandDocument, pk=document_id)
        recipient_pk = document.created_by.pk 
        message = "validé" if is_validated else "refusé"
        serializer = NotificationSerializer(data={'recipient': recipient_pk, 'message': message})
        if serializer.is_valid():
            serializer.save(sender=request.user)
            document.is_validated = is_validated
            document.save()

            send_notification(request.user, document.created_by, message)

            if is_validated:
                return Response({"message": f"La demande {document_id} a été validée avec succès."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": f"La demande {document_id} a été refusée."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Demande Accepté
@method_decorator(login_required(login_url='login'), name='dispatch')
class DocumentAcceptedAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'superviseur' 

    def get(self, request):
        fiches_pending = DemandDocument.objects.filter(is_validated=True)
        data = []
        for fiche in fiches_pending:
            fiche_data = {
                'id': fiche.id,
                'Type': fiche.type.type_de_document,
                'attached_file': fiche.attached_file if fiche.attached_file else None,
                'statut': fiche.is_validated,
                'created_by': fiche.created_by.first_name,
                'created_at': fiche.created_at
            }
            data.append(fiche_data)
        return Response(data, status=status.HTTP_200_OK)
#créer document interne

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDocumentInterneAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'redacteur'

    def post(self, request):
        document_id = request.data.get('document_id')  
        document = get_object_or_404(DemandDocument, pk=document_id)
        if document.is_validated:
            serializer = DocumentInterneSerializer(data=request.data)
            if serializer.is_valid():
                created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
                serializer.validated_data['created_at'] = created_at
                serializer.save(selection_redacteur=request.user)
                client_data = serializer.data
                client_data['selection_redacteur'] = request.user.first_name
                client_data['created_at'] = created_at
                return Response(client_data, status=status.HTTP_201_CREATED)
            
            errors_json = json.dumps(serializer.errors, indent=4)
            print(errors_json)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Impossible de créer le document. La demande associé n'est pas validé."}, status=status.HTTP_400_BAD_REQUEST)
        

@method_decorator(login_required(login_url='login'), name='dispatch')
class DocumentVerifAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'verificateur'

    def get(self, request):
        fiches_pending = DocInt.objects.filter(statut='En attente')
        serializer = DocumentInterneSerializer(fiches_pending, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        document_id = request.data.get('document_id')
        statut = request.data.get('statut')

        if not document_id:
            return Response({"message": "L'ID du document est requis."}, status=status.HTTP_400_BAD_REQUEST)
        if statut is None or statut not in ['Rejeté', 'Vérifié']:
            return Response({"message": "Le nouveau statut est requis et doit être 'Rejeté' ou 'Vérifié'."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            document = get_object_or_404(DocInt, pk=document_id)
        except DocInt.DoesNotExist:
            return Response({"message": "Le document spécifié n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

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
            document.statut = statut
            document.save()
            send_notification(request.user, recipient, message)
            if statut == 'Vérifié':
                return Response({"message": f"Le document {document_id} a été validé avec succès."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": f"Le document {document_id} a été refusé."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@method_decorator(login_required(login_url='login'), name='dispatch')
class DocumentApprouveAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'approbateur'

    def get(self, request):
        fiches_pending = DocInt.objects.filter(statut='Vérifié')
        serializer = DocumentInterneSerializer(fiches_pending, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        document_id = request.data.get('document_id')
        statut = request.data.get('statut')

        if not document_id:
            return Response({"message": "L'ID du document est requis."}, status=status.HTTP_400_BAD_REQUEST)
        if statut is None or statut not in ['Rejeté', 'Approuvé']:
            return Response({"message": "Le nouveau statut est requis et doit être 'Rejeté' ou 'Approuvé'."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            document = get_object_or_404(DocInt, pk=document_id)
        except DocInt.DoesNotExist:
            return Response({"message": "Le document spécifié n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

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
            document.statut = statut
            document.save()
            send_notification(request.user, recipient, message)
            if statut == 'Approuvé':
                return Response({"message": f"Le document {document_id} a été Approuvé avec succès."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": f"Le document {document_id} a été refusé."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Afficher tous les Documents

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardDocIntAPIView(APIView):
    def get(self, request):
        docs = DocInt.objects.filter(statut='Approuvé')
        data = []
        for doc in docs:
            created_by_name = doc.selection_redacteur.first_name if doc.selection_redacteur else None
            updated_by_name = doc.updated_by.first_name if doc.updated_by else None
            created_at_str = doc.created_at.strftime('%Y-%m-%d %H:%M:%S') if doc.created_at else None
            updated_at_str = doc.updated_at.strftime('%Y-%m-%d %H:%M:%S') if doc.updated_at else None
            doc_data = {
                'id': doc.id,
                'libelle': doc.libelle,
                'type': doc.type if doc.type else None,
                'fichier': doc.fichier.url if doc.fichier else None,
                'selection_site': doc.selection_site if doc.selection_site else None,
                'selection_activite': doc.selection_activite if doc.selection_activite else None,
                'selection_redacteur': created_by_name,
                'selection_verificateur': doc.selection_verificateur.first_name if doc.selection_verificateur else None,
                'selection_approbateur': doc.selection_approbateur.first_name if doc.selection_approbateur else None,
                'liste_informee': [user.first_name for user in doc.liste_informee.all()],
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
                'statut': doc.statut,
            }
            data.append(doc_data)
        return Response(data, status=status.HTTP_200_OK)
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateDocAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        doc = get_object_or_404(DocInt.objects.all(), pk=pk)
        previous_version = doc.history.first()
        serializer = DocumentInterneSerializer(doc, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(created_by=request.user, updated_by=request.user)
            doc_data = serializer.data
            doc_data['updated_by'] = request.user.first_name
            doc_data['updated_at'] = updated_at
            return Response(doc_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Supprimer un Document interne
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteDocIntAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        fiche_risk = get_object_or_404(DocInt, pk=pk)
        fiche_risk.delete()
        return Response({"message": "Le document a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
class DocumentDetailsAPIView(APIView):
    def get(self, request, pk):
        doc_int_instance = DocInt.objects.get(pk=pk)
        
        versions = doc_int_instance.history.all().exclude(history_id=doc_int_instance.history.first().history_id)
        
        versions_data = []
        for version in versions:
            version_data = {
                'id': version.pk, 
                'libelle': version.libelle,
                'type': version.type,
                'fichier': version.fichier,
                'selection_site': version.selection_site,
                'selection_activite': version.selection_activite,
                'selection_redacteur': version.selection_redacteur.first_name,
                'selection_verificateur': version.selection_verificateur.first_name,
                'selection_approbateur': version.selection_approbateur.first_name,
                'liste_informee': [user.username for user in doc_int_instance.liste_informee.all()],
                'created_at': version.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'updated_at': version.updated_at.strftime('%Y-%m-%d %H:%M:%S') if version.updated_at else None,
                'updated_by': version.updated_by.first_name if version.updated_by else None,
                'statut': version.statut,
            }
            versions_data.append(version_data)
        
        return Response(versions_data)
    
#Créer Document externe

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDocumentExterneAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

            serializer = DocumentExterneSerializer(data=request.data)
            if serializer.is_valid():
                created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
                serializer.validated_data['created_at'] = created_at
                serializer.save(created_by=request.user)
                client_data = serializer.data
                client_data['created_by'] = request.user.first_name
                client_data['created_at'] = created_at
                return Response(client_data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# modifier document externe

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateExtDocAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        doc = get_object_or_404(DocExt.objects.all(), pk=pk)
        previous_version = doc.history.first()
        serializer = DocumentExterneSerializer(doc, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(created_by=request.user, updated_by=request.user)
            doc_data = serializer.data
            doc_data['updated_by'] = request.user.first_name
            doc_data['updated_at'] = updated_at
            return Response(doc_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DocumentExtDetailsAPIView(APIView):
    def get(self, request, pk):
        doc_int_instance = DocExt.objects.get(pk=pk)
        
        versions = doc_int_instance.history.all().exclude(history_id=doc_int_instance.history.first().history_id)
        
        versions_data = []
        
        for version in versions:
            version_data = {
                'id': version.pk, 
                'Designation': version.designation,
                'type': version.type,
                'fichier': version.fichier,
                'lieu_classement': version.lieu_classement.LIEU_CLASSEMENT_CHOICES,
                'duree_classement': version.duree_classement,
                'liste_informee': [user.username for user in doc_int_instance.liste_informee.all()],
                'created_at': version.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'updated_at': version.updated_at.strftime('%Y-%m-%d %H:%M:%S') if version.updated_at else None,
                'updated_by': version.updated_by.first_name if version.updated_by else None,
            }
            versions_data.append(version_data)
        
        return Response(versions_data)
    

# Afficher tous les Documents Ext

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardDocExtAPIView(APIView):
    def get(self, request):
        docs = DocExt.objects.all()
        data = []
        for doc in docs:
            created_by_name = doc.created_by.first_name 
            updated_by_name = doc.updated_by.first_name if doc.updated_by else None
            created_at_str = doc.created_at.strftime('%Y-%m-%d %H:%M:%S') if doc.created_at else None
            updated_at_str = doc.updated_at.strftime('%Y-%m-%d %H:%M:%S') if doc.updated_at else None
            doc_data = {
                'id': doc.id,
                'type': doc.type,
                'fichier': doc.fichier.url if doc.fichier else None,
                'lieu_classement': doc.lieu_classement.LIEU_CLASSEMENT_CHOICES,
                'duree_classement': doc.duree_classement,
                'liste_informee': [user.first_name for user in doc.liste_informee.all()],
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(doc_data)
        return Response(data, status=status.HTTP_200_OK)
    
# Supprimer un Document Externe
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteDocExtAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        fiche_risk = get_object_or_404(DocExt, pk=pk)
        fiche_risk.delete()
        return Response({"message": "Le document a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
