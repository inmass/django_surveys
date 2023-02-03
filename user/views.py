from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from surveys.models import *
import json
from django.contrib import messages
from django.http import JsonResponse
import datetime

# Create your views here.

login_required = login_required(login_url='/dashboard/login/')

@login_required
def index(request):

    return redirect('dashboard:mySurveys')

@login_required
def mySurveys(request):
    title = 'My Surveys'

    surveys = Survey.objects.filter(owner = request.user)

    context = {
        'title': title,
        'surveys': surveys[::-1],
    }

    return render(request, 'dashboard/mySurveys.html', context)

@login_required
def createSurvey(request):
    title = 'Create Survey'

    if request.method == 'POST':

        error = False

        survey_title = request.POST['survey_title']
        survey_description = request.POST['survey_description']
        questions = json.loads(request.POST['questions'])

        if questions:
            survey_obj = Survey.objects.create(
                owner = request.user,
                title = survey_title,
                description = survey_description,
            )

            for question in questions:
                
                # check if question type should have choices
                if (question['type'] == 'radio' or question['type'] == 'checkbox' or question['type'] == 'select') :
                    # check if question has choices
                    if 'choices' in question:
                        # check if question has at least two choices
                        if len(question['choices']) >= 2:
                            # create question
                            question_obj = Question.objects.create(
                                survey = survey_obj,
                                type = question['type'],
                                text = question['text'],
                            )
                            
                            # create choices
                            for choice in question['choices']:
                                Choice.objects.create(
                                    question = question_obj,
                                    choice_text = choice,
                                )
                            
                        else:
                            # if question doesn't have at least two choices
                            error = 'Please add at least two choices to your question!'
                    else:
                        # if question doesn't have choices
                        error = 'Please add at least two choices to your question!'
                else:
                    # if question type doesn't have choices create question
                    question_obj = Question.objects.create(
                        survey = survey_obj,
                        type = question['type'],
                        text = question['text'],
                    )

        else:
            # if survey doesn't have questions
            error = 'Please add at least one question to your survey!'


        # if there is no error
        if error:
            data = {
                'status': 'error',
                'message' : error
            }
        else:
            data = {
                'status': 'success',
                'message' : 'Survey created successfully!'
            }
        # return json response
        messages.success(request, 'Survey created successfully!')
        return JsonResponse(data)

    context = {
        'title': title,
    }

    return render(request, 'dashboard/createSurvey.html', context)

def surveyResponses(request, slug):

    survey = Survey.objects.get(slug = slug)
    title = f'{survey.title} Responses'

    survey_responses = SurveyResponse.objects.filter(survey = survey)
    statistics = []

    if survey_responses:
        for question in survey.get_questions():
            if question.type == 'radio' or question.type == 'checkbox' or question.type == 'select':
                choices = Choice.objects.filter(question = question)

                answers = []
                for choice in choices:
                    answers.append({
                        "choice": choice.choice_text,
                        "votes": choice.votes,
                        "total_votes": question.get_total_choices_votes()
                    })
                
                statistics.append({
                    'question': question.text,
                    'type': 'choices',
                    'answers': answers,
                })
            elif question.type == 'date':
                answers = []
                for response in question.get_responses():
                    date = datetime.datetime.strptime(response.answer, '%Y-%m-%d').strftime('%d %B %Y')
                    answers.append(date)

                statistics.append({
                    'question': question.text,
                    'type': 'date',
                    'answers': answers,
                })
            else:
                answers = []
                for response in question.get_responses():
                    answers.append(response.answer)

                statistics.append({
                    'question': question.text,
                    'type': 'text',
                    'answers': answers,
                })

    context = {
        'title': title,
        'survey': survey,
        'survey_responses': survey_responses,
        'statistics': statistics,
    }

    return render(request, 'dashboard/surveyResponses.html', context)

def surveyResponse(request, slug, response_id):

    survey = Survey.objects.get(slug = slug)
    title = f'{survey.title} Response'

    survey_response = SurveyResponse.objects.get(id = response_id)

    context = {
        'title': title,
        'survey': survey,
        'survey_response': survey_response
    }

    return render(request, 'dashboard/surveyResponse.html', context)