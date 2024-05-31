from django.db import models
from django.contrib.auth.models import AbstractUser

class Message(models.Model):
    username = models.CharField(max_length=40)
    destination = models.CharField(max_length=40)
    message = models.CharField(max_length=20000)

class User(AbstractUser):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    address = models.CharField(max_length=500)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    billing = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class ALL_products(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=2000)
    img_link = models.CharField(max_length=2000)
    price = models.CharField(max_length=2000)
    rating = models.CharField(max_length=2000)
    reviews = models.CharField(max_length=20000)
    availability = models.CharField(max_length=200000)
    description = models.CharField(max_length=2000000)

class Popular_products(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=2000)
    img_link = models.CharField(max_length=2000)
    price = models.CharField(max_length=2000)
    rating = models.CharField(max_length=2000)
    reviews = models.CharField(max_length=20000)
    availability = models.CharField(max_length=200000)
    description = models.CharField(max_length=2000000)
    def __str__(self):
        return f"Post: , {self.title}"
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        
class Clustered_Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.IntegerField()
    title = models.CharField(max_length=2000)
    img_link = models.CharField(max_length=2000)
    price = models.CharField(max_length=2000)
    rating = models.CharField(max_length=2000)
    reviews = models.CharField(max_length=20000)
    availability = models.CharField(max_length=200000)
    cluster = models.CharField(max_length=200)
    description = models.CharField(max_length=2000000)
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
            

class Recommended_products(models.Model):
    product_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=2000)
    img_link = models.CharField(max_length=2000)
    price = models.CharField(max_length=2000)
    rating = models.CharField(max_length=2000)
    reviews = models.CharField(max_length=20000)
    availability = models.CharField(max_length=200000)
    description = models.CharField(max_length=2000000)
            
            

class Panier(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    product = models.ForeignKey(Popular_products,on_delete=models.SET_NULL, related_name='panier', null=True, blank=True)
    title = models.CharField(max_length=2000)
    img_link = models.CharField(max_length=2000)
    price = models.CharField(max_length=2000)
    rating = models.CharField(max_length=2000)
    reviews = models.CharField(max_length=20000)
    availability = models.CharField(max_length=200000)
    description = models.CharField(max_length=200000)
    # Add other product fields as needed

# user=self.user,
class Searched_Titles(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=2000)
        




