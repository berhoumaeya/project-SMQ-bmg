from rest_framework import serializers
from .models import DocInt,DocExt,DemandDocument
from django.contrib.auth.models import User


class DemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemandDocument
        fields = ['id','type','document_object','attached_file','statut']

class DocumentInterneSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocInt
        fields = ['id','libelle', 'type', 'fichier', 'selection_site', 'selection_activite'
                  , 'selection_verificateur', 'selection_approbateur', 'liste_informee','created_at','statut'
                   ]
        


class DocumentExterneSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocExt
        fields = ['id','type', 'designation', 'lieu_classement', 'duree_classement', 'liste_informee', 'fichier']