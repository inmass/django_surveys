from django.urls import path
from .views import *

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('my-surveys/', mySurveys, name='mySurveys'),
    path('create-survey/', createSurvey, name='createSurvey'),
    path('survey-responses/<slug:slug>/', surveyResponses, name='surveyResponses'),
    path('survey-response/<slug:slug>/<int:response_id>/', surveyResponse, name='surveyResponse'),
]