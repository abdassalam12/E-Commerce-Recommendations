# Generated by Django 5.0.4 on 2024-05-10 22:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_clustered_products_details'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clustered_products_details',
            name='cluster',
        ),
    ]
