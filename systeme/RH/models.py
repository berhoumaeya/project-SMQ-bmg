from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from timezone_field import TimeZoneField
from django.utils import timezone
from django.dispatch import receiver

class ResponsableFormation(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='RF_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='RF_updated', null=True)
    nom=models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    email=models.EmailField()
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

    def __str__(self):
        return self.username
    
@receiver(post_save, sender=ResponsableFormation)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=ResponsableFormation)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class JobPost(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='JobPost_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='job_posts_updated', null=True)
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    main_mission = models.CharField(max_length=255)
    required_skills = models.CharField(max_length=255)
    main_activity = models.CharField(max_length=255)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

    def __str__(self):
        return self.title
    
@receiver(post_save, sender=JobPost)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=JobPost)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class Participant(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='created_participants', null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_participants', null=True)
    

    def __str__(self):
        return self.username

@receiver(post_save, sender=Participant)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()
@receiver(post_save, sender=Participant)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()


class Employe(models.Model):
    nom=models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    email=models.EmailField()
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    participant =models.ForeignKey(Participant, on_delete=models.CASCADE,blank=True,null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_Employe',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_Employe', null=True)

    def __str__(self):
        return self.username

@receiver(post_save, sender=Employe)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=Employe)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class Department(models.Model):
    name = models.CharField(max_length=255)
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_department',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_department', null=True)

    def __str__(self):
        return self.name
    
@receiver(post_save, sender=Department)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=Department)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class Address(models.Model):
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_address',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_address', null=True)
    Street = models.CharField(max_length=255)
    City = models.CharField(max_length=255)
    State = models.CharField(max_length=255)
    Zip_code = models.CharField(max_length=255)

@receiver(post_save, sender=Address)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=Address)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class FicheEmployee(models.Model):

    job_position = models.ForeignKey(JobPost, on_delete=models.SET_NULL, null=True, blank=True)
    work_mobile = models.CharField(max_length=15)
    work_phone = models.CharField(max_length=15)
    work_email = models.EmailField()
    department = models.ManyToManyField('Department')
    manager = models.ForeignKey('Employe', on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_employees')
    coach = models.ForeignKey('Employe', on_delete=models.SET_NULL, null=True, blank=True, related_name='coached_employees')
    work_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='employees_work_address')
    work_location = models.CharField(max_length=255)
    address = models.ForeignKey('Address', on_delete=models.SET_NULL, null=True, blank=True, related_name='employees_address')
    working_hours = models.FloatField()
    timezone_field = TimeZoneField(default='UTC')
    bank_account_number = models.CharField(max_length=255,)
    home_work_distance = models.FloatField(max_length=255,)
    MARTIAL_STATUS_CHOICES = (
        ('C', 'Célibataire'),
        ('M', 'Marié'),
        ('D', 'Divorcé'),
        ('V', 'Veuf'),
    )
    
    martial_status = models.CharField(max_length=1, choices=MARTIAL_STATUS_CHOICES, verbose_name="État civil")
    emergency_contact = models.CharField(max_length=255)
    emergency_phone = models.CharField(max_length=255)
    certificate_level = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    school = models.CharField(max_length=255)
    cnss = models.CharField(max_length=20)
    cin = models.CharField(max_length=20)   
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    employe_concerne = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='fiches_employee')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_fiche_employe',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_fiche_employe', null=True)

@receiver(post_save, sender=FicheEmployee)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=FicheEmployee)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class PosteFonction(models.Model):
    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_poste_fonction',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_poste_fonction', null=True)
    intitule_fonction = models.CharField(max_length=255,)
    positionnement = models.CharField(max_length=255,)
    mission_principale = models.TextField()
    relation_fonctionnelle = models.ManyToManyField('Employe')
    competences_requises = models.TextField()
    activite_principale = models.TextField()

    def __str__(self):
        return self.intitule_fonction
    
@receiver(post_save, sender=PosteFonction)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=PosteFonction)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class Formation(models.Model):

    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
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
    
@receiver(post_save, sender=Formation)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=Formation)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class EvaluationChaud(models.Model):

    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_chaud',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_chaud', null=True)
    FORMATION_CHOICES = [
        ('formation1', 'Formation 1'),
        ('formation2', 'Formation 2'),
    ]

    formation = models.CharField(max_length=50, choices=FORMATION_CHOICES)
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
        return self.formation
    
@receiver(post_save, sender=EvaluationChaud)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=EvaluationChaud)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()


class EvaluationFroid(models.Model):

    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_froid',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_froid', null=True)
    FORMATION_CHOICES = [
        ('formation1', 'Formation 1'),
        ('formation2', 'Formation 2'),
    ]
    formation = models.CharField(max_length=50, choices=FORMATION_CHOICES)
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
    responsable_formation =models.ForeignKey(ResponsableFormation, on_delete=models.CASCADE)

    def __str__(self):
        return self.formation

@receiver(post_save, sender=EvaluationFroid)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=EvaluationFroid)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class Competence(models.Model):

    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_competence',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_competence', null=True)
    
    NIVEAU_CHOICES = [
        (1, 'Niveau 1'),
        (2, 'Niveau 2'),
        (3, 'Niveau 3'),
        (4, 'Niveau 4'),
    ]
    nom = models.CharField(max_length=100)
    niveau_requis = models.IntegerField(choices=NIVEAU_CHOICES)

    def __str__(self):
        return self.nom

@receiver(post_save, sender=Competence)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=Competence)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class EvaluationCompetence(models.Model):

    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_evaluation_competence',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_evaluation_competence', null=True)
    competence = models.ForeignKey(Competence, on_delete=models.CASCADE)
    niveau_acquis = models.IntegerField(choices=Competence.NIVEAU_CHOICES)
    commentaires = models.TextField(blank=True)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

@receiver(post_save, sender=EvaluationCompetence)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=EvaluationCompetence)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class PlanAction(models.Model):

    created_at=models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_plan',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_plan', null=True)
    evaluation = models.OneToOneField(EvaluationCompetence, on_delete=models.CASCADE)
    description = models.TextField()

@receiver(post_save, sender=PlanAction)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

@receiver(post_save, sender=PlanAction)
def assign_updated_by(sender, instance, created, **kwargs):
    if not created:
        updated_by_user = kwargs.get('updated_by_user', None)
        
        if updated_by_user:
            instance.updated_by = updated_by_user
            instance.save()

class Notification(models.Model):
    created_at=models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_notification',null=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=Notification)
def assign_created_by(sender, instance, created, **kwargs):
    if created:
        instance.created_by = instance.created_by or kwargs.get('user')
        instance.save()

