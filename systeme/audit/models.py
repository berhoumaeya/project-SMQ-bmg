from django.db import models
from django.contrib.auth.models import User
from doc.models import DocExt

class Audit(models.Model):

    reference_audit = models.CharField(max_length=100) 
    demandeur = models.ForeignKey(User, on_delete=models.CASCADE)  
    designation = models.TextField() 
    #limit_choices_to={'groups__name': 'audit'}
    champ_audit = models.ManyToManyField(User, related_name='audits_access'  ) 
    type_audit = models.CharField(max_length=100) 
    #, limit_choices_to={'groups__name': 'Employe'}
    auditeurs = models.ManyToManyField(User, related_name='audits_auditors')
    date_debut_audit = models.DateField() 
    date_fin_audit = models.DateField()  
    document_reference = models.ForeignKey(DocExt,on_delete=models.CASCADE, related_name='audits_auditors')
    audités = models.ManyToManyField(User, related_name='audits_audited') 
    #, limit_choices_to={'groups__name': 'Employe'}
    responsable_validation = models.ForeignKey(User, on_delete=models.CASCADE, related_name='audits_validator')  
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='audit_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.reference_audit
    

class PlanAudit(models.Model):
    audit = models.ForeignKey(Audit, on_delete=models.CASCADE) 
    designation = models.TextField() 
    date = models.DateField()  
    heure_debut = models.IntegerField()  
    heure_fin = models.IntegerField() 
    lieu = models.CharField(max_length=100)  
    commentaires = models.TextField()  
    #, limit_choices_to={'groups__name': 'Employe'}
    personnes_concernees = models.ManyToManyField(User, related_name='personnes_concernees')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='plan_audit_created')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='plan_audit_updated', null=True)
    created_at = models.DateTimeField(null=True, default=None)
    updated_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.designation

