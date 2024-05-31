# Generated by Django 5.0.4 on 2024-05-10 22:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_message'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clustered_Products_Details',
            fields=[
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='app.clustered_products')),
                ('title', models.CharField(max_length=2000)),
                ('img_link', models.CharField(max_length=2000)),
                ('price', models.CharField(max_length=2000)),
                ('rating', models.CharField(max_length=2000)),
                ('reviews', models.CharField(max_length=20000)),
                ('availability', models.CharField(max_length=200000)),
                ('cluster', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=2000000)),
            ],
        ),
    ]
