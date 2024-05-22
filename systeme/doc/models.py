from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import Group
from simple_history.models import HistoricalRecords


class Site(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class Activite(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom
    
class Type_Document(models.Model) : 
    type_de_document = models.CharField(max_length=255)

    def __str__(self):
        return self.type_de_document
    
class DemandDocument(models.Model):

    type = models.ForeignKey('Type_Document', on_delete=models.CASCADE)
    document_object = models.CharField(max_length=255)
    attached_file = models.FileField(upload_to='demand_attachments/', blank=True, null=True)
    is_validated = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='demand_rediges', limit_choices_to={'groups__name': 'redacteur'})
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='demand_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"{self.type} - {self.document_object}"


class DocInt(models.Model):

    libelle = models.CharField(max_length=255)
    type = models.CharField(max_length=255,null=True, default=None)
    fichier = models.FileField(upload_to='documents/', null=True, blank=True)
    selection_site = models.CharField(max_length=255,null=True, default=None)
    selection_activite = models.CharField(max_length=255,null=True, default=None)
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
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='En attente')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='documentInterne_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    history = HistoricalRecords()

    def __str__(self):
        return self.libelle
    

class Lieu_Classement(models.Model) : 

    LIEU_CLASSEMENT_CHOICES = models.CharField(max_length=255)

    def __str__(self):
        return self.LIEU_CLASSEMENT_CHOICES
    


class DocExt(models.Model):

    TYPE_CHOICES = [
        ('numerique', 'Numérique'),
        ('papier', 'Papier'),
    ]
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    designation = models.CharField(max_length=255)
    lieu_classement = models.ForeignKey(Lieu_Classement, on_delete=models.CASCADE)
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
    