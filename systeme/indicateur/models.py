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
    
class Processus(models.Model):
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
    TYPE_INDICATEUR_CHOICES = [
        ('qualité', 'Qualité'),
        ('performance', 'Performance'),
        ('sécurité', 'Sécurité'),
    ]

    PROCESSUS_LIE_CHOICES = [
        ('production', 'Production'),
        ('logistique', 'Logistique'),
        ('achat', 'Achat'),
        ('vente', 'Vente'),
    ]

    AXE_POLITIQUE_QUALITE_CHOICES = [
        ('satisfaction_client', 'Satisfaction Client'),
        ('amélioration_continue', 'Amélioration Continue'),
        ('conformité', 'Conformité'),
    ]

    TYPE_RESULTAT_ATTENDU_CHOICES = [
        ('quantitatif', 'Quantitatif'),
        ('qualitatif', 'Qualitatif'),
        ('financier', 'Financier'),
    ]
    libelle = models.CharField(max_length=255)
    type_indicateur = models.CharField(max_length=20,choices=TYPE_INDICATEUR_CHOICES,default='qualité')
    processus_lie = models.CharField(max_length=20,choices=PROCESSUS_LIE_CHOICES,default='production')
    axe_politique_qualite = models.CharField(max_length=30,choices=AXE_POLITIQUE_QUALITE_CHOICES,default='satisfaction_client')
    type_resultat_attendu = models.CharField(max_length=20,choices=TYPE_RESULTAT_ATTENDU_CHOICES,default='quantitatif')
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
    type_suivi = models.CharField(choices=TYPE_SUIVI_CHOICES)
    valeur_cible = models.DecimalField(max_digits=10, decimal_places=2)
    limite_critique = models.DecimalField(max_digits=10, decimal_places=2)
    piece_jointe = models.FileField(upload_to='pieces_jointes_indicateur/', blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.libelle

  
class SuiviIndicateur(models.Model):

    indicateur = models.ForeignKey(Indicateur, on_delete=models.CASCADE,related_name='indicateur_reference')
    frequence = models.CharField(max_length=100)
    objectif = models.TextField()
    limite_critique = models.DecimalField(max_digits=10, decimal_places=2)
    resultat = models.DecimalField(max_digits=10, decimal_places=2)
    commentaire = models.TextField()
    piece_jointe = models.FileField(upload_to='pieces_jointes_suivi/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suivi_indicateur_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='suivi_indicateur_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    history = HistoricalRecords()


@receiver(post_save, sender=SuiviIndicateur)
def generer_alerte_agenda(sender, instance, created, **kwargs):
    if created and instance.created_by:
        Alert.objects.create(
            user=instance.created_by,
            message=f"Rappel : Suivi de l'indicateur {instance.indicateur.libelle}"
        )
