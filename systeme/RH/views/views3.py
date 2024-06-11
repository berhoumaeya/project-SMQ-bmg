from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from ..serializers.serializers3 import *
from ..modelsRH.models3 import*
from django.contrib.auth.decorators import login_required
from django.http import FileResponse


#Afficher Evaluations Chaud


def get_piece_jointe_chaud(request, chaud_id):
    chaud = get_object_or_404(EvaluationChaud, id=chaud_id)
    piece_jointe_path = chaud.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_froid(request, froid_id):
    froid = get_object_or_404(EvaluationFroid, id=froid_id)
    piece_jointe_path = froid.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEvaluationChaudAPIView(APIView):
        
        def get(self, request):
            chauds = EvaluationChaud.objects.all()
            data = []
            for chaud in chauds:
                created_by_name = chaud.created_by.first_name if chaud.created_by else None
                updated_by_name = chaud.updated_by.first_name if chaud.updated_by else None
                chaud_data = {
                    'id': chaud.id,
                    'name': chaud.name,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': chaud.created_at,
                    'updated_at': chaud.updated_at,
                }
                data.append(chaud_data)
            return Response(data, status=status.HTTP_200_OK) 
        
# Ajouter Evaluation Chaud

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEvaluationChaudAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EvaluationChaudSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            evaluation_chaud_data = serializer.data
            evaluation_chaud_data['created_by'] = request.user.first_name
            evaluation_chaud_data['created_at'] = created_at
            return Response(evaluation_chaud_data, status=status.HTTP_201_CREATED)
        print("%%%%%",status)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Evaluation Chaud

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEvaluationChaudAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        evaluation_Chaud = get_object_or_404(EvaluationChaud, pk=pk)
        serializer = EvaluationChaudSerializer(evaluation_Chaud, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            evaluation_Chaud_data = serializer.data
            evaluation_Chaud_data['updated_by'] = request.user.first_name
            evaluation_Chaud_data['updated_at'] = updated_at
            return Response(evaluation_Chaud_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher EvaluationChaud
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEvaluationChaudAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        evaluation_Chaud = get_object_or_404(EvaluationChaud, pk=pk)
        serializer = EvaluationChaudSerializer(evaluation_Chaud)
        serialized_data = serializer.data
        serialized_data['created_by'] = evaluation_Chaud.created_by.first_name 
        serialized_data['updated_by'] = evaluation_Chaud.updated_by.first_name if evaluation_Chaud.updated_by else None
        serialized_data['created_at'] = evaluation_Chaud.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = evaluation_Chaud.updated_at.strftime('%Y-%m-%d %H:%M:%S') if evaluation_Chaud.updated_at else None
        return Response(serialized_data)
    
# Supprimer Evaluation Chaud


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEvaluationChaudAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        evaluation_Chaud = get_object_or_404(EvaluationChaud, pk=pk)
        evaluation_Chaud.delete()
        return Response({"message": "La Evaluation Chaud a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

#Afficher Evaluations Froid


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEvaluationFroidAPIView(APIView):
        permission_classes = [IsAuthenticated]
        
        def get(self, request):
            froids = EvaluationFroid.objects.all()
            data = []
            for froid in froids:
                created_by_name = froid.created_by.first_name if froid.created_by else None
                updated_by_name = froid.updated_by.first_name if froid.updated_by else None
                froid_data = {
                    'id': froid.id,
                    'name': froid.name,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': froid.created_at,
                    'updated_at': froid.updated_at,
                }
                data.append(froid_data)
            return Response(data, status=status.HTTP_200_OK) 

# Ajouter Evaluation Froid

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEvaluationFroidAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EvaluationFroidSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            evaluation_froid_data = serializer.data
            evaluation_froid_data['created_by'] = request.user.first_name
            evaluation_froid_data['created_at'] = created_at
            evaluation_froid_data['id'] = serializer.instance.id 
            return Response(evaluation_froid_data, status=status.HTTP_201_CREATED)
        
        print("%%%%%",status)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Evaluation Froid

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEvaluationFroidAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        evaluation_froid = get_object_or_404(EvaluationFroid, pk=pk)
        serializer = EvaluationFroidSerializer(evaluation_froid, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            evaluation_froid_data = serializer.data
            evaluation_froid_data['updated_by'] = request.user.first_name
            evaluation_froid_data['updated_at'] = updated_at
            return Response(evaluation_froid_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Evaluation Froid
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEvaluationFroidAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        evaluation_froid = get_object_or_404(EvaluationFroid, pk=pk)
        serializer = EvaluationFroidSerializer(evaluation_froid)
        serialized_data = serializer.data
        serialized_data['created_by'] = evaluation_froid.created_by.first_name 
        serialized_data['created_at'] = evaluation_froid.created_at.strftime('%Y-%m-%d %H:%M:%S')
        return Response(serialized_data)
    
# Supprimer Evaluation Froid


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEvaluationFroidAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        evaluation_froid = get_object_or_404(EvaluationFroid, pk=pk)
        evaluation_froid.delete()
        return Response({"message": "La Evaluation Froid a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

#Afficher Evaluations Competence


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEvaluationCompetenceAPIView(APIView):
        permission_classes = [IsAuthenticated]
        
        def get(self, request,pk):
            comp = get_object_or_404(Employe,pk=pk)
            competences = EvaluationCompetence.objects.filter(employe_concerne=pk)
            data = []
            for competence in competences:
                criteres_serializer = CritereEvaluationSerializer(competence.criteres.all(), many=True)

                competence_data = {
                    'id': competence.id,
                    'name': competence.name,
                    'commentaires': competence.commentaires,
                    'created_at': competence.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    'created_by': competence.created_by.first_name,
                    'criteres': criteres_serializer.data,
                    'total_acquis': competence.total_acquis,
                    'total_requis': competence.total_requis,
                    'pieces_jointes': competence.pieces_jointes.url if competence.pieces_jointes else None,
                }
                data.append(competence_data)
            return Response(data, status=status.HTTP_200_OK) 


# Ajouter Evaluation Competence

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEvaluationCompetenceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        empl = get_object_or_404(Employe, pk=pk)
        serializer = EvaluationCompetenceSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            evaluation = serializer.save(created_by=request.user, employe_concerne=empl)
            
            evaluation_competence_data = serializer.data
            evaluation_competence_data['created_by'] = request.user.first_name
            evaluation_competence_data['created_at'] = created_at

            # Vérifier si total_acquis < total_requis pour créer un PlanAction
            if evaluation.total_acquis < evaluation.total_requis:
                PlanAction.objects.create(
                    competence=evaluation,
                    description="Plan d'action automatique généré pour améliorer les compétences",
                    created_by=request.user,
                    created_at=created_at
                )

            return Response(evaluation_competence_data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Evaluation Competence

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEvaluationCompetenceAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        evaluation_competence = get_object_or_404(EvaluationCompetence, pk=pk)
        serializer = EvaluationCompetenceSerializer(evaluation_competence, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            evaluation_competence_data = serializer.data
            evaluation_competence_data['updated_by'] = request.user.first_name
            evaluation_competence_data['updated_at'] = updated_at
            return Response(evaluation_competence_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Evaluation Competence
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEvaluationCompetenceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        evaluation_competence = get_object_or_404(EvaluationCompetence, pk=pk)
        serializer = EvaluationCompetenceSerializer(evaluation_competence)
        serialized_data = serializer.data
        serialized_data['created_by'] = evaluation_competence.created_by.first_name if evaluation_competence.created_by else None
        serialized_data['updated_by'] = evaluation_competence.updated_by.first_name if evaluation_competence.updated_by else None
        serialized_data['created_at'] = evaluation_competence.created_at.strftime('%Y-%m-%d %H:%M:%S') if evaluation_competence.created_at else None
        serialized_data['updated_at'] = evaluation_competence.updated_at.strftime('%Y-%m-%d %H:%M:%S') if evaluation_competence.updated_at else None
        return Response(serialized_data)
    
# Supprimer Evaluation Competence


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEvaluationCompetenceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        evaluation_competence = get_object_or_404(EvaluationCompetence, pk=pk)
        evaluation_competence.delete()
        return Response({"message": "La Evaluation Competence a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardPlanActionAPIView(APIView):
        permission_classes = [IsAuthenticated]
        
        def get(self, request):
            competences = PlanAction.objects.all()
            data = []
            for competence in competences:
                created_by_name = competence.created_by.first_name if competence.created_by else None
                updated_by_name = competence.updated_by.first_name if competence.updated_by else None
                competence_data = {
                    'id': competence.id,
                    'description':competence.description,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': competence.created_at,
                    'updated_at': competence.updated_at,
                }
                data.append(competence_data)
            return Response(data, status=status.HTTP_200_OK) 

