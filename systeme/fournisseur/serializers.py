from rest_framework import serializers
from .models import Fournisseur, ReclamationFournisseur, EvaluationFournisseur,TypeProduit

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = ['id','code_fournisseur', 'nom', 'raison_sociale', 'adresse', 'numero_telephone', 'email', 'categorie', 'type_fournisseur', 'fournisseur_agree', 'pieces_jointes', 'periodicite_evaluation']

class ReclamationFournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReclamationFournisseur
        fields = ['numero_sequentiel', 'date_reclamation', 'fournisseur', 'description', 'type_reclamation', 'gravite', 'designation', 'pieces_jointes', 'actions', 'reclamation_client']

class EvaluationFournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationFournisseur
        fields = ['id', 'type_produit', 'critere_evaluation', 'notes', 'commentaires']

class TypeProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeProduit
        fields = '__all__'
