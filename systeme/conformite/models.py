from django.db import models
from RH.modelsRH.models3 import PlanAction

class type_fiche:
    nom  = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.reference
    
class Exigence:
    nom_reglementation = models.CharField(max_length=100)
    applicable = models.BooleanField(default=False)
    plan_action = models.ForeignKey(PlanAction,on_delete=models.CASCADE,blank=True,null=True)
    def __str__(self):
        return self.reference



class FicheExigenceReglementaire(models.Model):
    reference = models.AutoField(primary_key=True)
    type_fiche = models.ForeignKey(type_fiche,on_delete=models.CASCADE)
    source_liste = models.CharField(max_length=100)
    exigence = models.ForeignKey(Exigence,on_delete=models.CASCADE)
    type_decideur = models.CharField(max_length=100)

    def __str__(self):
        return self.reference

