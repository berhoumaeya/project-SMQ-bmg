from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import *
from .models import*
from django.contrib.auth.decorators import login_required


#Tout fournisseur

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        fournisseurs = Fournisseur.objects.all()
        data = []
        for fournisseur in fournisseurs:
            created_by_name = fournisseur.created_by.first_name if fournisseur.created_by else None
            updated_by_name = fournisseur.updated_by.first_name if fournisseur.updated_by else None
            created_at_str = fournisseur.created_at.strftime('%Y-%m-%d %H:%M:%S') if fournisseur.created_at else None
            updated_at_str = fournisseur.updated_at.strftime('%Y-%m-%d %H:%M:%S') if fournisseur.updated_at else None
            fournisseur_data = {
                'id': fournisseur.id,
                'nom': fournisseur.nom,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(fournisseur_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un Fournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FournisseurSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            fournisseur_data = serializer.data
            fournisseur_data['created_by'] = request.user.first_name
            fournisseur_data['created_at'] = created_at
            fournisseur_data['id'] = serializer.instance.id 
            return Response(fournisseur_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un Fournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        fournisseur = get_object_or_404(Fournisseur, pk=pk)
        serializer = FournisseurSerializer(fournisseur, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            fournisseur.save()
            fournisseur_data = serializer.data
            fournisseur_data['updated_by'] = request.user.first_name
            fournisseur_data['updated_at'] = updated_at
            return Response(fournisseur_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un Fournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        fournisseur = get_object_or_404(Fournisseur, pk=pk)
        serializer = FournisseurSerializer(Fournisseur)
        serialized_data = serializer.data
        serialized_data['created_by'] = fournisseur.created_by.first_name 
        serialized_data['updated_by'] = fournisseur.updated_by.first_name 
        serialized_data['created_at'] = fournisseur.created_at.strftime('%Y-%m-%d %H:%M:%S') if fournisseur.created_at else None
        serialized_data['updated_at'] = fournisseur.updated_at.strftime('%Y-%m-%d %H:%M:%S') if fournisseur.updated_at else None
        return Response(serialized_data)

# Supprimer un Fournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        fournisseur = get_object_or_404(Fournisseur, pk=pk)
        fournisseur.delete()
        return Response({"message": "L Fournisseur a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    


#Tout Reclamationfournisseur

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardReclamationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        Reclamationfournisseurs = ReclamationFournisseur.objects.all()
        data = []
        for Reclamationfournisseur in Reclamationfournisseurs:
            created_by_name = Reclamationfournisseur.created_by.first_name if Reclamationfournisseur.created_by else None
            updated_by_name = Reclamationfournisseur.updated_by.first_name if Reclamationfournisseur.updated_by else None
            created_at_str = Reclamationfournisseur.created_at.strftime('%Y-%m-%d %H:%M:%S') if Reclamationfournisseur.created_at else None
            updated_at_str = Reclamationfournisseur.updated_at.strftime('%Y-%m-%d %H:%M:%S') if Reclamationfournisseur.updated_at else None
            Reclamationfournisseur_data = {
                'id': Reclamationfournisseur.id,
                'Numero_Sequentiel': Reclamationfournisseur.numero_sequentiel,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(Reclamationfournisseur_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un Reclamationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateReclamationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReclamationFournisseurSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            Reclamationfournisseur_data = serializer.data
            Reclamationfournisseur_data['created_by'] = request.user.first_name
            Reclamationfournisseur_data['created_at'] = created_at
            Reclamationfournisseur_data['id'] = serializer.instance.id 
            return Response(Reclamationfournisseur_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un Reclamationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateReclamationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        Reclamationfournisseur = get_object_or_404(ReclamationFournisseur, pk=pk)
        serializer = ReclamationFournisseurSerializer(Reclamationfournisseur, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            Reclamationfournisseur.save()
            Reclamationfournisseur_data = serializer.data
            Reclamationfournisseur_data['updated_by'] = request.user.first_name
            Reclamationfournisseur_data['updated_at'] = updated_at
            return Response(Reclamationfournisseur_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un Reclamationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularReclamationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        Reclamationfournisseur = get_object_or_404(ReclamationFournisseur, pk=pk)
        serializer = ReclamationFournisseurSerializer(Reclamationfournisseur)
        serialized_data = serializer.data
        serialized_data['created_by'] = Reclamationfournisseur.created_by.first_name 
        serialized_data['updated_by'] = Reclamationfournisseur.updated_by.first_name 
        serialized_data['created_at'] = Reclamationfournisseur.created_at.strftime('%Y-%m-%d %H:%M:%S') if Reclamationfournisseur.created_at else None
        serialized_data['updated_at'] = Reclamationfournisseur.updated_at.strftime('%Y-%m-%d %H:%M:%S') if Reclamationfournisseur.updated_at else None
        return Response(serialized_data)

# Supprimer un Reclamationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteReclamationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        Reclamationfournisseur = get_object_or_404(ReclamationFournisseur, pk=pk)
        Reclamationfournisseur.delete()
        return Response({"message": "L Fournisseur a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)



#Tout Reclamationfournisseur

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEvaluationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        Evaluationfournisseurs = EvaluationFournisseur.objects.all()
        data = []
        for Evaluationfournisseur in Evaluationfournisseurs:
            created_by_name = Evaluationfournisseur.created_by.first_name if Evaluationfournisseur.created_by else None
            updated_by_name = Evaluationfournisseur.updated_by.first_name if Evaluationfournisseur.updated_by else None
            created_at_str = Evaluationfournisseur.created_at.strftime('%Y-%m-%d %H:%M:%S') if Evaluationfournisseur.created_at else None
            updated_at_str = Evaluationfournisseur.updated_at.strftime('%Y-%m-%d %H:%M:%S') if Evaluationfournisseur.updated_at else None
            Evaluationfournisseur_data = {
                'id': Evaluationfournisseur.id,
                'Numero_Sequentiel': Evaluationfournisseur.numero_sequentiel,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(Evaluationfournisseur_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un Evaluationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEvaluationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EvaluationFournisseurSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            Evaluationfournisseur_data = serializer.data
            Evaluationfournisseur_data['created_by'] = request.user.first_name
            Evaluationfournisseur_data['created_at'] = created_at
            Evaluationfournisseur_data['id'] = serializer.instance.id 
            return Response(Evaluationfournisseur_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un Evaluationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEvaluationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        Evaluationfournisseur = get_object_or_404(EvaluationFournisseur, pk=pk)
        serializer = EvaluationFournisseurSerializer(Evaluationfournisseur, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            Evaluationfournisseur.save()
            Evaluationfournisseur_data = serializer.data
            Evaluationfournisseur_data['updated_by'] = request.user.first_name
            Evaluationfournisseur_data['updated_at'] = updated_at
            return Response(Evaluationfournisseur_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un Evaluationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEvaluationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        Evaluationfournisseur = get_object_or_404(EvaluationFournisseur, pk=pk)
        serializer = EvaluationFournisseurSerializer(Evaluationfournisseur)
        serialized_data = serializer.data
        serialized_data['created_by'] = Evaluationfournisseur.created_by.first_name 
        serialized_data['updated_by'] = Evaluationfournisseur.updated_by.first_name 
        serialized_data['created_at'] = Evaluationfournisseur.created_at.strftime('%Y-%m-%d %H:%M:%S') if Evaluationfournisseur.created_at else None
        serialized_data['updated_at'] = Evaluationfournisseur.updated_at.strftime('%Y-%m-%d %H:%M:%S') if Evaluationfournisseur.updated_at else None
        return Response(serialized_data)

# Supprimer un Evaluationfournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEvaluationFournisseurAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        Evaluationfournisseur = get_object_or_404(EvaluationFournisseur, pk=pk)
        Evaluationfournisseur.delete()
        return Response({"message": "L Evaluation a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)