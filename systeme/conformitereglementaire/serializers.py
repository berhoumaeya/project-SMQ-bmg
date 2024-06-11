from rest_framework import serializers
from .models import ExigenceReglementaire

class FicheExigenceReglementaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExigenceReglementaire
        fields = ['id','nom', 'type_fiche', 'source', 'exigence_dec', 'type_decideur','nom_reglementation','applicable','plan_action','pieces_jointes']

    def validate(self, data):
        if data.get('exigence_dec'):
            if not data.get('nom_reglementation'):
                raise serializers.ValidationError({'nom_reglementation': 'Ce champ est requis lorsque exigence est True.'})
            if data.get('applicable') is None:
                raise serializers.ValidationError({'applicable': 'Ce champ est requis lorsque exigence est True.'})
        return data
