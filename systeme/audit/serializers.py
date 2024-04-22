from rest_framework import serializers
from .models import Audit,PlanAudit

class AuditSerializer(serializers.ModelSerializer):
     class Meta:
        model = Audit
        fields = ['id', 'reference_audit','designation', 'champ_audit', 'type_audit',
                  'auditeurs', 'date_debut_audit', 'date_fin_audit', 'document_reference', 'audités',
                  'responsable_validation']
        
class PlanAuditSerializer(serializers.ModelSerializer):
     class Meta:
        model = PlanAudit
        fields = ['id', 'audit', 'designation', 'date', 'heure_debut', 'heure_fin', 'lieu', 'commentaires', 'personnes_concernees']