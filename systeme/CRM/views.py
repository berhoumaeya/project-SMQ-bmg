from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import ClientSerializer,ReclamationClientSerializer,EnqueteSerializer,SuggestionClientSerializer
from .models import*
from django.contrib.auth.decorators import login_required


# Afficher tous les clients

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardClientAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        clients = Client.objects.all()
        data = []
        for client in clients:
            created_by_name = client.created_by.first_name if client.created_by else None
            updated_by_name = client.updated_by.first_name if client.updated_by else None
            created_at_str = client.created_at.strftime('%Y-%m-%d %H:%M:%S') if client.created_at else None
            updated_at_str = client.updated_at.strftime('%Y-%m-%d %H:%M:%S') if client.updated_at else None
            client_data = {
                'id': client.id,
                'nom': client.nom,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(client_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            client_data = serializer.data
            client_data['created_by'] = request.user.first_name
            client_data['created_at'] = created_at
            client_data['id'] = serializer.instance.id 
            return Response(client_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateClientAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        client = get_object_or_404(Client, pk=pk)
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            client_data = serializer.data
            client_data['updated_by'] = request.user.first_name
            client_data['updated_at'] = updated_at
            return Response(client_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        client = get_object_or_404(Client, pk=pk)
        serializer = ClientSerializer(client)
        serialized_data = serializer.data
        serialized_data['created_by'] = client.created_by.first_name if client.created_by else None
        serialized_data['updated_by'] = client.updated_by.first_name if client.updated_by else None
        serialized_data['created_at'] = client.created_at.strftime('%Y-%m-%d %H:%M:%S') if client.created_at else None
        serialized_data['updated_at'] = client.updated_at.strftime('%Y-%m-%d %H:%M:%S') if client.updated_at else None
        return Response(serialized_data)

# Supprimer un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        client = get_object_or_404(Client, pk=pk)
        client.delete()
        return Response({"message": "Le client a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

# Afficher toutes les réclamations clients
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        reclamations = ReclamationClient.objects.all()
        data = []
        for reclamation in reclamations:
            created_by_name = reclamation.created_by.first_name if reclamation.created_by else None
            updated_by_name = reclamation.updated_by.first_name if reclamation.updated_by else None
            created_at_str = reclamation.created_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.created_at else None
            updated_at_str = reclamation.updated_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.updated_at else None
            reclamation_data = {
                'id': reclamation.id,
                'code': reclamation.code,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(reclamation_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReclamationClientSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            reclamation_data = serializer.data
            reclamation_data['created_by'] = request.user.first_name
            reclamation_data['created_at'] = created_at
            reclamation_data['id'] = serializer.instance.id 
            return Response(reclamation_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        reclamation = get_object_or_404(ReclamationClient, pk=pk)
        serializer = ReclamationClientSerializer(reclamation, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            reclamation_data = serializer.data
            reclamation_data['updated_by'] = request.user.first_name
            reclamation_data['updated_at'] = updated_at
            return Response(reclamation_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        reclamation = get_object_or_404(ReclamationClient, pk=pk)
        serializer = ReclamationClientSerializer(reclamation)
        serialized_data = serializer.data
        serialized_data['created_by'] = reclamation.created_by.first_name if reclamation.created_by else None
        serialized_data['updated_by'] = reclamation.updated_by.first_name if reclamation.updated_by else None
        serialized_data['created_at'] = reclamation.created_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.created_at else None
        serialized_data['updated_at'] = reclamation.updated_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.updated_at else None
        return Response(serialized_data)

# Supprimer une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        reclamation = get_object_or_404(ReclamationClient, pk=pk)
        reclamation.delete()
        return Response({"message": "La réclamation a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
# Afficher toutes les enquêtes
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        enquetes = Enquete.objects.all()
        data = []
        for enquete in enquetes:
            created_by_name = enquete.created_by.first_name if enquete.created_by else None
            updated_by_name = enquete.updated_by.first_name if enquete.updated_by else None
            created_at_str = enquete.created_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.created_at else None
            updated_at_str = enquete.updated_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.updated_at else None
            enquete_data = {
                'reference': enquete.reference,
                'reference': enquete.reference,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(enquete_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EnqueteSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            enquete_data = serializer.data
            enquete_data['created_by'] = request.user.first_name
            enquete_data['created_at'] = created_at
            enquete_data['reference'] = serializer.instance.reference
            return Response(enquete_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        enquete = get_object_or_404(Enquete, pk=pk)
        serializer = EnqueteSerializer(enquete, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            enquete_data = serializer.data
            enquete_data['updated_by'] = request.user.first_name
            enquete_data['updated_at'] = updated_at
            return Response(enquete_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        enquete = get_object_or_404(Enquete, pk=pk)
        serializer = EnqueteSerializer(enquete)
        serialized_data = serializer.data
        serialized_data['created_by'] = enquete.created_by.first_name 
        serialized_data['updated_by'] = enquete.updated_by.first_name 
        serialized_data['created_at'] = enquete.created_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.created_at else None
        serialized_data['updated_at'] = enquete.updated_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.updated_at else None
        return Response(serialized_data)

# Supprimer une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        enquete = get_object_or_404(Enquete, pk=pk)
        enquete.delete()
        return Response({"message": "L'enquête a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)


# Afficher toutes les suggestions clients
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        suggestions = SuggestionClient.objects.all()
        data = []
        for suggestion in suggestions:
            created_by_name = suggestion.created_by.first_name if suggestion.created_by else None
            updated_by_name = suggestion.updated_by.first_name if suggestion.updated_by else None
            created_at_str = suggestion.created_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.created_at else None
            updated_at_str = suggestion.updated_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.updated_at else None
            suggestion_data = {
                'id': suggestion.id,
                'name': suggestion.name,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(suggestion_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SuggestionClientSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            suggestion_data = serializer.data
            suggestion_data['created_by'] = request.user.first_name
            suggestion_data['created_at'] = created_at
            suggestion_data['id'] = serializer.instance.id 
            return Response(suggestion_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        suggestion = get_object_or_404(SuggestionClient, pk=pk)
        serializer = SuggestionClientSerializer(suggestion, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            suggestion_data = serializer.data
            suggestion_data['updated_by'] = request.user.first_name
            suggestion_data['updated_at'] = updated_at
            return Response(suggestion_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        suggestion = get_object_or_404(SuggestionClient, pk=pk)
        serializer = SuggestionClientSerializer(suggestion)
        serialized_data = serializer.data
        serialized_data['created_by'] = suggestion.created_by.first_name 
        serialized_data['updated_by'] = suggestion.updated_by.first_name 
        serialized_data['created_at'] = suggestion.created_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.created_at else None
        serialized_data['updated_at'] = suggestion.updated_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.updated_at else None
        return Response(serialized_data)

# Supprimer une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        suggestion = get_object_or_404(SuggestionClient, pk=pk)
        suggestion.delete()
        return Response({"message": "La suggestion a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)


