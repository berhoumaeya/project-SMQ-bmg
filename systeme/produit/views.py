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


# Afficher tous les Produit

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardProduitAPIView(APIView):

    def get(self, request):
        nonconformes = NonConformite.objects.all()
        data = []
        for non in nonconformes:
            created_by_name = non.created_by.first_name if non.created_by else None
            updated_by_name = non.updated_by.first_name if non.updated_by else None
            created_at_str = non.created_at.strftime('%Y-%m-%d %H:%M:%S') if non.created_at else None
            updated_at_str = non.updated_at.strftime('%Y-%m-%d %H:%M:%S') if non.updated_at else None
            non_data = {
                'id': non.id,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(non_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un Produit
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateProduitAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NonConformiteSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            risk_data = serializer.data
            risk_data['created_by'] = request.user.first_name
            risk_data['created_at'] = created_at
            risk_data['id'] = serializer.instance.id 
            return Response(risk_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un Produit
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateProduitAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        non = get_object_or_404(NonConformite, pk=pk)
        serializer = NonConformiteSerializer(non, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            non_data = serializer.data
            non_data['updated_by'] = request.user.first_name
            non_data['updated_at'] = updated_at
            return Response(non_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un Produit
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularProduitAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        non = get_object_or_404(NonConformite, pk=pk)
        serializer = NonConformiteSerializer(non)
        serialized_data = serializer.data
        serialized_data['created_by'] = non.created_by.first_name 
        serialized_data['updated_by'] = non.updated_by.first_name 
        serialized_data['created_at'] = non.created_at.strftime('%Y-%m-%d %H:%M:%S') if non.created_at else None
        serialized_data['updated_at'] = non.updated_at.strftime('%Y-%m-%d %H:%M:%S') if non.updated_at else None
        return Response(serialized_data)

# Supprimer un Produit
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteProduitAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        non = get_object_or_404(NonConformite, pk=pk)
        non.delete()
        return Response({"message": "Le fiche NonConformité a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

# Afficher tous les FicheNonConformite

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardFicheAPIView(APIView):

    def get(self, request):
        nonconformes = FicheNonConformite.objects.all()
        data = []
        for non in nonconformes:
            created_by_name = non.created_by.first_name if non.created_by else None
            updated_by_name = non.updated_by.first_name if non.updated_by else None
            created_at_str = non.created_at.strftime('%Y-%m-%d %H:%M:%S') if non.created_at else None
            updated_at_str = non.updated_at.strftime('%Y-%m-%d %H:%M:%S') if non.updated_at else None
            non_data = {
                'id': non.id,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(non_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un FicheNonConformite
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateFicheAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FicheNonConformiteSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            risk_data = serializer.data
            risk_data['created_by'] = request.user.first_name
            risk_data['created_at'] = created_at
            risk_data['id'] = serializer.instance.id 
            return Response(risk_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un Fiche
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateFicheAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        non = get_object_or_404(FicheNonConformite, pk=pk)
        serializer = FicheNonConformiteSerializer(non, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            non_data = serializer.data
            non_data['updated_by'] = request.user.first_name
            non_data['updated_at'] = updated_at
            return Response(non_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un Fiche
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularFicheAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        non = get_object_or_404(FicheNonConformite, pk=pk)
        serializer = NonConformiteSerializer(non)
        serialized_data = serializer.data
        serialized_data['created_by'] = non.created_by.first_name 
        serialized_data['updated_by'] = non.updated_by.first_name 
        serialized_data['created_at'] = non.created_at.strftime('%Y-%m-%d %H:%M:%S') if non.created_at else None
        serialized_data['updated_at'] = non.updated_at.strftime('%Y-%m-%d %H:%M:%S') if non.updated_at else None
        return Response(serialized_data)

# Supprimer un Fiche
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteFicheAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        non = get_object_or_404(FicheNonConformite, pk=pk)
        non.delete()
        return Response({"message": "Le fiche NonConformité a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

# Afficher tous les TraiterNonConformite

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardTraiterNonConformiteAPIView(APIView):

    def get(self, request):
        nonconformes = FicheTraitementNonConformite.objects.all()
        data = []
        for non in nonconformes:
            created_by_name = non.created_by.first_name if non.created_by else None
            updated_by_name = non.updated_by.first_name if non.updated_by else None
            created_at_str = non.created_at.strftime('%Y-%m-%d %H:%M:%S') if non.created_at else None
            updated_at_str = non.updated_at.strftime('%Y-%m-%d %H:%M:%S') if non.updated_at else None
            non_data = {
                'id': non.id,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(non_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un TraiterNonConformite
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateTraiterNonConformiteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FicheTraitementNonConformiteSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            risk_data = serializer.data
            risk_data['created_by'] = request.user.first_name
            risk_data['created_at'] = created_at
            risk_data['id'] = serializer.instance.id 
            return Response(risk_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un TraiterNonConformite
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateTraiterNonConformiteAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        non = get_object_or_404(FicheTraitementNonConformite, pk=pk)
        serializer = FicheTraitementNonConformiteSerializer(non, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            non_data = serializer.data
            non_data['updated_by'] = request.user.first_name
            non_data['updated_at'] = updated_at
            return Response(non_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un TraiterNonConformite
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularTraiterNonConformiteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        non = get_object_or_404(FicheTraitementNonConformite, pk=pk)
        serializer = FicheTraitementNonConformiteSerializer(non)
        serialized_data = serializer.data
        serialized_data['created_by'] = non.created_by.first_name 
        serialized_data['updated_by'] = non.updated_by.first_name 
        serialized_data['created_at'] = non.created_at.strftime('%Y-%m-%d %H:%M:%S') if non.created_at else None
        serialized_data['updated_at'] = non.updated_at.strftime('%Y-%m-%d %H:%M:%S') if non.updated_at else None
        return Response(serialized_data)

# Supprimer un TraiterNonConformite
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteTraiterNonConformiteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        non = get_object_or_404(FicheTraitementNonConformite, pk=pk)
        non.delete()
        return Response({"message": "Le fiche NonConformité a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)