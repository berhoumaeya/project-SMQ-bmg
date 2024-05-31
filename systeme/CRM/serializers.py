from rest_framework import serializers
from .models import Client,ReclamationClient,SuggestionClient,Enquete

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['nom', 'type_client', 'code_client', 'raison_sociale', 'activite', 'type_client', 'categorie','pieces_jointes']


class ReclamationClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReclamationClient
        fields = ['id','code', 'description', 'type_reclamation', 'date_livraison', 'gravite', 'responsable_traitement', 'decisions', 'declencher_plan_action', 'reclamation_fournisseur', 'plan_action', 'fichier_pdf']


class EnqueteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquete
        fields = ['name_enquete', 'date_debut', 'date_fin', 'clients', 'type_questionnaire']


class SuggestionClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionClient
        fields = ['name','date', 'client_concerne', 'type_suggestion', 'description', 'receptionnaire', 'est_validee']