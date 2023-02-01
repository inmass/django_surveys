from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from surveys.models import *
import json
from django.contrib import messages

# Create your views here.

login_required = login_required(login_url='/dashboard/login/')

@login_required
def index(request):
    title = 'Dashboard'

    context = {
        'title': title,
    }

    return render(request, 'dashboard/index.html', context)

@login_required
def mySurveys(request):
    title = 'My Surveys'

    surveys = Survey.objects.filter(owner = request.user)

    context = {
        'title': title,
        'surveys': surveys,
    }

    return render(request, 'dashboard/mySurveys.html', context)

@login_required
def createSurvey(request):
    title = 'Create Survey'

    if request.method == 'POST':
        
        survey_title = request.POST['survey_title']
        survey_description = request.POST['survey_description']
        questions = json.loads(request.POST['questions'])

        survey_obj = Survey.objects.create(
            owner = request.user,
            title = survey_title,
            description = survey_description,
        )

        for question in questions:
            print(question['text'])
            question_obj = Question.objects.create(
                survey = survey_obj,
                type = question['type'],
                text = question['text'],
            )
            
            if (question['type'] == 'radio' or question['type'] == 'checkbox' or question['type'] == 'select') and 'choices' in question:
                for choice in question['choices']:
                    Choice.objects.create(
                        question = question_obj,
                        choice_text = choice,
                    )

        messages.success(request, 'Survey created successfully!')

    context = {
        'title': title,
    }

    return render(request, 'dashboard/createSurvey.html', context)