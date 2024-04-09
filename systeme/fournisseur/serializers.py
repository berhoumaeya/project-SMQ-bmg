from rest_framework import serializers
from .models import Fournisseur, ReclamationFournisseur, EvaluationFournisseur

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = ['code_fournisseur', 'nom', 'raison_sociale', 'adresse', 'numero_telephone', 'email', 'categorie', 'type_fournisseur', 'fournisseur_agree', 'pieces_jointes', 'periodicite_evaluation']

class ReclamationFournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReclamationFournisseur
        fields = ['numero_sequentiel', 'date_reclamation', 'nom_fournisseur', 'description', 'type_reclamation', 'gravite', 'designation', 'pieces_jointes', 'actions', 'reclamation_client']

class EvaluationFournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationFournisseur
        fields = ['fournisseur', 'type_produit', 'critere_evaluation', 'notes', 'commentaires', 'periodicite_evaluation']
