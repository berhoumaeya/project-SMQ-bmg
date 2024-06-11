from django.core.exceptions import ValidationError
from django.db import models
from action.models import ActionPrincipale
from doc.models import DocExt
from django.contrib.auth.models import User

class ExigenceReglementaire(models.Model):

    nom = models.CharField(max_length=100, unique=True)
    TYPE_CHOICES = [
        ('Sécurité', 'Sécurité'),
        ('Environnement', 'Environnement'),
        ('Qualité', 'Qualité'),
        ('Autre', 'Autre'),
    ]
    type_fiche = models.CharField(max_length=50, choices=TYPE_CHOICES)
    source = models.ForeignKey(DocExt, on_delete=models.CASCADE, null=True)
    type_decideur = models.CharField(max_length=100)
    exigence_dec = models.BooleanField(default=False)
    nom_reglementation = models.CharField(max_length=100, blank=True, null=True)
    applicable = models.BooleanField(default=False)
    plan_action = models.ForeignKey(ActionPrincipale, on_delete=models.CASCADE, blank=True, null=True)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_conformité/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creer_com')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='modifier_com', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.nom

    def clean(self):
        if self.exigence_dec:
            if not self.nom_reglementation:
                raise ValidationError({'nom_reglementation': 'Ce champ est requis lorsque exigence est True.'})
            if self.applicable is None:
                raise ValidationError({'applicable': 'Ce champ est requis lorsque exigence est True.'})
            if not self.plan_action:
                raise ValidationError({'plan_action': 'Ce champ est requis lorsque exigence est True.'})
        super().clean()
