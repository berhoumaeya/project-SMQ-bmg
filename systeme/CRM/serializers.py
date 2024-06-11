from rest_framework import serializers
from .models import Client,ReclamationClient,SuggestionClient,ClientEnquete

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['nom', 'type_client', 'code_client', 'raison_sociale', 'activite', 'type_client', 'categorie','pieces_jointes']


class ReclamationClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReclamationClient
        fields = ['id','code', 'description', 'type_reclamation', 'date_livraison', 'gravite', 'responsable_traitement', 'decisions', 'declencher_plan_action', 'reclamation_fournisseur', 'plan_action', 'fichier_pdf','client']


class EnqueteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientEnquete
        fields = ['id','name_enquete','clients', 'date_debut', 'date_fin', 'type_questionnaire','pieces_jointes']


class SuggestionClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionClient
        fields = ['name','date', 'type_suggestion', 'description', 'receptionnaire', 'actions','pieces_jointes']