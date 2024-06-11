from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Risque, CritereEvaluation
from .serializers import RisqueSerializer, CritereEvaluationSerializer

def get_piece_jointe_risk(request, risk_id):
    doc = get_object_or_404(Risque, id=risk_id)
    piece_jointe_path = doc.piece_jointe.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

@method_decorator(login_required(login_url='login'), name='dispatch')
class RisqueListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = RisqueSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            risk_data = serializer.data
            risk_data['created_by'] = request.user.first_name
            risk_data['created_at'] = created_at
            return Response(risk_data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        risques = Risque.objects.all()
        data = []
        for risk in risques:
            created_by_name = risk.created_by.first_name if risk.created_by else None
            updated_by_name = risk.updated_by.first_name if risk.updated_by else None
            created_at_str = risk.created_at.strftime('%Y-%m-%d %H:%M:%S') if risk.created_at else None
            updated_at_str = risk.updated_at.strftime('%Y-%m-%d %H:%M:%S') if risk.updated_at else None
            criteres_serializer = CritereEvaluationSerializer(risk.criteres.all(), many=True)
            risk_data = {
                'id': risk.id,
                'nom': risk.nom_risk,
                'date_declaration': risk.date_declaration,
                'declencheur': risk.declencheur,
                'liste_concernee': risk.liste_concernee,
                'type_risque': risk.type_risque,
                'criteres': criteres_serializer.data,
                'methode_calcul': risk.methode_calcul,
                'piece_jointe': risk.piece_jointe.url if risk.piece_jointe else None,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(risk_data)
        return Response(data, status=status.HTTP_200_OK)
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class RisqueRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self, id):
        try:
            return Risque.objects.get(id=id)
        except Risque.DoesNotExist:
            return None

    def get(self, request, id):
        risque = self.get_object(id)
        if risque is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RisqueSerializer(risque)
        serialized_data = serializer.data
        serialized_data['created_by'] = risque.created_by.first_name 
        serialized_data['updated_by'] = risque.updated_by.first_name if risque.updated_by else None
        serialized_data['created_at'] = risque.created_at.strftime('%Y-%m-%d %H:%M:%S') 
        serialized_data['updated_at'] = risque.updated_at.strftime('%Y-%m-%d %H:%M:%S') if risque.updated_at else None
        return Response(serializer.data)

    def put(self, request, id):
        risque = self.get_object(id)
        if risque is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RisqueSerializer(risque, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            risk_data = serializer.data
            risk_data['updated_by'] = request.user.first_name
            risk_data['updated_at'] = updated_at
            return Response(risk_data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        risque = self.get_object(id)
        if risque is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        risque.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class CritereEvaluationListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, risque_id):
        serializer = CritereEvaluationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(risque_id=risque_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@method_decorator(login_required(login_url='login'), name='dispatch')
class CritereEvaluationRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self, id):
        try:
            return CritereEvaluation.objects.get(id=id)
        except CritereEvaluation.DoesNotExist:
            return None

    def get(self, request, id):
        critere = self.get_object(id)
        if critere is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CritereEvaluationSerializer(critere)
        return Response(serializer.data)

    def put(self, request, id):
        critere = self.get_object(id)
        if critere is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CritereEvaluationSerializer(critere, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        critere = self.get_object(id)
        if critere is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        critere.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
