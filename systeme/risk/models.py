from django.db import models
from django.contrib.auth.models import User

class Risque(models.Model):
    nom_risk = models.CharField(max_length=50,unique=True,default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='risk_created', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='risk_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    date_declaration = models.DateField(verbose_name="Date de déclaration du risque")
    Declencheur_CHOICES = (
        ('Faille de sécurité dans le système', 'Faille de sécurité dans le système'),
        ('Attaque de phishing', 'Attaque de phishing'),
        ('Panne équipement', 'Panne équipement'),
        ('Erreur humaine', 'Erreur humaine'),
    )
    declencheur = models.CharField(choices=Declencheur_CHOICES)
    LISTE_CHOICES = (
        ('Département IT', 'Département IT'),
        ('Équipe de production', 'Équipe de production'),
        ('Clients', 'Clients'),
        ('Fournisseurs', 'Fournisseurs'),
    )
    liste_concernee = models.CharField(choices=LISTE_CHOICES)
    TYPE_CHOICES = (
        ('MENACE', 'Menace'),
        ('OPPORTUNITE', 'Opportunité'),
    )
    type_risque = models.CharField(max_length=20, choices=TYPE_CHOICES, verbose_name="Type de risque")
    METHODE_CHOICES = (
        ('MOYENNE', 'Moyenne'),
        ('MAX', 'Maximum'),
        ('MIN', 'Minimum'),
    )
    methode_calcul = models.CharField(max_length=20, choices=METHODE_CHOICES, verbose_name="Paramétrage de méthode de calcul")
    piece_jointe = models.FileField(upload_to='pieces_jointes_risk/', blank=True, null=True)

    def __str__(self):
        return f"Risque {self.id} - {self.date_declaration}"
    
class CritereEvaluation(models.Model):

    CRITERE_CHOICES = (
        ('Probabilité occurrence', 'Probabilité occurrence'),
        ('Impact', 'Impact'),
        ('Vulnérabilité', 'Vulnérabilité'),
        ('Mesures de contrôle existantes', 'Mesures de contrôle existantes'),
        ('Capacité de détection', 'Capacité de détection'),
        ('Tendance', 'Tendance'),
    )
    nom = models.CharField(choices=CRITERE_CHOICES)
    CHOIX_NOTE = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
        (7, '7'),
        (8, '8'),
        (9, '9'),
        (10, '10'),
    )

    note = models.PositiveIntegerField(choices=CHOIX_NOTE)
    risque = models.ForeignKey(Risque, on_delete=models.CASCADE, related_name='criteres')

    def __str__(self):
        return f"{self.nom} - Note: {self.note}"
