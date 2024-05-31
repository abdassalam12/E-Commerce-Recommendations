from django.shortcuts import HttpResponse
from .models import Popular_products,ALL_products
import pandas as pd
import re
from .models import User
def add_csv_product(request):
        data = pd.read_csv('app/amazon_data.csv')
        pattern = r'\d+\.\d+'
        user = User.objects.get(email='naciriabdassalam123@gmail.com')
        print(user)
        Popular_products.objects.all().delete()

        for index, row in data.iterrows():
            match = re.search(pattern, row['rating'])
            product = Popular_products.objects.create(
                user = user,
                title=row['title'],
                price=row["price"],
                rating=row['rating'],
                reviews=row['reviews'],
                availability=row['availability'],
                img_link=row['img'],
                description = row['description'],
            )

            product.save()

        return HttpResponse('success')
            
def add_csv_Productsforme(request):
        data = pd.read_csv('app/amazon_data.csv')
        pattern = r'\d+\.\d+'
        user = User.objects.get(email='naciriabdassalam123@gmail.com')
        print(user)
        ALL_products.objects.all().delete()

        for index, row in data.iterrows():
            match = re.search(pattern, row['rating'])
            product = ALL_products.objects.create(
                user = user,
                title=row['title'],
                price=row["price"],
                rating=row['rating'],
                reviews=row['reviews'],
                availability=row['availability'],
                img_link=row['img'],
                description = row['description'],
            )

            product.save()

        return HttpResponse('success')
            