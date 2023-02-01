# Generated by Django 4.1.5 on 2023-02-01 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0005_questiontype_rename_question_text_question_text_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='type',
            field=models.CharField(choices=[('text', 'Text'), ('number', 'Number'), ('date', 'Date'), ('radio', 'Radio'), ('checkbox', 'Checkbox'), ('select', 'Select')], max_length=8),
        ),
        migrations.DeleteModel(
            name='QuestionType',
        ),
    ]