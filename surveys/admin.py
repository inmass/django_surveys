from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(SurveyResponse)
admin.site.register(Response)
