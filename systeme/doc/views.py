from django.http import FileResponse
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

def get_piece_jointe_demande(request, doc_id):
    doc = get_object_or_404(DemandDocument, id=doc_id)
    piece_jointe_path = doc.attached_file.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_docInt(request, doc_id):
    doc = get_object_or_404(DocInt, id=doc_id)
    piece_jointe_path = doc.fichier.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_docExt(request, doc_id):
    doc = get_object_or_404(DocExt, id=doc_id)
    piece_jointe_path = doc.fichier.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

#Créer demande
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDemandAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'redacteur'

    def post(self, request):
        serializer = DemandSerializer(data=request.data)
        
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            demande_data = serializer.data
            demande_data['created_by'] = request.user.first_name
            demande_data['created_at'] = created_at
            
            return Response(demande_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Gérer demande
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class DemandePendingAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'superviseur' 

    def get(self, request):
        demandes_pending = DemandDocument.objects.filter(statut='En attente')
        data = []
        for demande in demandes_pending:
            demande_data = {
                'id': demande.id,
                'type': demande.type,
                'document_object' : demande.document_object,
                'attached_file': demande.attached_file.url if demande.attached_file else None,
                'statut': demande.statut,
                'created_by': demande.created_by.first_name,
                'created_at': demande.created_at
            }
            data.append(demande_data)
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, document_id):
        statut = request.data.get('statut')

        if statut is None:
            return Response({"message": "Le nouveau statut est requis."}, status=status.HTTP_400_BAD_REQUEST)
        document = get_object_or_404(DemandDocument, pk=document_id)
        recipient_pk = document.created_by.pk 
        message = f"demande numéro {document_id} validé" if statut =='Validé' else f"demande numéro {document_id} refusé"
        serializer = NotificationSerializer(data={'recipient': recipient_pk, 'message': message})
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(sender=request.user)
            document.statut = statut
            if document.statut =='Validé':
                 document.save()
            else:
                document.delete()

            send_notification(request.user, document.created_by, message,created_at)

            if statut == 'Validé' :
                return Response({"message": f"La demande {document_id} a été validée avec succès."}, status=status.HTTP_200_OK)
            elif statut == 'Refusé' :
                return Response({"message": f"La demande {document_id} a été refusée."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Demande Accepté
@method_decorator(login_required(login_url='login'), name='dispatch')
class DocumentAcceptedAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'superviseur' 

    def get(self, request):
        demandes_pending = DemandDocument.objects.filter(statut='Validé')
        data = []
        for demande in demandes_pending:
            demande_data = {
                'id': demande.id,
                'type': demande.type,
                'document_object' : demande.document_object,
                'attached_file_url': demande.attached_file if demande.attached_file else None,
                'statut': demande.statut,
                'created_by': demande.created_by.first_name,
                'created_at': demande.created_at
            }
            data.append(demande_data)
        return Response(data, status=status.HTTP_200_OK)
#créer document interne

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDocumentInterneAPIView(GroupRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'redacteur'

    def post(self, request, document_id):
        document = get_object_or_404(DemandDocument, pk=document_id)
        if document.statut =='Validé':
            
            serializer = DocumentInterneSerializer(data=request.data)
            if serializer.is_valid():
                document_type = document.type
                created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
                serializer.validated_data['created_at'] = created_at
                serializer.validated_data['type'] = document_type
                serializer.save(selection_redacteur=request.user)
                data = serializer.data
                data['selection_redacteur'] = request.user.first_name
                data['created_at'] = created_at
                document.statut = 'terminé'
                document.delete()
                
                return Response(data, status=status.HTTP_201_CREATED)
            
            errors_json = json.dumps(serializer.errors, indent=4)
            print(errors_json)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Impossible de créer le document. La demande associée n'est pas validée."}, status=status.HTTP_400_BAD_REQUEST)
        

@method_decorator(login_required(login_url='login'), name='dispatch')
class DocumentVerifAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'verificateur'

    def get(self, request):
        doc_pending = DocInt.objects.filter(statut='En cours')    
        data = []
        for demande in doc_pending:
            informees = [user.first_name for user in demande.liste_informee.all()]
            demande_data = {
                'id': demande.id,
                'libelle': demande.libelle,
                'type' : demande.type,
                'selection_site' : demande.selection_site,
                'selection_activite' : demande.selection_activite,
                'fichier': demande.fichier.url if demande.fichier else None,
                'statut': demande.statut,
                'selection_redacteur': demande.selection_redacteur.first_name,
                'selection_verificateur': demande.selection_verificateur.first_name,
                'selection_approbateur': demande.selection_approbateur.first_name,
                'liste_informee': informees,
                'created_at': demande.created_at
            }
            data.append(demande_data)
        return Response(data, status=status.HTTP_200_OK)
    
    def put(self, request, document_id):
        statut = request.data.get('statut')

        if statut is None or statut not in ['En cours', 'Vérifié']:
            return Response({"message": "Le nouveau statut est requis et doit être 'Rejeté' ou 'Vérifié'."}, status=status.HTTP_400_BAD_REQUEST)
        document = get_object_or_404(DocInt, pk=document_id)
        recipient_pk = document.selection_redacteur.pk 
        message = f"document numéro {document_id} Vérifié" if statut else f"document numéro {document_id} Rejeté"
        serializer = NotificationSerializer(data={'recipient': recipient_pk, 'message': message})
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(sender=request.user)
            document.statut = statut
            document.save()
            send_notification(request.user, document.selection_redacteur, message,created_at)
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
        doc_pending = DocInt.objects.filter(statut='Vérifié')
        data = []
        for demande in doc_pending:
            informees = [user.first_name for user in demande.liste_informee.all()]
            demande_data = {
                'id': demande.id,
                'libelle': demande.libelle,
                'type' : demande.type,
                'selection_site' : demande.selection_site,
                'selection_activite' : demande.selection_activite,
                'fichier': demande.fichier.url if demande.fichier else None,
                'statut': demande.statut,
                'selection_redacteur': demande.selection_redacteur.first_name,
                'selection_verificateur': demande.selection_verificateur.first_name,
                'selection_approbateur': demande.selection_approbateur.first_name,
                'liste_informee': informees,
                'created_at': demande.created_at
            }
            data.append(demande_data)
        return Response(data, status=status.HTTP_200_OK)
    

    def put(self, request,document_id):
        statut = request.data.get('statut')

        if statut is None or statut not in ['En attente', 'Approuvé']:
            return Response({"message": "Le nouveau statut est requis et doit être 'Rejeté' ou 'Approuvé'."}, status=status.HTTP_400_BAD_REQUEST)
        document = get_object_or_404(DocInt, pk=document_id)
        recipient_pk = document.selection_redacteur.pk 
        message = f"document numéro {document_id} Approuvé" if statut else f"document numéro {document_id} Rejeté"
        serializer = NotificationSerializer(data={'recipient': recipient_pk, 'message': message})
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(sender=request.user)
            document.statut = statut
            document.save()
            send_notification(request.user, document.selection_redacteur, message,created_at)
            if statut == 'Approuvé':
                return Response({"message": f"Le document {document_id} a été validé avec succès."}, status=status.HTTP_200_OK)
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
class DocIntDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        doc = get_object_or_404(DocInt, pk=pk)
        created_by_name = doc.selection_redacteur.first_name if doc.selection_redacteur else None
        updated_by_name = doc.updated_by.first_name if doc.updated_by else None
        created_at_str = doc.created_at.strftime('%Y-%m-%d %H:%M:%S') if doc.created_at else None
        updated_at_str = doc.updated_at.strftime('%Y-%m-%d %H:%M:%S') if doc.updated_at else None
        data = {
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
    
#historique
    
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
                'liste_informee': [user.first_name for user in doc_int_instance.liste_informee.all()],
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
                'lieu_classement': version.lieu_classement,
                'duree_classement': version.duree_classement,
                'liste_informee': [user.username for user in doc_int_instance.liste_informee.all()],
                'created_at': version.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'updated_at': version.updated_at.strftime('%Y-%m-%d %H:%M:%S') if version.updated_at else None,
                'updated_by': version.updated_by.first_name if version.updated_by else None,
            }
            versions_data.append(version_data)
        
        return Response(versions_data)
    
#Un doc Externe

@method_decorator(login_required(login_url='login'), name='dispatch')
class DocExtDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        doc = get_object_or_404(DocExt, pk=pk)
        created_by_name = doc.created_by.first_name if doc.created_by else None
        updated_by_name = doc.updated_by.first_name if doc.updated_by else None
        created_at_str = doc.created_at.strftime('%Y-%m-%d %H:%M:%S') if doc.created_at else None
        updated_at_str = doc.updated_at.strftime('%Y-%m-%d %H:%M:%S') if doc.updated_at else None
        data = {
            'id': doc.id,
                'designation': doc.designation,
                'type': doc.type if doc.type else None,
                'fichier': doc.fichier.url if doc.fichier else None,
                'lieu_classement': doc.lieu_classement,
                'duree_classement': doc.duree_classement ,
                'created_by': created_by_name,
                'liste_informee': [user.first_name for user in doc.liste_informee.all()],
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
        }
        return Response(data, status=status.HTTP_200_OK)
    

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
                'designation':doc.designation,
                'fichier': doc.fichier.url if doc.fichier else None,
                'lieu_classement': doc.lieu_classement,
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
