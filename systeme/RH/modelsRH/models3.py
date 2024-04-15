from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField
from ..modelsRH.models2 import Formation,Employe,Participant
from copy import deepcopy

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
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    participant =models.ForeignKey(Participant, on_delete=models.CASCADE)

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
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    responsable_formation =models.ForeignKey('ResponsableFormation', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

#class EvaluationCompetence
    
class EvaluationCompetence(models.Model):

    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_evaluation_competence',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_evaluation_competence', null=True)
    skills_acquis = JSONField(default=dict)
    skills_requis = JSONField(default=dict)
    commentaires = models.TextField(blank=True)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    employe_concerne = models.ForeignKey(Employe,on_delete=models.CASCADE, related_name='Employe_concerné',null=True)

    def __str__(self):
        return self.name
    
#class plan action    

class PlanAction(models.Model):
    evaluation = models.OneToOneField(EvaluationCompetence, on_delete=models.CASCADE, related_name='plan_action')
    description = models.TextField()
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_plan',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_plan', null=True)

    def __str__(self):
        return f"Plan d'action pour {self.evaluation.name}"
    

class ClotureFormation(models.Model):
    liste_presence = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    support_formation = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    certifications = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)