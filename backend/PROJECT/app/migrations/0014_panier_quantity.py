# Generated by Django 5.0.4 on 2024-05-22 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_panier_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='panier',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]