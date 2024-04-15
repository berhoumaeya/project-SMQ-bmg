from rest_framework import serializers
from .models import ActionPrincipale,SousAction,ClotureAction

class ActionPrincipaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionPrincipale
        fields = ['nom_action', 'numero_sequentiel', 'designation', 'description', 'type_action', 'source_action','cause_action', 'gravite_action', 'priorite_action', 'responsable_validation', 'site', 'piece_jointe', 'plan']

class SousActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SousAction
        fields = ['nom_sous_action', 'action_principale', 'numero_sequentiel_sous_action', 'responsable_realisation','delai_realisation', 'responsable_suivi', 'delai_suivi', 'gravite_action', 'priorite_action', 'piece_jointe']

class ClotureActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClotureAction
        fields = ['nom_cloture_action','action_concerne', 'responsable_cloture', 'delai_cloture', 'efficacite_action', 'commentaire', 'piece_jointe']
