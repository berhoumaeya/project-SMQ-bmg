from rest_framework import serializers
from .models import Audit,PlanAudit

class AuditSerializer(serializers.ModelSerializer):
     class Meta:
        model = Audit
        fields = ['id', 'reference_audit','designation', 'type_audit', 'date_debut_audit', 'date_fin_audit', 'document_reference','statut']
        
class PlanAuditSerializer(serializers.ModelSerializer):
     class Meta:
        model = PlanAudit
        fields = ['id', 'audit', 'designation', 'date', 'heure_debut', 'heure_fin', 'lieu', 'commentaires', 'personnes_concernees']