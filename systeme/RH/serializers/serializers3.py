from rest_framework import serializers
from ..modelsRH.models3 import *


class EvaluationChaudSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationChaud
        fields = ['name','formation', 'date_realisation', 'criteres', 'coefficients', 'pieces_jointes', 'participant']


class EvaluationFroidSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationFroid
        fields = ['name','formation', 'date_realisation', 'criteres', 'coefficients', 'pieces_jointes', 'responsable_formation']


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = ['name', 'niveau_requis']


class EvaluationCompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationCompetence
        fields = ['name','competence', 'niveau_acquis', 'commentaires','employe_concerne', 'pieces_jointes']

class PlanActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAction
        fields = ['evaluation','description',]
