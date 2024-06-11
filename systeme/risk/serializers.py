from rest_framework import serializers
from .models import Risque, CritereEvaluation
from django.db.models import Avg


class CritereEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CritereEvaluation
        fields = ['id','nom', 'note']

class RisqueSerializer(serializers.ModelSerializer):
    criteres = CritereEvaluationSerializer(many=True)

    class Meta:
        model = Risque
        fields = ['id', 'nom_risk', 'date_declaration', 'declencheur', 'liste_concernee', 'type_risque', 'criteres']

    def create(self, validated_data):
        criteres_data = validated_data.pop('criteres')
        risque = Risque.objects.create(**validated_data)
        for critere_data in criteres_data:
            CritereEvaluation.objects.create(risque=risque, **critere_data)
        # Calcul de la méthode de calcul
        self.calculate_method(risque)
        return risque

    def update(self, instance, validated_data):
        criteres_data = validated_data.pop('criteres')
        instance = super().update(instance, validated_data)
        # Supprimer les anciens critères
        instance.criteres.all().delete()
        for critere_data in criteres_data:
            CritereEvaluation.objects.create(risque=instance, **critere_data)
        # Calcul de la méthode de calcul
        self.calculate_method(instance)
        return instance

    def calculate_method(self, instance):
        if instance.criteres.exists():
            moyenne_notes = instance.criteres.aggregate(Avg('note'))['note__avg']
            if moyenne_notes is not None:
                if moyenne_notes < 5:
                    instance.methode_calcul = 'MIN'
                elif moyenne_notes > 5:
                    instance.methode_calcul = 'MAX'
                else:
                    instance.methode_calcul = 'MOYENNE'
        instance.save()
