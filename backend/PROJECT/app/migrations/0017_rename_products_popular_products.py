# Generated by Django 5.0.4 on 2024-05-28 09:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_rename_productsforme_all_products'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Products',
            new_name='Popular_products',
        ),
    ]
