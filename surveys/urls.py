from django.urls import path
from .views import home

app_name = 'surveys'

urlpatterns = [
    path('', home, name='home'),
]