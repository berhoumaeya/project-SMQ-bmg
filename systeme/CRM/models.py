from django.db import models
from django.contrib.auth.models import User
from  RH.modelsRH.models1 import Address

   
#Introduction client

class Client(models.Model):
    nom = models.CharField(max_length=255)
    CATEGORIE_CHOICES = [
        ('Premium', 'Premium'),
        ('Standard', 'Standard'),
        ('Basique', 'Basique'),
        ('VIP', 'VIP'),
        ('Or', 'Or'),
        ('Argent', 'Argent'),
        ('Bronze', 'Bronze'),
        ('Entreprise', 'Entreprise'),
        ('Individuel', 'Individuel'),
    ]

    TYPE_CLIENT_CHOICES = [
        ('Nouveau', 'Nouveau'),
        ('Récurrent', 'Récurrent'),
        ('Potentiel', 'Potentiel'),
        ('Ancien', 'Ancien'),
    ]
    type_client = models.ForeignKey(Address, on_delete=models.CASCADE)
    code_client = models.CharField(max_length=50,unique=True,default=None)
    raison_sociale = models.CharField(max_length=255)
    activite = models.CharField(max_length=255)
    type_client = models.CharField(max_length=50, choices=TYPE_CLIENT_CHOICES,default=None)
    categorie = models.CharField(max_length=50, choices=CATEGORIE_CHOICES,default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='client_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='clients/', blank=True, null=True)


    def __str__(self):
        return self.nom
    
#Réclamation client 
    

class ReclamationClient(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE,default=None)

    GRAVITE_CHOICES = [
        ('Faible', 'Faible'),
        ('Moyenne', 'Moyenne'),
        ('Grave', 'Grave'),
        ('Critique', 'Critique'),
    ]

    TYPE_RECLAMATION_CHOICES = [
        ('Service', 'Service'),
        ('Produit', 'Produit'),
        ('Facturation', 'Facturation'),
        ('Livraison', 'Livraison'),
        ('Support', 'Support'),
    ]
    code = models.CharField(max_length=50,unique=True,default=None)
    description = models.TextField()
    type_reclamation = models.CharField(max_length=50, choices=TYPE_RECLAMATION_CHOICES,default=None)
    date_livraison = models.DateField()
    gravite = models.CharField(max_length=50, choices=GRAVITE_CHOICES,default=None)
    responsable_traitement = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responsable_traitement',null=True,limit_choices_to={'groups__name': 'responsable_traitement'})
    decisions = models.TextField(blank=True)
    declencher_plan_action = models.BooleanField(default=False)
    reclamation_fournisseur = models.FileField(upload_to='reclamations_fournisseur/', blank=True, null=True)
    plan_action = models.FileField(upload_to='plans_action/', blank=True, null=True)
    fichier_pdf = models.FileField(upload_to='fichiers_pdf_reclamation_client/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reclamation_client_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='reclamation_client_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)


    def __str__(self):
        return self.code
    
#Suivi réclamation
    
class SuiviReclamation(models.Model):
    reclamation = models.ForeignKey(ReclamationClient, on_delete=models.CASCADE)
    responsable_suivi = models.ForeignKey(User, on_delete=models.CASCADE)
    delai_fixe = models.DateField()
    date_suivi = models.DateField()
    rapport_suivi = models.TextField()
    reclamation_cloturee = models.BooleanField(default=False)
    date_cloture = models.DateField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suivi_reclamation_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='suivi_reclamation_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    


    def __str__(self):
        return f"Suivi de réclamation #{self.reclamation.id}"
    
#Enquete satisfaction client 
    
    
class ClientEnquete(models.Model):

    client = models.ForeignKey(Client, on_delete=models.CASCADE,default=None,related_name='enquete_created',null=True)
    name_enquete = models.CharField(max_length=255, null = True,unique=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    clients = models.ManyToManyField(Client)
    QUESTIONNAIRE_TYPE_CHOICES = [
        ('Feedback', 'Feedback'),
        ('Research', 'Research'),
        ('Satisfaction', 'Satisfaction'),
    ]
    type_questionnaire = models.CharField(choices=QUESTIONNAIRE_TYPE_CHOICES)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='satisfaction_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='satisfaction_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_enquete_client/', blank=True, null=True)

    def __str__(self):
        return self.name_enquete


class SuggestionClient(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE,related_name='suggestion_created',null=True)
    SUGGESTION_TYPE_CHOICES = [
        ('FEATURE_REQUEST', 'Feature Request'),
        ('BUG_REPORT', 'Bug Report'),
        ('GENERAL_FEEDBACK', 'General Feedback'),
    ]
    type_suggestion = models.CharField(choices=SUGGESTION_TYPE_CHOICES)
    description = models.TextField()
    receptionnaire = models.ForeignKey(User, on_delete=models.CASCADE)
    actions = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suggestion_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='suggestion_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_suggestion_client/', blank=True, null=True)

    def __str__(self):
        return f"Suggestion {self.name} du client {self.client} - {self.date}"
    


