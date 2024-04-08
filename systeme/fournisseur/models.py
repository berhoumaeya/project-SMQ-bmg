from django.db import models
from django.contrib.auth.models import User
from client.models import ReclamationClient,TypeReclamation


class Fournisseur(models.Model):
    code_fournisseur = models.CharField(max_length=50, unique=True)
    nom = models.CharField(max_length=100)
    raison_sociale = models.CharField(max_length=100)
    adresse = models.CharField(max_length=255)
    numero_telephone = models.CharField(max_length=20)
    email = models.EmailField()
    CATEGORIE_CHOICES = [
        ('cat1', 'Catégorie 1'),
        ('cat2', 'Catégorie 2'),
        ('cat3', 'Catégorie 3'),
    ]
    categorie = models.CharField(max_length=10, choices=CATEGORIE_CHOICES)
    TYPE_CHOICES = [
        ('type1', 'Type 1'),
        ('type2', 'Type 2'),
        ('type3', 'Type 3'),
    ]
    type_fournisseur = models.CharField(max_length=10, choices=TYPE_CHOICES)
    fournisseur_agree = models.BooleanField(default=False)
    piece_jointe = models.FileField(upload_to='pieces_jointes/')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fournisseur_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='fournisseur_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    PERIODICITE_CHOICES = [
        ('annuelle', 'Annuelle'),
        ('semestrielle', 'Semestrielle'),
        ('trimestrielle', 'Trimestrielle'),
    ]
    periodicite_evaluation = models.CharField(max_length=20, choices=PERIODICITE_CHOICES)

    def __str__(self):
        return self.nom
    

class ReclamationFournisseur(models.Model):

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reclamation_fournisseur_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='reclamation_fournisseur_updated', null=True)
    updated_at = models.DateTimeField(null=True, default=None)
    numero_sequentiel = models.CharField(max_length=50, unique=True)
    date_reclamation = models.DateField()
    nom_fournisseur = models.CharField(max_length=100)
    description = models.TextField()
    TYPE_CHOICES = [
        ('type1', 'Type 1'),
        ('type2', 'Type 2'),
        ('type3', 'Type 3'),
    ]
    type_reclamation = models.ForeignKey(TypeReclamation, on_delete=models.CASCADE, null=True, blank=True)
    GRAVITE_CHOICES = [
        ('faible', 'Faible'),
        ('moyenne', 'Moyenne'),
        ('élevée', 'Élevée'),
    ]
    gravite = models.CharField(max_length=10, choices=GRAVITE_CHOICES)
    designation = models.CharField(max_length=100)
    piece_jointe = models.FileField(upload_to='pieces_jointes/')
    actions = models.TextField()
    reclamation_client = models.ForeignKey(ReclamationClient, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.numero_sequentiel
    

class EvaluationFournisseur(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='evaluation_fournisseur_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='evaluation_fournisseur_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    type_produit = models.CharField(max_length=100)
    critere_evaluation = models.TextField()
    notes = models.DecimalField(max_digits=3, decimal_places=1)
    commentaires = models.TextField()
    PERIODICITE_CHOICES = [
        ('annuelle', 'Annuelle'),
        ('semestrielle', 'Semestrielle'),
        ('trimestrielle', 'Trimestrielle'),
        ('mensuelle', 'Mensuelle'),
        ('ponctuelle', 'Ponctuelle'),
    ]
    periodicite_evaluation = models.CharField(max_length=20, choices=PERIODICITE_CHOICES)

    def __str__(self):
        return f"Évaluation de {self.fournisseur} - Type de produit : {self.type_produit}"