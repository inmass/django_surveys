# Generated by Django 4.1.5 on 2023-02-01 15:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0004_survey_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.RenameField(
            model_name='question',
            old_name='question_text',
            new_name='text',
        ),
        migrations.AddField(
            model_name='question',
            name='type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='surveys.questiontype'),
            preserve_default=False,
        ),
    ]