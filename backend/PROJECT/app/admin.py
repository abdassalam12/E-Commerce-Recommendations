from django.contrib import admin
from .models import User,Searched_Titles,Message,Panier
from .models import ALL_products,Recommended_products,Popular_products,Clustered_Products

admin.site.register(User)
admin.site.register(Popular_products)
admin.site.register(Clustered_Products)
admin.site.register(Searched_Titles)
admin.site.register(Message)
admin.site.register(Panier)
admin.site.register(Recommended_products)
admin.site.register(ALL_products)
