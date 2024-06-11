from rest_framework import serializers
from ..modelsRH.models3 import *

class CritereEvaluationSerializer(serializers.ModelSerializer):
    skills_requis = serializers.CharField(required=False)

    class Meta:
        model = CritereEvaluation
        fields = ['id', 'skills_acquis', 'skills_requis', 'note_acquis', 'note_requis']

    def validate(self, data):
        if 'skills_requis' not in data or not data['skills_requis']:
            data['skills_requis'] = data['skills_acquis']
        return data

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class EvaluationChaudSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationChaud
        fields = ['id','name','formation', 'date_realisation', 'criteres', 'coefficients', 'pieces_jointes']


class EvaluationFroidSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationFroid
        fields = ['id','name','formation', 'date_realisation', 'criteres', 'coefficients', 'pieces_jointes']



class EvaluationCompetenceSerializer(serializers.ModelSerializer):
    criteres = CritereEvaluationSerializer(many=True)

    class Meta:
        model = EvaluationCompetence
        fields = ['id', 'name', 'commentaires', 'pieces_jointes', 'employe_concerne', 'criteres','total_acquis','total_requis']

    def create(self, validated_data):
        criteres_data = validated_data.pop('criteres')
        evaluation = EvaluationCompetence.objects.create(**validated_data)
        for critere_data in criteres_data:
            critere_serializer = CritereEvaluationSerializer(data=critere_data)
            critere_serializer.is_valid(raise_exception=True)
            critere_serializer.save(competence=evaluation)
        self.calculate_score(evaluation)
        return evaluation

    def update(self, instance, validated_data):
        criteres_data = validated_data.pop('criteres')
        instance = super().update(instance, validated_data)
        instance.criteres.all().delete()
        for critere_data in criteres_data:
            critere_serializer = CritereEvaluationSerializer(data=critere_data)
            critere_serializer.is_valid(raise_exception=True)
            critere_serializer.save(competence=instance)
        self.calculate_score(instance)
        return instance

    def calculate_score(self, evaluation):
        criteres = evaluation.criteres.all()
        total_acquis = sum(critere.note_acquis for critere in criteres)
        total_requis = sum(critere.note_requis for critere in criteres)
        nombre_criteres = criteres.count()

        if nombre_criteres > 0:
            moyenne_acquis = total_acquis / nombre_criteres
            moyenne_requis = total_requis / nombre_criteres
        else:
            moyenne_acquis = 0
            moyenne_requis = 0

        evaluation.total_acquis = moyenne_acquis
        evaluation.total_requis = moyenne_requis
        evaluation.save()








class PlanActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAction
        fields = ['id','evaluation','description',]
