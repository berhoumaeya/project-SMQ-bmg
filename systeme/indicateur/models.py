from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from simple_history.models import HistoricalRecords


class TypeIndicateur(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class AxePolitiqueQualite(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class TypeResultatAttendu(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom
    
class Alert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alerts')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Alert for {self.user.username} at {self.created_at}"

class Indicateur(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='indicateur_created', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='indicateur_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    libelle = models.CharField(max_length=255)
    type_indicateur = models.ForeignKey(TypeIndicateur, on_delete=models.CASCADE)
    processus_lie = models.CharField(max_length=100)
    axe_politique_qualite = models.ForeignKey(AxePolitiqueQualite, on_delete=models.CASCADE)
    type_resultat_attendu = models.ForeignKey(TypeResultatAttendu, on_delete=models.CASCADE)
    date_debut = models.DateField()

    PERIODICITE_CHOICES = [
        ('annuelle', 'Annuelle'),
        ('semestrielle', 'Semestrielle'),
        ('trimestrielle', 'Trimestrielle'),
        ('mensuelle', 'Mensuelle'),
        ('hebdomadaire', 'Hebdomadaire'),
        ('quotidienne', 'Quotidienne'),
    ]

    periodicite_indicateur = models.CharField(max_length=20, choices=PERIODICITE_CHOICES)
    TYPE_SUIVI_CHOICES = [
        ('manuel', 'Manuel'),
        ('formule', 'Formule de calcul'),
    ]
    type_suivi = models.CharField(max_length=10, choices=TYPE_SUIVI_CHOICES)
    valeur_cible = models.DecimalField(max_digits=10, decimal_places=2)
    limite_critique = models.DecimalField(max_digits=10, decimal_places=2)
    piece_jointe = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.libelle

  
class SuiviIndicateur(models.Model):

    indicateur = models.ForeignKey(Indicateur, on_delete=models.CASCADE)
    frequence = models.CharField(max_length=100)
    objectif = models.TextField()
    limite_critique = models.DecimalField(max_digits=10, decimal_places=2)
    resultat = models.DecimalField(max_digits=10, decimal_places=2)
    commentaire = models.TextField()
    piece_jointe = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suivi_indicateur_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='suivi_indicateur_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    history = HistoricalRecords()


@receiver(post_save, sender=SuiviIndicateur)
def generer_alerte_agenda(sender, instance, created, **kwargs):
    if created and instance.created_by:
        Alert.objects.create(
            user=instance.created_by,
            message=f"Rappel : Suivi de l'indicateur {instance.indicateur.libelle}"
        )
