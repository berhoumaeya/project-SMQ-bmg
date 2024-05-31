from django.contrib import admin
from .models import *

admin.site.register(NonConformite)
admin.site.register(FicheNonConformite)
admin.site.register(FicheTraitementNonConformite)
admin.site.register(FicheClotureNonConformite)