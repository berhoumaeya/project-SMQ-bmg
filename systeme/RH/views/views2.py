from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status,permissions
from ..serializers.serializers2 import *
from ..modelsRH.models2 import*
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
import random
import string
from braces.views import GroupRequiredMixin
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import Group
from django.http import FileResponse


def get_piece_jointe_participant(request, participant_id):
    participant = get_object_or_404(Participant, id=participant_id)
    piece_jointe_path = participant.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_responsable(request, responsable_id):
    responsable = get_object_or_404(ResponsableFormation, id=responsable_id)
    piece_jointe_path = responsable.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_employe(request, employe_id):
    employe = get_object_or_404(Employe, id=employe_id)
    piece_jointe_path = employe.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_formation(request, formation_id):
    formation = get_object_or_404(Formation, id=formation_id)
    piece_jointe_path = formation.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

#Afficher Formation


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardFormationAPIView(APIView):
        permission_classes = [IsAuthenticated]
        def get(self, request):
            formations = Formation.objects.all()
            data = []
            for formation in formations:
                formation_data = {
                    'id': formation.id,
                    'intitule_formation': formation.intitule_formation,
                    'type_formation': formation.type_formation,
                    'theme_formation': formation.theme_formation,
                    'responsable_validation': formation.responsable_validation.nom,
                }
                data.append(formation_data)
            return Response(data, status=status.HTTP_200_OK)  


# Ajouter Formation

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateFormationAPIView(GroupRequiredMixin,APIView):
    permission_classes = [IsAuthenticated]
    group_required = 'Responsable RH'

    def post(self, request):
        serializer = FormationSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            formation_data = serializer.data
            formation_data['created_by'] = request.user.first_name
            formation_data['created_at'] = created_at
            return Response(formation_data, status=status.HTTP_201_CREATED)
        print("%%%%%",status)
        print(serializer.errors)
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
        serialized_data['created_by'] = formation.created_by.first_name if formation.created_by else None
        serialized_data['updated_by'] = formation.updated_by.first_name if formation.updated_by else None
        serialized_data['created_at'] = formation.created_at.strftime('%Y-%m-%d %H:%M:%S') if formation.created_at else None
        serialized_data['updated_at'] = formation.updated_at.strftime('%Y-%m-%d %H:%M:%S') if formation.updated_at else None
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
                employe_data = {
                    'id': employe.id,
                    'nom': employe.nom,
                    'prenom': employe.prenom,
                    'username': employe.username,
                    'email': employe.email,
                }
                data.append(employe_data)
            return Response(data, status=status.HTTP_200_OK)  

# Ajouter Employe


def generate_random_password():
    length = 10
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

@method_decorator(login_required(login_url='login'), name='dispatch')
class EmployeCreationView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def post(self, request, format=None):
        data = self.request.data
        nom = data.get('nom')
        prenom = data.get('prenom')
        username = data.get('username')
        email = data.get('email')
        created_by = request.user
        is_user = data.get('is_user')
        pieces_jointes = data.get('pieces_jointes')

        # if not (nom and prenom and username and email):
        #     return Response({'error': 'All required fields (nom, prenom, username, email) must be provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if is_user:
            password = generate_random_password()
            user = User.objects.create_user(username=email, password=password, first_name=prenom, last_name=nom)
        else:
            password = None
        Employe.objects.create(
            nom=nom,
            prenom=prenom,
            username=username,
            email=email,
            password=password, 
            created_by=created_by,
            updated_by=created_by,
            created_at=timezone.now(),
            updated_at=timezone.now(),
            is_user=is_user,
            pieces_jointes = pieces_jointes
        )
        if is_user:
            return Response({'success': 'Employé créé avec succès. Mot de passe : {}'.format(password)})
        else:
            return Response({'success': 'Employé créé avec succès.'})
    
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
                participant_data = {
                    'id': participant.id,
                    'nom': participant.nom,
                    'prenom': participant.prenom,
                    'username': participant.username,
                    'email': participant.email,
                }
                data.append(participant_data)
            return Response(data, status=status.HTTP_200_OK)  
        

# Ajouter Participant

@method_decorator(login_required(login_url='login'), name='dispatch')
class ParticipantCreationView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def post(self, request, format=None):
        data = self.request.data
        nom = data.get('nom')
        prenom = data.get('prenom')
        username = data.get('username')
        email = data.get('email')
        employe_id = data.get('employe')
        is_user = data.get('is_user')
        pieces_jointes = data.get('pieces_jointes')

        employe = get_object_or_404(Employe, pk=employe_id)

        if not (nom and prenom and username and email and employe_id):
            raise ValidationError("Tous les champs doivent être remplis.")

        if User.objects.filter(email=email).exists():
            raise ValidationError("Cet email est déjà utilisé.")

        # Créer le participant ou l'utilisateur
        if is_user:
            password = generate_random_password()
            user = User.objects.create_user(username=email, password=password, first_name=prenom, last_name=nom, email=email)
            participant_group = Group.objects.get(name='Participant')
            user.groups.add(participant_group)
        else:
            password = None

        Participant.objects.create(
            nom=nom,
            prenom=prenom,
            username=username,
            email=email,
            employe=employe,
            password=password, 
            created_by=request.user,
            created_at=timezone.now(),
            is_user=is_user ,
            pieces_jointes = pieces_jointes
        )

        if is_user:
            return Response({'success': 'Participant créé avec succès. Mot de passe : {}'.format(password)})
        else:
            return Response({'success': 'Participant créé avec succès.'})
    
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
        serialized_data['updated_by'] = participant.updated_by.first_name if participant.updated_by else None
        serialized_data['created_at'] = participant.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = participant.updated_at.strftime('%Y-%m-%d %H:%M:%S') if participant.updated_at else None
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
                    'nom': responsable_formation.nom,
                    'prenom': responsable_formation.prenom,
                    'username': responsable_formation.username,
                    'email': responsable_formation.email,
                }
                data.append(responsable_formation_data)
            return Response(data, status=status.HTTP_200_OK)

# Ajouter Responsable Formation

@method_decorator(login_required(login_url='login'), name='dispatch')
class ResponsableFormationCreationView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def post(self, request, format=None):
        data = self.request.data
        nom = data.get('nom')
        prenom = data.get('prenom')
        username = data.get('username')
        email = data.get('email')
        created_by = request.user
        is_user = data.get('is_user')
        pieces_jointes = data.get('pieces_jointes')
        
        if is_user:
            password = generate_random_password()
            user = User.objects.create_user(username=email, password=password, first_name=prenom, last_name=nom)
        else:
            password = None
        ResponsableFormation.objects.create(
            nom=nom,
            prenom=prenom,
            username=username,
            email=email,
            password=password, 
            created_by=created_by,
            updated_by=created_by,
            created_at=timezone.now(),
            updated_at=timezone.now(),
            is_user=is_user,
            pieces_jointes = pieces_jointes
        )
        if is_user:
            return Response({'success': 'Responsable Formation créé avec succès. Mot de passe : {}'.format(password)})
        else:
            return Response({'success': 'Responsable Formation créé avec succès.'})
    
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
    