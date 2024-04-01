from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from ..serializers.serializers2 import *
from ..modelsRH.models2 import*
from django.contrib.auth.decorators import login_required

#Afficher Formation


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardFormationAPIView(APIView):
        
        def get(self, request):
            formations = Formation.objects.all()
            data = []
            for formation in formations:
                created_by_name = formation.created_by.first_name if formation.created_by else None
                updated_by_name = formation.updated_by.first_name if formation.updated_by else None
                formation_data = {
                    'id': formation.id,
                    'name': formation.intitule_formation,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': formation.created_at,
                    'updated_at': formation.updated_at,
                }
                data.append(formation_data)
            return Response(data, status=status.HTTP_200_OK)  


# Ajouter Formation

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FormationSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            formation_data = serializer.data
            formation_data['created_by'] = request.user.first_name
            formation_data['created_at'] = created_at
            formation_data['id'] = serializer.instance.id 
            return Response(formation_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Formation

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        formation = get_object_or_404(Formation, pk=pk)
        serializer = FormationSerializer(formation, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            formation_data = serializer.data
            formation_data['updated_by'] = request.user.first_name
            formation_data['updated_at'] = updated_at
            return Response(formation_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Formation
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        formation = get_object_or_404(Formation, pk=pk)
        serializer = FormationSerializer(formation)
        serialized_data = serializer.data
        serialized_data['created_by'] = formation.created_by.first_name 
        serialized_data['updated_by'] = formation.updated_by.first_name 
        serialized_data['created_at'] = formation.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = formation.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        return Response(serialized_data)
    
# Supprimer Formation


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        formation = get_object_or_404(Formation, pk=pk)
        formation.delete()
        return Response({"message": "La Formation a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
#Afficher Employes
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEmployeAPIView(APIView):
        
        def get(self, request):
            employes = Employe.objects.all()
            data = []
            for employe in employes:
                created_by_name = employe.created_by.first_name if employe.created_by else None
                updated_by_name = employe.updated_by.first_name if employe.updated_by else None
                employe_data = {
                    'id': employe.id,
                    'name': employe.username,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': employe.created_at,
                    'updated_at': employe.updated_at,
                }
                data.append(employe_data)
            return Response(data, status=status.HTTP_200_OK)  

# Ajouter Employe

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmployeSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            employe_data = serializer.data
            employe_data['created_by'] = request.user.first_name
            employe_data['created_at'] = created_at
            employe_data['id'] = serializer.instance.id 
            return Response(employe_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Employe

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        employe = get_object_or_404(Employe, pk=pk)
        serializer = EmployeSerializer(employe, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            employe_data = serializer.data
            employe_data['updated_by'] = request.user.first_name
            employe_data['updated_at'] = updated_at
            return Response(employe_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Employe
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        employe = get_object_or_404(Employe, pk=pk)
        serializer = EmployeSerializer(employe)
        serialized_data = serializer.data
        serialized_data['created_by'] = employe.created_by.first_name 
        serialized_data['updated_by'] = employe.updated_by.first_name 
        serialized_data['created_at'] = employe.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = employe.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        return Response(serialized_data)
    
# Supprimer Employe


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        employe = get_object_or_404(Employe, pk=pk)
        employe.delete()
        return Response({"message": "L Employe a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
#Afficher Participant
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardParticipantAPIView(APIView):
        
        def get(self, request):
            participants = Participant.objects.all()
            data = []
            for participant in participants:
                created_by_name = participant.created_by.first_name if participant.created_by else None
                updated_by_name = participant.updated_by.first_name if participant.updated_by else None
                participant_data = {
                    'id': participant.id,
                    'name': participant.username,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': participant.created_at,
                    'updated_at': participant.updated_at,
                }
                data.append(participant_data)
            return Response(data, status=status.HTTP_200_OK)  

# Ajouter Participant

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateParticipantAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ParticipantSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            participant_data = serializer.data
            participant_data['created_by'] = request.user.first_name
            participant_data['created_at'] = created_at
            participant_data['id'] = serializer.instance.id 
            return Response(participant_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Participant

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateParticipantAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        participant = get_object_or_404(Participant, pk=pk)
        serializer = ParticipantSerializer(participant, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            participant_data = serializer.data
            participant_data['updated_by'] = request.user.first_name
            participant_data['updated_at'] = updated_at
            return Response(participant_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Participant
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularParticipantAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        participant = get_object_or_404(Participant, pk=pk)
        serializer = ParticipantSerializer(participant)
        serialized_data = serializer.data
        serialized_data['created_by'] = participant.created_by.first_name 
        serialized_data['updated_by'] = participant.updated_by.first_name 
        serialized_data['created_at'] = participant.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = participant.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        return Response(serialized_data)
    
# Supprimer Participant


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteParticipantAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        participant = get_object_or_404(Participant, pk=pk)
        participant.delete()
        return Response({"message": "Le Participant a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
#Afficher Responsables Formation
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardResponsableFormationAPIView(APIView):
        
        def get(self, request):
            responsables_formation = ResponsableFormation.objects.all()
            data = []
            for responsable_formation in responsables_formation:
                created_by_name = responsable_formation.created_by.first_name if responsable_formation.created_by else None
                updated_by_name = responsable_formation.updated_by.first_name if responsable_formation.updated_by else None
                responsable_formation_data = {
                    'id': responsable_formation.id,
                    'name': responsable_formation.username,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': responsable_formation.created_at,
                    'updated_at': responsable_formation.updated_at,
                }
                data.append(responsable_formation_data)
            return Response(data, status=status.HTTP_200_OK)

# Ajouter Responsable Formation

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateResponsableFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ResponsableFormationSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            responsable_formation_data = serializer.data
            responsable_formation_data['created_by'] = request.user.first_name
            responsable_formation_data['created_at'] = created_at
            responsable_formation_data['id'] = serializer.instance.id 
            return Response(responsable_formation_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Responsable Formation

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateResponsableFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        responsable_formation = get_object_or_404(ResponsableFormation, pk=pk)
        serializer = ResponsableFormationSerializer(responsable_formation, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            ResponsableFormation_data = serializer.data
            ResponsableFormation_data['updated_by'] = request.user.first_name
            ResponsableFormation_data['updated_at'] = updated_at
            return Response(ResponsableFormation_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Responsable Formation
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularResponsableFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        responsable_formation = get_object_or_404(ResponsableFormation, pk=pk)
        serializer = ResponsableFormationSerializer(responsable_formation)
        serialized_data = serializer.data
        serialized_data['created_by'] = responsable_formation.created_by.first_name 
        serialized_data['updated_by'] = responsable_formation.updated_by.first_name 
        serialized_data['created_at'] = responsable_formation.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = responsable_formation.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        return Response(serialized_data)
    
# Supprimer Responsable Formation


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteResponsableFormationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        responsable_formation = get_object_or_404(ResponsableFormation, pk=pk)
        responsable_formation.delete()
        return Response({"message": "L ResponsableFormation a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

