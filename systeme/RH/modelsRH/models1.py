from django.db import models
from django.contrib.auth.models import User
from timezone_field import TimeZoneField
from ..modelsRH.models2 import Employe



class JobPost(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='JobPost_created',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='job_posts_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    title = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    main_mission = models.CharField(max_length=255)
    required_skills = models.CharField(max_length=255)
    main_activity = models.CharField(max_length=255)
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)

    def __str__(self):
        return self.title
    
class Department(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_department',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_department', null=True)

    def __str__(self):
        return self.name
    
class Address(models.Model):

    address_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_address',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_address', null=True)
    Street = models.CharField(max_length=255)
    City = models.CharField(max_length=255)
    State = models.CharField(max_length=255)
    Zip_code = models.CharField(max_length=255)

    def __str__(self):
        return self.address_name
    

class FicheEmployee(models.Model):

    name = models.CharField(max_length=100)
    job_position = models.ForeignKey(JobPost, on_delete=models.SET_NULL, null=True, blank=True)
    work_mobile = models.CharField(max_length=8)
    work_phone = models.CharField(max_length=8)
    work_email = models.EmailField(unique=True)
    department = models.ManyToManyField('Department')
    manager = models.ForeignKey('Employe', on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_employees')
    coach = models.ForeignKey('Employe', on_delete=models.SET_NULL, null=True, blank=True, related_name='coached_employees')
    work_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='employees_work_address')
    work_location = models.CharField(max_length=255)
    address = models.ForeignKey('Address', on_delete=models.SET_NULL, null=True, blank=True, related_name='employees_address')
    working_hours = models.FloatField()
    timezone_field = TimeZoneField(default='UTC')
    bank_account_number = models.CharField(max_length=255,unique=True)
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
    cnss = models.CharField(max_length=20,unique=True)
    cin = models.CharField(max_length=8,unique=True)   
    pieces_jointes = models.FileField(upload_to='pieces_jointes/', blank=True, null=True)
    employe_concerne = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='fiches_employee')
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_fiche_employe',null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='updated_fiche_employe', null=True)

    def __str__(self):
        return self.name
    

class PosteFonction(models.Model):
    
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)
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