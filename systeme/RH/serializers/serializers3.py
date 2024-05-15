from rest_framework import serializers
from ..modelsRH.models3 import *


class EvaluationChaudSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationChaud
        fields = ['id','name','formation', 'date_realisation', 'criteres', 'coefficients', 'pieces_jointes']


class EvaluationFroidSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationFroid
        fields = ['id','name','formation', 'date_realisation', 'criteres', 'coefficients', 'pieces_jointes']



class EvaluationCompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationCompetence
        fields = ['id','name', 'skills_acquis','skills_requis', 'commentaires','employe_concerne', 'pieces_jointes']

class PlanActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAction
        fields = ['id','evaluation','description',]
