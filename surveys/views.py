from django.shortcuts import render
from .models import *
from datetime import datetime

# Create your views here.

def home(request):
    return render(request, 'home.html')

def passSurvey(request, slug):

    survey = Survey.objects.get(slug = slug)

    title = f'Pass Survey: {survey.title}'

    if request.method == 'POST':

        survey_response = SurveyResponse(survey = survey)
        survey_response.save()
        
        questions_ids = [id for id in survey.question_set.values_list('id', flat=True)]
        
        for question_id in questions_ids:
            question = Question.objects.get(id = question_id)

            if question.type == 'checkbox':
                form_answer = request.POST.getlist(f'question_{question_id}')
            else:
                form_answer = request.POST.get(f'question_{question_id}')

            if form_answer:
                if type(form_answer) == list:
                    answer = ', '.join(form_answer)
                else:
                    answer = form_answer

                if question.type == 'radio' or question.type == 'select':
                    choice = Choice.objects.get(id = int(answer))
                    choice.votes += 1
                    choice.save()

                    answer = choice.choice_text

                response = Response(survey_response = survey_response, question = question, answer = answer)
                response.save()

        message = 'Survey passed successfully!'
        print(message)


    context = {
        'title': title,
        'survey': survey,
    }

    return render(request, 'passSurvey.html', context)