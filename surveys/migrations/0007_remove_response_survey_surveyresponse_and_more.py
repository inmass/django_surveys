# Generated by Django 4.1.5 on 2023-02-01 21:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0006_alter_question_type_delete_questiontype'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='response',
            name='survey',
        ),
        migrations.CreateModel(
            name='SurveyResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.survey')),
            ],
        ),
        migrations.AddField(
            model_name='response',
            name='survey_response',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='surveys.surveyresponse'),
            preserve_default=False,
        ),
    ]
