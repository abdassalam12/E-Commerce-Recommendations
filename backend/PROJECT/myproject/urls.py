
from django.urls import re_path,path,include
from django.contrib import admin
from app.views import add_csv_product,add_csv_Productsforme
urlpatterns = [
    path('api/',include('app.api.urls')),
    path('admin/', admin.site.urls),
    path('add_csv_product/',add_csv_product,name='add_csv_product'),
    path('add_csv_Productsforme/',add_csv_Productsforme,name='add_csv_Productsforme'),
    
]
