from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError



class Risque(models.Model):

    nom_risk = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='risk_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='risk_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    date_declaration = models.DateField(verbose_name="Date de déclaration du risque")
    declencheur = models.CharField(max_length=255, verbose_name="Déclencheur")
    liste_concernee = models.TextField(verbose_name="Liste concernée")
    TYPE_CHOICES = (
        ('MENACE', 'Menace'),
        ('OPPORTUNITE', 'Opportunité'),
    )
    type_risque = models.CharField(max_length=20, choices=TYPE_CHOICES, verbose_name="Type de risque")
    criteres_evaluation = models.JSONField(verbose_name="Critères d'évaluation")
    METHODE_CHOICES = (
        ('MOYENNE', 'Moyenne'),
        ('MAX', 'Maximum'),
        ('MIN', 'Minimum'),
    )
    methode_calcul = models.CharField(max_length=20, choices=METHODE_CHOICES, verbose_name="Paramétrage de méthode de calcul")
    piece_jointe = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

    def __str__(self):
        return f"Risque {self.id} - {self.date_declaration}"

    def clean(self):
        for critere, note in self.criteres_evaluation.items():
            if note < 1 or note > 10:
                raise ValidationError("La note pour {} doit être comprise entre 1 et 10.".format(critere))

    def save(self, *args, **kwargs):
        if self.criteres_evaluation:
            moyenne = sum(self.criteres_evaluation.values()) / len(self.criteres_evaluation)
            if moyenne == 5:
                self.methode_calcul = 'MOYENNE'
            elif moyenne < 5:
                self.methode_calcul = 'MIN'
            else:
                self.methode_calcul = 'MAX'
        super().save(*args, **kwargs)
