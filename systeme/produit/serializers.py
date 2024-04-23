from rest_framework import serializers
from .models import *

class NonConformiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonConformite
        fields = ['id', 'date_detection', 'designation_produit_non_conforme', 'description_non_conformite',
                  'type_non_conformite', 'source_non_conformite', 'niveau_gravite', 'pieces_jointes', 
                  'personnes_a_notifier', 'produits_non_conformes']


class FicheNonConformiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FicheNonConformite
        fields = ['non_conformite', 'type_non_conformite', 'numero_OF', 'numero_O']

class FicheTraitementNonConformiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FicheTraitementNonConformite
        fields = ['non_conformite', 'date_traitement', 'cout_non_conformite', 'quantite_rejetee', 'valeur_quantite_rejetee', 'quantite_declassee', 'valeur_quantite_declassee', 'quantite_acceptee']


class FicheClotureNonConformiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FicheClotureNonConformite
        fields = ['non_conformite', 'traitement_produit_non_conforme', 'date_cloture', 'rapport_cloture']