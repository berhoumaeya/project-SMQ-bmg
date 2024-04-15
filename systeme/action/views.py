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


#Tout Action

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        actions = ActionPrincipale.objects.all()
        data = []
        for action in actions:
            created_by_name = action.created_by.first_name if action.created_by else None
            updated_by_name = action.updated_by.first_name if action.updated_by else None
            created_at_str = action.created_at.strftime('%Y-%m-%d %H:%M:%S') if action.created_at else None
            updated_at_str = action.updated_at.strftime('%Y-%m-%d %H:%M:%S') if action.updated_at else None
            action_data = {
                'id': action.id,
                'nom': action.nom_action,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(action_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un Action
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ActionPrincipaleSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            action_data = serializer.data
            action_data['created_by'] = request.user.first_name
            action_data['created_at'] = created_at
            action_data['id'] = serializer.instance.id 
            return Response(action_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un Action
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateActionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        action = get_object_or_404(ActionPrincipale, pk=pk)
        serializer = ActionPrincipaleSerializer(action, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            action.save()
            action_data = serializer.data
            action_data['updated_by'] = request.user.first_name
            action_data['updated_at'] = updated_at
            return Response(action_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un Fournisseur
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        action = get_object_or_404(ActionPrincipale, pk=pk)
        serializer = ActionPrincipaleSerializer(action)
        serialized_data = serializer.data
        serialized_data['created_by'] = action.created_by.first_name 
        serialized_data['updated_by'] = action.updated_by.first_name 
        serialized_data['created_at'] = action.created_at.strftime('%Y-%m-%d %H:%M:%S') if action.created_at else None
        serialized_data['updated_at'] = action.updated_at.strftime('%Y-%m-%d %H:%M:%S') if action.updated_at else None
        return Response(serialized_data)

# Supprimer un Action
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        action = get_object_or_404(ActionPrincipale, pk=pk)
        action.delete()
        return Response({"message": "L action a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
#all sous Actions
method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardSousActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sous_actions = SousAction.objects.all()
        data = []
        for sous_action in sous_actions:
            created_by_name = sous_action.created_by.first_name if sous_action.created_by else None
            updated_by_name = sous_action.updated_by.first_name if sous_action.updated_by else None
            created_at_str = sous_action.created_at.strftime('%Y-%m-%d %H:%M:%S') if sous_action.created_at else None
            updated_at_str = sous_action.updated_at.strftime('%Y-%m-%d %H:%M:%S') if sous_action.updated_at else None
            sous_action_data = {
                'id': sous_action.id,
                'nom': sous_action.nom_sous_action,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(sous_action_data)
        return Response(data, status=status.HTTP_200_OK)

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateSousActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SousActionSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            sous_action_data = serializer.data
            sous_action_data['created_by'] = request.user.first_name
            sous_action_data['created_at'] = created_at
            sous_action_data['id'] = serializer.instance.id 
            return Response(sous_action_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateSousActionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        sous_action = get_object_or_404(SousAction, pk=pk)
        serializer = SousActionSerializer(sous_action, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            sous_action.save()
            sous_action_data = serializer.data
            sous_action_data['updated_by'] = request.user.first_name
            sous_action_data['updated_at'] = updated_at
            return Response(sous_action_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularSousActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        sous_action = get_object_or_404(SousAction, pk=pk)
        serializer = SousActionSerializer(sous_action)
        serialized_data = serializer.data
        serialized_data['created_by'] = sous_action.created_by.first_name 
        serialized_data['updated_by'] = sous_action.updated_by.first_name 
        serialized_data['created_at'] = sous_action.created_at.strftime('%Y-%m-%d %H:%M:%S') if sous_action.created_at else None
        serialized_data['updated_at'] = sous_action.updated_at.strftime('%Y-%m-%d %H:%M:%S') if sous_action.updated_at else None
        return Response(serialized_data)

@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteSousActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        sous_action = get_object_or_404(SousAction, pk=pk)
        sous_action.delete()
        return Response({"message": "La sous-action a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

# Vue pour afficher toutes les actions de clôture
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardClotureActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cloture_actions = ClotureAction.objects.all()
        data = []
        for cloture_action in cloture_actions:
            created_by_name = cloture_action.created_by.first_name if cloture_action.created_by else None
            updated_by_name = cloture_action.updated_by.first_name if cloture_action.updated_by else None
            created_at_str = cloture_action.created_at.strftime('%Y-%m-%d %H:%M:%S') if cloture_action.created_at else None
            updated_at_str = cloture_action.updated_at.strftime('%Y-%m-%d %H:%M:%S') if cloture_action.updated_at else None
            cloture_action_data = {
                'id': cloture_action.id,
                'nom': cloture_action.nom_cloture_action,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(cloture_action_data)
        return Response(data, status=status.HTTP_200_OK)

# Vue pour créer une nouvelle action de clôture
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateClotureActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ClotureActionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour mettre à jour une action de clôture existante
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateClotureActionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        cloture_action = get_object_or_404(ClotureAction, pk=pk)
        serializer = ClotureActionSerializer(cloture_action, data=request.data)
        if serializer.is_valid():
            serializer.save(updated_by=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour afficher une action de clôture spécifique
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularClotureActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        cloture_action = get_object_or_404(ClotureAction, pk=pk)
        serializer = ClotureActionSerializer(cloture_action)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Vue pour supprimer une action de clôture existante
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteClotureActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        cloture_action = get_object_or_404(ClotureAction, pk=pk)
        cloture_action.delete()
        return Response({"message": "L'action de clôture a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)
