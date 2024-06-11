from rest_framework import serializers
from .models import *

class IndicateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicateur
        fields = ['id','libelle', 'type_indicateur', 'processus_lie', 'axe_politique_qualite', 'type_resultat_attendu', 'date_debut', 'periodicite_indicateur', 'type_suivi', 'valeur_cible', 'limite_critique', 'piece_jointe']

class SuiviIndicateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuiviIndicateur
        fields = ['id', 'frequence', 'objectif', 'limite_critique', 'resultat', 'commentaire', 'piece_jointe']


