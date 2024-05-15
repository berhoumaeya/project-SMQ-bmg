from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from ..serializers.serializers1 import *
from django.db import transaction
from ..modelsRH.models1 import*
from django.contrib.auth.decorators import login_required
from django.http import FileResponse


def get_piece_jointe(request, fiche_id):
    fiche = get_object_or_404(FicheEmployee, id=fiche_id)
    piece_jointe_path = fiche.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_position(request, post_id):
    post = get_object_or_404(JobPost, id=post_id)
    piece_jointe_path = post.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')
#Afficher tout les JobPost


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardJobPostAPIView(APIView):
        
        def get(self, request):
            posts = JobPost.objects.all()
            data = []
            for post in posts:
                post_data = {
                    'id': post.id,
                    'title': post.title,
                    'position': post.position,
                    'main_mission': post.main_mission,
                }
                data.append(post_data)
            return Response(data, status=status.HTTP_200_OK)


# Ajouter JobPost

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateJobPostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = JobPostSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            job_post_data = serializer.data
            job_post_data['created_by'] = request.user.first_name
            job_post_data['created_at'] = created_at
            job_post_data['id'] = serializer.instance.id 
            return Response(job_post_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier JobPost

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateJobPostAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        jobpost = get_object_or_404(JobPost, pk=pk)
        serializer = JobPostSerializer(jobpost, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            job_post_data = serializer.data
            job_post_data['updated_by'] = request.user.first_name
            job_post_data['updated_at'] = updated_at
            return Response(job_post_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher JobPost
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularJobPostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        jobpost = get_object_or_404(JobPost, pk=pk)
        serializer = JobPostSerializer(jobpost)
        serialized_data = serializer.data
        serialized_data['created_by'] = jobpost.created_by.first_name 
        serialized_data['updated_by'] = jobpost.updated_by.first_name if jobpost.updated_by else None
        serialized_data['created_at'] = jobpost.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = jobpost.updated_at.strftime('%Y-%m-%d %H:%M:%S') if jobpost.updated_at else None
        return Response(serialized_data)
    
# Supprimer JobPost
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteJobPostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        jobpost = get_object_or_404(JobPost, pk=pk)
        jobpost.delete()
        return Response({"message": "Le poste a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
#Afficher Departments


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardDepartmentAPIView(APIView):
        
        def get(self, request):
            deps = Department.objects.all()
            data = []
            for dep in deps:
                created_by_name = dep.created_by.first_name if dep.created_by else None
                updated_by_name = dep.updated_by.first_name if dep.updated_by else None
                dep_data = {
                    'id': dep.id,
                    'name': dep.name,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': dep.created_at,
                    'updated_at': dep.updated_at,
                }
                data.append(dep_data)
            return Response(data, status=status.HTTP_200_OK)
    
# Ajouter Department

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateDepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            dep_data = serializer.data
            dep_data['created_by'] = request.user.first_name
            dep_data['created_at'] = created_at
            dep_data['id'] = serializer.instance.id 
            return Response(dep_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Department

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateDepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        dep = get_object_or_404(Department, pk=pk)
        serializer = DepartmentSerializer(dep, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            dep_data = serializer.data
            dep_data['updated_by'] = request.user.first_name
            dep_data['updated_at'] = updated_at
            return Response(dep_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Department
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularDepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        dep = get_object_or_404(Department, pk=pk)
        serializer = DepartmentSerializer(dep)
        serialized_data = serializer.data
        serialized_data['created_by'] = dep.created_by.first_name 
        serialized_data['updated_by'] = dep.updated_by.first_name if dep.updated_by else None
        serialized_data['created_at'] = dep.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = dep.updated_at.strftime('%Y-%m-%d %H:%M:%S') if dep.updated_at else None
        return Response(serialized_data)
    
# Supprimer Department


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteDepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        dep = get_object_or_404(Department, pk=pk)
        dep.delete()
        return Response({"message": "Department a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
#Afficher Address


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardAddressAPIView(APIView):
        
        def get(self, request):
            adds = Address.objects.all()
            data = []
            for add in adds:
                created_by_name = add.created_by.first_name if add.created_by else None
                updated_by_name = add.updated_by.first_name if add.updated_by else None
                add_data = {
                    'id': add.id,
                    'name': add.name,
                    'created_by': created_by_name,
                    'updated_by': updated_by_name,
                    'created_at': add.created_at,
                    'updated_at': add.updated_at,
                }
                data.append(add_data)
            return Response(data, status=status.HTTP_200_OK)
    

# Ajouter Address

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            address_data = serializer.data
            address_data['created_by'] = request.user.first_name
            address_data['created_at'] = created_at
            return Response(address_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier Address

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        address = get_object_or_404(Address, pk=pk)
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            address_data = serializer.data
            address_data['updated_by'] = request.user.first_name
            address_data['updated_at'] = updated_at
            return Response(address_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher Address
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        address = get_object_or_404(Address, pk=pk)
        serializer = AddressSerializer(address)
        serialized_data = serializer.data
        serialized_data['created_by'] = address.created_by.first_name 
        serialized_data['updated_by'] = address.updated_by.first_name if address.updated_by else None
        serialized_data['created_at'] = address.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = address.updated_at.strftime('%Y-%m-%d %H:%M:%S') if address.updated_at else None
        return Response(serialized_data)
    
# Supprimer Address


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        address = get_object_or_404(Address, pk=pk)
        address.delete()
        return Response({"message": "L address a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
#Afficher Fiches Employe


@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardFicheEmployeAPIView(APIView):
        
        def get(self, request):
            fiches = FicheEmployee.objects.all()
            data = []
            for fiche in fiches:

                fiche_data = {
                    'id': fiche.id,
                    'name': fiche.name,
                    'job_position': fiche.job_position.title,
                    'employe_concerne': fiche.employe_concerne.username,
                    # 'department': fiche.department.name,
                }
                data.append(fiche_data)
            return Response(data, status=status.HTTP_200_OK)  

# Ajouter Fiche Employe

@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateFicheEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        employes_sans_fiche = Employe.objects.exclude(id__in=FicheEmployee.objects.values_list('employe_concerne__id', flat=True))
        serializer = FicheEmployeSerializer(data=request.data,employes=employes_sans_fiche)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            fiche_employe_data = serializer.data
            fiche_employe_data['created_by'] = request.user.first_name
            fiche_employe_data['created_at'] = created_at
            return Response(fiche_employe_data, status=status.HTTP_201_CREATED)
        print("%%%%%",status)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Modifier fiche_employe

@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateFicheEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        fiche_employe = get_object_or_404(FicheEmployee, pk=pk)
        serializer = FicheEmployeSerializer(fiche_employe, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            fiche_employe_data = serializer.data
            fiche_employe_data['updated_by'] = request.user.first_name
            fiche_employe_data['updated_at'] = updated_at
            return Response(fiche_employe_data, status=status.HTTP_200_OK)
        print("%%%%%",status)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Afficher fiche_employe
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularFicheEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        fiche_employe = get_object_or_404(FicheEmployee, pk=pk)
        serializer = FicheEmployeSerializer(fiche_employe)
        serialized_data = serializer.data
        serialized_data['created_by'] = fiche_employe.created_by.first_name 
        serialized_data['updated_by'] = fiche_employe.updated_by.first_name if fiche_employe.updated_by else None 
        serialized_data['created_at'] = fiche_employe.created_at.strftime('%Y-%m-%d %H:%M:%S')
        serialized_data['updated_at'] = fiche_employe.updated_at.strftime('%Y-%m-%d %H:%M:%S') if fiche_employe.updated_at else None 
        return Response(serialized_data)
    
# Supprimer fiche_employe


@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteFicheEmployeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        fiche_employe = get_object_or_404(FicheEmployee, pk=pk)
        fiche_employe.delete()
        return Response({"message": "L fiche employe a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)