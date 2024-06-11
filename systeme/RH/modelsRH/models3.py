from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField
from ..modelsRH.models2 import Formation,Employe
from copy import deepcopy
from django.db.models.signals import post_save
from django.dispatch import receiver

#class Evaluation chaud


class EvaluationChaud(models.Model):

    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_chaud',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_chaud', null=True)
    formation = models.ForeignKey(Formation,on_delete=models.CASCADE,blank=True,null=True)
    date_realisation = models.DateField()
    criteres = models.CharField(max_length=50)
    COEFFICIENTS_CHOICES = [
        ('1', 'évaluation insatisfaisante'),
        ('2', 'évaluation faible'),
        ('3', 'évaluation moyenne'),
        ('4', 'évaluation bonne'),
        ('5', 'évaluation satisfaisante'),
    ]
    coefficients = models.CharField(max_length=50, choices=COEFFICIENTS_CHOICES)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_chaud/', blank=True, null=True)

    def __str__(self):
        return self.name
    
#class EvaluationFroid
    

class EvaluationFroid(models.Model):

    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_froid',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_froid', null=True)
    formation = models.ForeignKey(Formation,on_delete=models.CASCADE,blank=True,null=True)
    date_realisation = models.DateField()
    criteres = models.CharField(max_length=50)
    COEFFICIENTS_CHOICES = [
        ('1', 'évaluation insatisfaisante'),
        ('2', 'évaluation faible'),
        ('3', 'évaluation moyenne'),
        ('4', 'évaluation bonne'),
        ('5', 'évaluation satisfaisante'),
    ]
    coefficients = models.CharField(max_length=50, choices=COEFFICIENTS_CHOICES)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_froid/', blank=True, null=True)


    def __str__(self):
        return self.name
    

#class EvaluationCompetence
    
class EvaluationCompetence(models.Model):

    name = models.CharField(max_length=100,unique=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_evaluation_competence',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_evaluation_competence', null=True)
    commentaires = models.TextField(blank=True)
    total_acquis = models.FloatField(default=0)
    total_requis = models.FloatField(default=0)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_competence/', blank=True, null=True)
    employe_concerne = models.ForeignKey(Employe,on_delete=models.CASCADE, related_name='Employe_concerné',null=True)

    def __str__(self):
        return self.name
    
#class plan action    

class PlanAction(models.Model):
    competence = models.ForeignKey(EvaluationCompetence, on_delete=models.CASCADE, related_name='action_criteres',default=None)
    description = models.TextField()
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_plan',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_plan', null=True)

    def __str__(self):
        return f"Plan d'action pour {self.competence.name}"
    

class ClotureFormation(models.Model):
    liste_presence = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    support_formation = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    certifications = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

class CritereEvaluation(models.Model):

    skills_acquis = models.CharField(max_length=100)
    skills_requis = models.CharField(max_length=100)
    CHOIX_NOTE = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
        (7, '7'),
        (8, '8'),
        (9, '9'),
        (10, '10'),
    )

    note_acquis = models.PositiveIntegerField(choices=CHOIX_NOTE)
    note_requis = models.PositiveIntegerField(choices=CHOIX_NOTE)
    competence = models.ForeignKey(EvaluationCompetence, on_delete=models.CASCADE, related_name='criteres')