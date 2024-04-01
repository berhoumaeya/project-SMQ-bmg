from django.db import models
from django.contrib.auth.models import User

class Formation(models.Model):

    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_formation',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_formation', null=True)
    intitule_formation = models.CharField(max_length=255)
    TYPES_FORMATION = [
        ('interne', 'Formation en interne'),
        ('intra', 'Formation en intra'),
    ]
    type_formation = models.CharField(max_length=10, choices=TYPES_FORMATION)
    organisme_formation = models.CharField(max_length=255)  
    theme_formation = models.TextField()
    date_debut_formation = models.DateField()
    date_fin_formation = models.DateField()
    responsable_formation = models.ForeignKey('ResponsableFormation', on_delete=models.CASCADE, related_name='formations_responsable_formation') 
    responsable_validation = models.ForeignKey('Employe', on_delete=models.CASCADE, related_name='formations_responsable_validation') 
    participants = models.ManyToManyField('Employe', related_name='formations_participants')
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    CRITERES_VALIDATION = [
        ('chaud', 'Évaluation à chaud'),
        ('froid', 'Évaluation à froid'),
    ]
    parametre_validation = models.CharField(max_length=10, choices=CRITERES_VALIDATION)
    date_cloture_formation = models.DateField() 

    def __str__(self):
        return self.intitule_formation



class ResponsableFormation(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='RF_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='RF_updated', null=True)
    nom=models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    email=models.EmailField()
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

    def __str__(self):
        return self.username
    


class Employe(models.Model):
    nom=models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    email=models.EmailField()
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_Employe',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_Employe', null=True)

    def __str__(self):
        return self.username
    

class Participant(models.Model):

    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='created_participants', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_participants', null=True)
    employe =models.ForeignKey(Employe, on_delete=models.CASCADE,blank=True,null=True)
    formation_concerne = models.ForeignKey(Formation,on_delete=models.CASCADE,blank=True,null=True)
    

    def __str__(self):
        return self.username