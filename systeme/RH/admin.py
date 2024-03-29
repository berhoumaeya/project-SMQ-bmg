from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(ResponsableFormation)
admin.site.register(Participant)
admin.site.register(Employe)
admin.site.register(FicheEmployee)
admin.site.register(Address)
admin.site.register(JobPost)
admin.site.register(PosteFonction)
admin.site.register(Formation)
admin.site.register(EvaluationChaud)
admin.site.register(EvaluationFroid)
admin.site.register(EvaluationCompetence)
admin.site.register(PlanAction)
admin.site.register(Notification)
admin.site.register(Competence)
admin.site.register(Department)
