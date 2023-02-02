from django.urls import path
from .views import *

app_name = 'surveys'

urlpatterns = [
    path('', home, name='home'),
    path('survey/<slug:slug>/', passSurvey, name='passSurvey'),
]