from django.contrib import admin

# Register your models here.

from .models import *


admin.site.register(Site)
admin.site.register(TypeAction)
admin.site.register(SourceAction)
admin.site.register(CauseAction)
admin.site.register(GraviteAction)
admin.site.register(PrioriteAction)
admin.site.register(ActionPrincipale)
admin.site.register(SousAction)
