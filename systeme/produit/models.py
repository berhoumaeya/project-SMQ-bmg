from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from CRM.models import ReclamationClient
from fournisseur.models import TypeProduit
    

    

class NonConformite(models.Model):

    date_detection = models.DateField()
    reclamation_client = models.ForeignKey(ReclamationClient, on_delete=models.CASCADE, related_name='reclamation_client_non_conforme',null=True)
    designation_produit_non_conforme = models.CharField(max_length=100)
    description_non_conformite = models.TextField()
    produits_non_conformes = models.ForeignKey(TypeProduit, on_delete=models.CASCADE, related_name='TypeProduit_non_conforme')
    SOURCE_CHOICES = [
        ('Usine', 'Usine'),
        ('Fournisseur', 'Fournisseur'),
        ('Processus de production', 'Processus de production'),
        ('Transport', 'Transport'),
        ('Stockage', 'Stockage'),
    ]

    TYPE_CHOICES = [
        ('Matière première défectueuse', 'Matière première défectueuse'),
        ('Erreur de production', 'Erreur de production'),
        ('Défaut d\'emballage', 'Défaut d\'emballage'),
        ('Problème de livraison', 'Problème de livraison'),
        ('Mauvaise manipulation', 'Mauvaise manipulation'),
    ]
    type_non_conformite = models.CharField(max_length=50, choices=TYPE_CHOICES,default=None)
    source_non_conformite = models.CharField(max_length=50, choices=SOURCE_CHOICES,default=None)
    GRAVITE_CHOICES = [
        ('Faible', 'Faible'),
        ('Moyenne', 'Moyenne'),
        ('Élevée', 'Élevée'),
    ]
    niveau_gravite = models.CharField(max_length=50, choices=GRAVITE_CHOICES,default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_produit/', blank=True, null=True)
    personnes_a_notifier = models.ManyToManyField(User, related_name='non_conformites_a_notifier')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creer_nonConformite')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='modifier_nonConformite', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"Non-Conformité #{self.designation_produit_non_conforme}"
    

class FicheNonConformite(models.Model):
    non_conformite = models.ForeignKey(NonConformite, on_delete=models.CASCADE)
    type_non_conformite = models.CharField(max_length=100)
    numero_OF = models.CharField(max_length=100) 
    numero_O = models.CharField(max_length=100) 
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creer_fiche_nonConformite')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='modifier_fiche_nonConformite', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"Fiche de non-conformité pour {self.non_conformite}"
    

class FicheTraitementNonConformite(models.Model):
    non_conformite = models.ForeignKey(NonConformite, on_delete=models.CASCADE)
    date_traitement = models.DateField()
    cout_non_conformite = models.DecimalField(max_digits=10, decimal_places=2) 
    quantite_rejetee = models.IntegerField()  
    valeur_quantite_rejetee = models.DecimalField(max_digits=10, decimal_places=2) 
    quantite_declassee = models.IntegerField() 
    valeur_quantite_declassee = models.DecimalField(max_digits=10, decimal_places=2) 
    quantite_acceptee = models.IntegerField()  
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creer_ficheT_nonConformite',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='modifier_ficheT_nonConformite', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"Fiche de traitement pour {self.non_conformite}"


class FicheClotureNonConformite(models.Model):
    non_conformite = models.OneToOneField('NonConformite', on_delete=models.CASCADE)
    traitement_produit_non_conforme = models.CharField(max_length=20, choices=[('Cloturer', 'Clôturer'), ('NonCloturer', 'Non clôturer')])
    date_cloture = models.DateField(default=timezone.now)  # Date de clôture automatique
    rapport_cloture = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creer_ficheC_nonConformite',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='modifier_ficheC_nonConformite', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"Fiche de clôture pour {self.non_conformite}"
