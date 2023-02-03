from django.db import models
from django.utils.text import slugify
from django.conf import settings

# Create your models here.

class Survey(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.slug is None:
            slug = slugify(self.title)
            has_slug = Survey.objects.filter(slug=slug).exists()
            count = 1
            while has_slug:
                count += 1
                slug = slugify(self.title) + '-' + str(count)
                has_slug = Survey.objects.filter(slug=slug).exists()

            self.slug = slug
        
        super().save(*args, **kwargs)
    
    def get_questions(self):
        return self.question_set.all()

    def get_responses_count(self):
        return self.surveyresponse_set.count()

QESTIONS_TYPES = (
    ('text', 'Text'),
    ('textarea', 'Textarea'),
    ('number', 'Number'),
    ('date', 'Date'),
    ('radio', 'Radio'),
    ('checkbox', 'Checkbox'),
    ('select', 'Select'),
)
class Question(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    type = models.CharField(max_length=8, choices=QESTIONS_TYPES)
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

    def get_choices(self):
        return self.choice_set.all()
    
    def get_responses(self):
        return self.response_set.all()
    
    def get_total_choices_votes(self):
        if self.type == 'radio' or self.type == 'checkbox' or self.type == 'select':
            total = 0
            for choice in self.get_choices():
                total += choice.votes
            return total
        else:
            return None

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=255)
    votes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.choice_text

class SurveyResponse(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.survey.title

class Response(models.Model):
    survey_response = models.ForeignKey(SurveyResponse, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question.text + ' - ' + self.answer