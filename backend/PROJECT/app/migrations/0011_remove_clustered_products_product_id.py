# Generated by Django 5.0.4 on 2024-05-22 10:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_clustered_products_product_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clustered_products',
            name='product_id',
        ),
    ]
