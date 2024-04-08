from rest_framework import serializers
from .models import Risque

class RisqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risque
        fields = ['nom_risk','date_declaration', 'declencheur', 'liste_concernee', 'type_risque', 'criteres_evaluation']
