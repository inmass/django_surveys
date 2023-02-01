from django.urls import path
from .views import *

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('mySurveys/', mySurveys, name='mySurveys'),
    path('createSurvey/', createSurvey, name='createSurvey'),
]