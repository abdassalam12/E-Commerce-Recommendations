# Generated by Django 5.0.4 on 2024-05-03 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='user',
        ),
    ]
