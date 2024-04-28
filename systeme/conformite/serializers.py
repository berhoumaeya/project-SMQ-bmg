from rest_framework import serializers
from .models import FicheExigenceReglementaire

class FicheExigenceReglementaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = FicheExigenceReglementaire
        fields = ['id','nom', 'type_fiche', 'source', 'exigence', 'type_decideur']
