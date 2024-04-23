from django.db import models
from RH.modelsRH.models3 import PlanAction
from doc.models import DocExt
from django.contrib.auth.models import User


class Type_fiche(models.Model):
    nom  = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nom
    
class Exigence(models.Model):
    nom_reglementation = models.CharField(max_length=100)
    applicable = models.BooleanField(default=False)
    plan_action = models.ForeignKey(PlanAction,on_delete=models.CASCADE,blank=True,null=True)

    def __str__(self):
        return self.nom_reglementation



class FicheExigenceReglementaire(models.Model):
    nom  = models.CharField(max_length=100, unique=True)
    type_fiche = models.ForeignKey(Type_fiche,on_delete=models.CASCADE)
    source = models.ForeignKey(DocExt,on_delete=models.CASCADE,null=True)
    exigence = models.ForeignKey(Exigence,on_delete=models.CASCADE)
    type_decideur = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creer_com')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='modifier_com', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.nom

