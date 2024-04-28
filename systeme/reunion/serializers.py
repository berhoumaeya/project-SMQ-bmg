from rest_framework import serializers
from .models import Meeting, Decision

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ['date_previsionnelle', 'type_reunion', 'lieu', 'ordre_du_jour', 'participants', 'piece_jointe', 'commentaire']

class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = ['decision_text', 'meeting', 'action_prise']