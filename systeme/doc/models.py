from django.contrib.auth.models import User
from django.db import models
from simple_history.models import HistoricalRecords


    
class DemandDocument(models.Model):

    TYPE_CHOICES = [
        ('Manuel', 'Manuel'),
        ('Procédure', 'Procédure'),
        ('Politique', 'Politique'),
        ('Rapport', 'Rapport'),
        ('Mémoire', 'Mémoire'),
    ]
    type = models.CharField(max_length=50, choices=TYPE_CHOICES,default=None)
    document_object = models.CharField(max_length=255)
    attached_file = models.FileField(upload_to='demand_attachments/', blank=True, null=True)
    STATUT_CHOICES = [
        ('En attente', 'En attente'),
        ('Validé', 'Validé'),
        ('Refusé', 'Refusé'),
        ('terminé','terminé'),
    ]
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='En attente')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='demand_rediges', limit_choices_to={'groups__name': 'redacteur'})
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='demand_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"{self.type} - {self.document_object}"


class DocInt(models.Model):

    libelle = models.CharField(max_length=255)
    TYPE_CHOICES = [
        ('Manuel', 'Manuel'),
        ('Procédure', 'Procédure'),
        ('Politique', 'Politique'),
        ('Rapport', 'Rapport'),
        ('Mémoire', 'Mémoire'),
    ]
    type = models.CharField(max_length=50, choices=TYPE_CHOICES,default=None)
    fichier = models.FileField(upload_to='documents/', null=True, blank=True)
    SITE_CHOICES = [
        ('Site 1', 'Site 1'),
        ('Site 2', 'Site 2'),
        ('Site 3', 'Site 3'),
        ('Site 4', 'Site 4'),
    ]
    selection_site = models.CharField(max_length=50, choices=SITE_CHOICES,default=None)
    ACTIVITE_CHOICES = [
        ('Développement', 'Développement'),
        ('Test', 'Test'),
        ('Documentation', 'Documentation'),
        ('Déploiement', 'Déploiement'),
        ('Support', 'Support'),
    ]
    selection_activite = models.CharField(max_length=50, choices=ACTIVITE_CHOICES,default=None)
    selection_redacteur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents_rediges', limit_choices_to={'groups__name': 'redacteur'})
    selection_verificateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents_verifies', limit_choices_to={'groups__name': 'verificateur'})
    selection_approbateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents_approuves', limit_choices_to={'groups__name': 'approbateur'})
    liste_informee = models.ManyToManyField(User, related_name='documentsInterne_informes')
    created_at = models.DateTimeField(null=True, default=None)
    STATUT_CHOICES = [
        ('En attente', 'En attente'),
        ('En cours', 'En cours'),
        ('Approuvé', 'Approuvé'),
        ('Vérifié','Vérifié'),
        ('Rejeté', 'Rejeté'),
    ]
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='En cours')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='documentInterne_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    history = HistoricalRecords()

    def __str__(self):
        return self.libelle
    
    

class DocExt(models.Model):

    TYPE_CHOICES = [
        ('numerique', 'Numérique'),
        ('papier', 'Papier'),
    ]
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    designation = models.CharField(max_length=255)
    LIEU_CHOICES = [
        ('Archives', 'Archives'),
        ('Bureau', 'Bureau'),
        ('Entrepôt', 'Entrepôt'),
        ('Cloud', 'Cloud'),
    ]
    lieu_classement = models.CharField(max_length=50, choices=LIEU_CHOICES,default=None)
    duree_classement = models.CharField(max_length=100)
    liste_informee = models.ManyToManyField(User, related_name='documentsExterne_informes')
    fichier = models.FileField(upload_to='documents/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='documentExterne_created', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='documentExterne_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    history = HistoricalRecords()

    def __str__(self):
        return self.designation
    