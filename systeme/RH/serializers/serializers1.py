from rest_framework import serializers
from ..modelsRH.models1 import *


class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = ['id','title', 'position', 'main_mission', 'required_skills', 'main_activity', 'pieces_jointes']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id','name']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id','name','Street','City','State','Zip_code']


class FicheEmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FicheEmployee
        fields = ['id','name','job_position', 'work_mobile', 'work_phone', 'work_email', 'department', 'manager', 'coach', 'work_address', 'work_location', 'address', 'working_hours', 'bank_account_number', 'home_work_distance', 'martial_status', 'emergency_contact', 'emergency_phone', 'certificate_level', 'field_of_study', 'school', 'cnss', 'cin', 'pieces_jointes', 'employe_concerne']

    def __init__(self, *args, **kwargs):
            employes = kwargs.pop('employes', None)
            super(FicheEmployeSerializer, self).__init__(*args, **kwargs)
            if employes is not None:
                self.fields['employe_concerne'].queryset = employes
