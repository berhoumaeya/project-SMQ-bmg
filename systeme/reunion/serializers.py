from rest_framework import serializers
from .models import Meeting, Decision

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ['id','date_previsionnelle', 'type_reunion', 'lieu', 'ordre_du_jour', 'participants', 'piece_jointe', 'commentaire']

class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = ['id','decision_text','action_prise','meeting']