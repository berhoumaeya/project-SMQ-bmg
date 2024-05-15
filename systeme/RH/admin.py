from django.contrib import admin

# Register your models here.

from .modelsRH.models1 import *
from .modelsRH.models2 import *
from .modelsRH.models3 import *

admin.site.register(ResponsableFormation)
admin.site.register(Participant)
admin.site.register(Employe)
admin.site.register(FicheEmployee)
admin.site.register(Address)
admin.site.register(JobPost)
admin.site.register(Formation)
admin.site.register(EvaluationChaud)
admin.site.register(EvaluationFroid)
admin.site.register(EvaluationCompetence)
admin.site.register(PlanAction)
admin.site.register(Department)
