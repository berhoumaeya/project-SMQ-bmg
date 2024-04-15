from django.contrib import admin
from .models import *

admin.site.register(Site)
admin.site.register(Activite)
admin.site.register(Type_Document)
admin.site.register(Lieu_Classement)
admin.site.register(DocExt)
admin.site.register(DocInt)
admin.site.register(DemandDocument)