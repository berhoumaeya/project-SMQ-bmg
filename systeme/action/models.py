from django.db import models
from django.contrib.auth.models import User
from RH.modelsRH.models1 import Employe
from RH.modelsRH.models3 import PlanAction


class Site(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class TypeAction(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class SourceAction(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class CauseAction(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class GraviteAction(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class PrioriteAction(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class ActionPrincipale(models.Model):

    nom_action = models.CharField(max_length=100,default=None)
    designation = models.TextField()
    description = models.TextField()
    type_action = models.ForeignKey(TypeAction, on_delete=models.CASCADE, related_name='actions_type')
    source_action = models.ForeignKey(SourceAction, on_delete=models.CASCADE, related_name='actions_source')
    cause_action = models.ForeignKey(CauseAction, on_delete=models.CASCADE, related_name='actions_cause')
    gravite_action = models.ForeignKey(GraviteAction, on_delete=models.CASCADE, related_name='actions_gravite')
    priorite_action = models.ForeignKey(PrioriteAction, on_delete=models.CASCADE, related_name='actions_priorite')
    responsable_validation = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='actions_responsable_validation')
    site = models.ForeignKey(Site, on_delete=models.CASCADE, related_name='actions_site')
    plan = models.ForeignKey(PlanAction, on_delete=models.CASCADE, blank=True, null=True, related_name='actions_plan')
    piece_jointe = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_actions', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_actions', null=True)

class SousAction(models.Model):
    nom_sous_action = models.CharField(max_length=100,default=None)
    action_principale = models.ForeignKey(ActionPrincipale, on_delete=models.CASCADE, related_name='sous_actions')
    numero_sequentiel_sous_action = models.CharField(max_length=50)
    responsable_realisation = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='actions_realisees')
    delai_realisation = models.DateTimeField()
    responsable_suivi = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='actions_suivies')
    delai_suivi = models.DateTimeField()
    gravite_action = models.ForeignKey(GraviteAction, on_delete=models.CASCADE, related_name='sous_actions_gravite')
    priorite_action = models.ForeignKey(PrioriteAction, on_delete=models.CASCADE, related_name='sous_actions_priorite')
    piece_jointe = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_sous_actions', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_sous_actions', null=True)

class ClotureAction(models.Model):
    nom_cloture_action = models.CharField(max_length=100,default=None)
    action_concerne = models.ForeignKey(ActionPrincipale, on_delete=models.CASCADE, related_name='clotures_actions')
    responsable_cloture = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    delai_cloture = models.DateField(null=True)
    efficacite_action = models.CharField(max_length=100, null=True)
    commentaire = models.TextField(null=True)
    piece_jointe = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_clotures_actions',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_clotures_actions', null=True)

    def __str__(self):
        return self.nom_cloture_action




