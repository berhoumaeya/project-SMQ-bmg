from django.db import models
from django.contrib.auth.models import User
from CRM.models import ReclamationClient


class Fournisseur(models.Model):
    code_fournisseur = models.CharField(max_length=50, unique=True)
    nom = models.CharField(max_length=100)
    raison_sociale = models.CharField(max_length=100)
    adresse = models.CharField(max_length=255)
    numero_telephone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    CATEGORIE_CHOICES = [
        ('electronique', 'electronique'),
        ('textile', 'textile'),
        ('alimentation', 'alimentation'),
    ]
    categorie = models.CharField(choices=CATEGORIE_CHOICES)
    TYPE_CHOICES = [
        ('Fournisseur de matière première', 'Fournisseur de matière première'),
        ('Fournisseur de composants', 'Fournisseur de composants'),
        ('Fournisseur de produits finis', 'Fournisseur de produits finis'),
    ]
    type_fournisseur = models.CharField(choices=TYPE_CHOICES)
    fournisseur_agree = models.BooleanField(default=False)
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
    pieces_jointes = models.FileField(upload_to='pieces_jointes_fournisseur/', blank=True, null=True)

    def __str__(self):
        return self.nom
    

class ReclamationFournisseur(models.Model):

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reclamation_fournisseur_created',null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='reclamation_fournisseur_updated', null=True)
    updated_at = models.DateTimeField(null=True, default=None)
    numero_sequentiel = models.CharField(max_length=50, unique=True)
    date_reclamation = models.DateField()
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE,null=True)
    description = models.TextField()
    TYPE_RECLAMATION_CHOICES = [
        ('Service', 'Service'),
        ('Produit', 'Produit'),
        ('Facturation', 'Facturation'),
        ('Livraison', 'Livraison'),
        ('Support', 'Support'),
    ]
    type_reclamation = models.CharField(max_length=50, choices=TYPE_RECLAMATION_CHOICES,default=None)
    GRAVITE_CHOICES = [
        ('faible', 'Faible'),
        ('moyenne', 'Moyenne'),
        ('élevée', 'Élevée'),
    ]
    gravite = models.CharField(max_length=10, choices=GRAVITE_CHOICES)
    designation = models.CharField(max_length=100)
    actions = models.TextField()
    reclamation_client = models.ForeignKey(ReclamationClient, on_delete=models.CASCADE, null=True, blank=True)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_reclamation_fournisseur/', blank=True, null=True)

    def __str__(self):
        return self.numero_sequentiel
    
class TypeProduit(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

    

class EvaluationFournisseur(models.Model):

    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE,default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='evaluation_fournisseur_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='evaluation_fournisseur_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    type_produit = models.ForeignKey(TypeProduit, on_delete=models.CASCADE)
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
    pieces_jointes = models.FileField(upload_to='pieces_jointes_evaluation_fournisseur/', blank=True, null=True)

    def __str__(self):
        return f"Évaluation de {self.fournisseur} - Type de produit : {self.type_produit}"