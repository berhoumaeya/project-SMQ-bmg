from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import DocumentInterneSerializer,DemandSerializer
from .models import*
from user.serializers import NotificationSerializer
from user.models import Notification
from django.contrib.auth.decorators import login_required
from braces.views import GroupRequiredMixin
from django.contrib.auth.models import Group
from user.models import send_notification
from rest_framework import generics
from django.http import FileResponse



@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDemandAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'redacteur'

    def post(self, request):

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
class DocumentPendingAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'redacteur'

    def get(self, request):
        fiches_pending = DemandDocument.objects.filter(is_validated=False)
        serializer = DemandSerializer(fiches_pending, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        document_id = request.data.get('document_id')
        is_validated = request.data.get('is_validated')

        if not document_id or is_validated is None:
            return Response({"message": "L'ID du document et le nouveau statut sont requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            document = get_object_or_404(DemandDocument, pk=document_id)
        except DemandDocument.DoesNotExist:
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
            document.is_validated = is_validated
            document.save()
            send_notification(request.user, recipient, message)
            if is_validated:
                return Response({"message": f"Le document {document_id} a été validé avec succès."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": f"Le document {document_id} a été refusé."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
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
                client_data['id'] = serializer.instance.id 
                return Response(client_data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Impossible de créer le document. La demande associé n'est pas validé."}, status=status.HTTP_400_BAD_REQUEST)
        

class DocumentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = DocInt.objects.all()
    serializer_class = DocumentInterneSerializer

    def get(self, request, pk):
        document = get_object_or_404(DocInt, pk=pk)
        file_path = document.fichier.path
        return FileResponse(open(file_path, 'rb'))
