from django import forms
from rest_framework.serializers import ModelSerializer
from ..models import Popular_products,Clustered_Products,User

class UserSerializer(forms.ModelForm):
    class Meta:
        model = User
        fields='__all__'

class ClusterSerializer(forms.ModelForm):
    class Meta:
        model = Clustered_Products
        fields='__all__'
class PostSerializer(ModelSerializer):
    class Meta:
        model = Popular_products
        fields = ['id', 'title', 'img_link','price','rating','reviews','availability']
class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Popular_products
        fields = ['id', 'title', 'img_link', 'price', 'rating', 'reviews', 'availability','description']
class InputSerializer(ModelSerializer):
    class Meta:
        model = input
        fields = ['input']