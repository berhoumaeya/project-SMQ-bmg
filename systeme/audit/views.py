from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import AuditSerializer,PlanAuditSerializer
from .models import*
from django.contrib.auth.decorators import login_required


# Afficher tous les audit

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardauditAPIView(APIView):

    def get(self, request):
        risques = Audit.objects.all()
        data = []
        for audit in risques:
            created_by_name = audit.demandeur.first_name if audit.demandeur else None
            updated_by_name = audit.updated_by.first_name if audit.updated_by else None
            created_at_str = audit.created_at.strftime('%Y-%m-%d %H:%M:%S') if audit.created_at else None
            updated_at_str = audit.updated_at.strftime('%Y-%m-%d %H:%M:%S') if audit.updated_at else None
            audit_data = {
                'id': audit.id,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(audit_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un audit
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateauditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AuditSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(demandeur=request.user)
            audit_data = serializer.data
            audit_data['demandeur'] = request.user.first_name
            audit_data['created_at'] = created_at
            return Response(audit_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un audit
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateauditAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        audit = get_object_or_404(Audit, pk=pk)
        serializer = AuditSerializer(audit, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(demandeur=request.user)
            audit_data = serializer.data
            audit_data['demandeur'] = request.user.first_name
            audit_data['updated_at'] = updated_at
            return Response(audit_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un audit
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularauditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        audit = get_object_or_404(Audit, pk=pk)
        serializer = AuditSerializer(audit)
        serialized_data = serializer.data
        serialized_data['demandeur'] = audit.demandeur.first_name 
        serialized_data['updated_by'] = audit.updated_by.first_name 
        serialized_data['created_at'] = audit.created_at.strftime('%Y-%m-%d %H:%M:%S') if audit.created_at else None
        serialized_data['updated_at'] = audit.updated_at.strftime('%Y-%m-%d %H:%M:%S') if audit.updated_at else None
        return Response(serialized_data)

# Supprimer un audit
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteauditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        fiche_audit = get_object_or_404(Audit, pk=pk)
        fiche_audit.delete()
        return Response({"message": "Le fiche audit a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

 #Afficher tous les audit

@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardPlanAuditAPIView(APIView):

    def get(self, request):
        risques = PlanAudit.objects.all()
        data = []
        for audit in risques:
            created_by_name = audit.created_by.first_name if audit.created_by else None
            updated_by_name = audit.updated_by.first_name if audit.updated_by else None
            created_at_str = audit.created_at.strftime('%Y-%m-%d %H:%M:%S') if audit.created_at else None
            updated_at_str = audit.updated_at.strftime('%Y-%m-%d %H:%M:%S') if audit.updated_at else None
            audit_data = {
                'id': audit.id,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(audit_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter un audit
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreatePlanAuditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PlanAuditSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            audit_data = serializer.data
            audit_data['created_by'] = request.user.first_name
            audit_data['created_at'] = created_at
            return Response(audit_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un audit
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdatePlanAuditAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        audit = get_object_or_404(PlanAudit, pk=pk)
        serializer = PlanAuditSerializer(audit, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(demandeur=request.user)
            audit_data = serializer.data
            audit_data['demandeur'] = request.user.first_name
            audit_data['updated_at'] = updated_at
            return Response(audit_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher un PlanAudit
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularPlanAuditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        audit = get_object_or_404(PlanAudit, pk=pk)
        serializer = AuditSerializer(audit)
        serialized_data = serializer.data
        serialized_data['created_by'] = audit.created_by.first_name 
        serialized_data['updated_by'] = audit.updated_by.first_name 
        serialized_data['created_at'] = audit.created_at.strftime('%Y-%m-%d %H:%M:%S') if audit.created_at else None
        serialized_data['updated_at'] = audit.updated_at.strftime('%Y-%m-%d %H:%M:%S') if audit.updated_at else None
        return Response(serialized_data)

# Supprimer un PlanAudit
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeletePlanAuditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        fiche_audit = get_object_or_404(PlanAudit, pk=pk)
        fiche_audit.delete()
        return Response({"message": "Le Plan audit a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)