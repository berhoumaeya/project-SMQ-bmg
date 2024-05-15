from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models.signals import m2m_changed



class ResponsableFormation(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='RF_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='RF_updated', null=True)
    nom=models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    username=models.CharField(max_length=255,unique=True)
    email=models.EmailField(unique=True)
    formations_concernees = models.ManyToManyField('Formation', related_name='responsables_concernes', blank=True)
    password = models.CharField(max_length=128,null=True, default=None)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_responsable/', blank=True, null=True)
    is_user = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Employe(models.Model):
    nom=models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    username=models.CharField(max_length=255,unique=True)
    email=models.EmailField(unique=True)
    password = models.CharField(max_length=128,null=True, default=None)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_employe/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_Employe',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_Employe', null=True)
    is_user = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
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
    date_debut_formation = models.DateField(null=True, default=None)
    date_fin_formation = models.DateField(null=True, default=None)
    responsable_formation = models.ManyToManyField('ResponsableFormation')
    responsable_validation = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='formations_responsable_validation') 
    participants = models.ManyToManyField('Participant')
    pieces_jointes = models.FileField(upload_to='pieces_jointes_formation/', blank=True, null=True)
    CRITERES_VALIDATION = [
        ('chaud', 'Évaluation à chaud'),
        ('froid', 'Évaluation à froid'),
    ]
    parametre_validation = models.CharField(max_length=10, choices=CRITERES_VALIDATION)
    STATUT_CHOICES = [
        ('En attente', 'En attente'),
        ('En cours', 'En cours'),
        ('terminé', 'terminé'),
    ]
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='En attente')
    date_cloture = models.DateField(null=True, blank=True)


    def __str__(self):
        return self.intitule_formation
    
@receiver(post_save, sender=Formation)
def update_date_cloture(sender, instance, **kwargs):

    if instance.date_fin_formation and not instance.date_cloture:
        six_mois_plus_tard = instance.date_fin_formation + timedelta(days=30*6)
        instance.date_cloture = six_mois_plus_tard
        instance.save()


@receiver(m2m_changed, sender=Formation.participants.through)
def update_participant_formations(sender, instance, action, **kwargs):
    if action == 'post_add':
        participants = kwargs['pk_set']
        formation = instance

        for participant_id in participants:
            participant = Participant.objects.get(pk=participant_id)
            participant.formations_concernees.add(formation)    

@receiver(m2m_changed, sender=Formation.responsable_formation.through)
def update_responsable_formation_formations(sender, instance, action, **kwargs):
    if action == 'post_add':
        responsable_formation = kwargs['pk_set']
        formation = instance

        for responsable_formation_id in responsable_formation:
            responsable = ResponsableFormation.objects.get(pk=responsable_formation_id)
            responsable.formations_concernees.add(formation)    

class Participant(models.Model):

    formations_concernees = models.ManyToManyField('Formation', related_name='participants_concernes', blank=True)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    username = models.CharField(max_length=255,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128,null=True, default=None)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    pieces_jointes = models.FileField(upload_to='pieces_jointes_participant/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='created_participants', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_participants', null=True)
    employe =models.ForeignKey(Employe, on_delete=models.CASCADE,blank=True,null=True)
    is_user = models.BooleanField(default=False)
    

    def __str__(self):
        return self.username
    
