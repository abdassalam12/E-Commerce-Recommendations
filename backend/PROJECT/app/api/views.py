from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import User

from rest_framework.authtoken.models import Token

from .serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from .serializers import PostSerializer,ProductsSerializer,ClusterSerializer 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pickle
import pandas as pd
import re
from ..models import Popular_products,Clustered_Products,Searched_Titles,Message,Panier,Recommended_products,ALL_products
import os  
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np 
from sklearn.metrics.pairwise import cosine_similarity
from .pusher import pusher_client
from django.db.models import Q
from sklearn.cluster import KMeans
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404



from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
#const token = Cookies.get('token'); // Retrieve token from cookie
#const response = await axios.post('http://127.0.0.1:8000/api/add_panier', {
#type:'cluster',
#title:product.title,
#    }


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_product(request):
    print("hello")
    if request.method == 'POST':
        user = request.user
        title = request.data.get('title')
        try:
           panier = Popular_products.objects.filter(title=title,user=user).first()
        except:
            pass
        
        try:
           arb = ALL_products.objects.filter(title=title,user=user).first()
        except:
            pass
        
        try:
           a = Clustered_Products.objects.filter(title=title,user=user).first()
        except:
            pass
        panier.delete()
        arb.delete()
        a.delete()
        return Response('product deleted')

import numpy as np
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_product(request):
    print("hello")
    if request.method == 'POST':
        user = request.user
        titlekdim = request.data.get('titlekdim')
        price = request.data.get('price')
        title = request.data.get('title')
        quantity =  request.data.get('quantity')
        description = request.data.get('description')
        amazon_data = pd.read_csv("app/amazon_data.csv")
        index_to_update = amazon_data[amazon_data['title'] == titlekdim].index
        if not index_to_update.empty:
            idx = index_to_update[0]
            amazon_data.at[idx, 'title'] = title
            amazon_data.at[idx, 'price'] = price
            amazon_data.at[idx, 'availability'] = quantity
            amazon_data.at[idx, 'description'] = description

        # Save the updated DataFrame back to the CSV file
        amazon_data.to_csv("app/amazon_data.csv", index=False)
        
        try:
           panier = Popular_products.objects.filter(title=titlekdim,user=user).first()
           panier.title = title
           panier.price = price
           panier.availability = quantity
           panier.description = description 
           panier.save()
        except:
            pass
        try:
           a = ALL_products.objects.filter(title=titlekdim,user=user).first()
           a.title = title
           a.price = price
           a.availability = quantity
           a.description = description 
           a.save()
        except:
           pass
        try:
           ab = Clustered_Products.objects.filter(title=titlekdim,user=user).first()
           ab.title = title
           ab.price = price
           ab.availability = quantity
           ab.description = description 
           ab.save()
        except:
           pass
        amazon_data = pd.read_csv("app/amazon_data.csv")
        titles = amazon_data['title']
        vectorizer = TfidfVectorizer(stop_words='english')  
        tfidf_matrix = vectorizer.fit_transform(titles)

        k = 40
        print('k : ',k)
        kmeans = KMeans(n_clusters=k)
        kmeans.fit(tfidf_matrix)

        vectorizer_path = 'app/api/tfidf_vectorizer.pkl'
        model_path = 'app/api/kmeans_model.pkl'

        with open(vectorizer_path, 'wb') as file:
            pickle.dump(vectorizer, file)

        with open(model_path, 'wb') as file:
            pickle.dump(kmeans, file)
        first_product = Popular_products.objects.order_by('id').first()
        first_product = int(first_product.id)
        amazon_data_len = len(amazon_data)
        id_range = range(first_product, first_product + len(amazon_data))

        amazon_data['product_id'] = list(id_range)
        amazon_data['cluster'] = kmeans.labels_
        all_columns = amazon_data.columns


        columns_to_drop = [col for col in all_columns if col.startswith('Unnamed: 0')]

        # Drop the columns
        amazon_data.drop(columns=columns_to_drop, inplace=True)
        amazon_data.to_csv('app/api/Constant_cluster.csv', index=False)
        
        return Response('product deleted')



@api_view(['POST'])  # Handle POST requests
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_panier(request):
    # Access the data from the request body

    id = request.data.get('id')
    if id == 'hala':
        
        title = request.data.get('title')
        print(title)
        product = Popular_products.objects.filter(title=title).first()
    else:
        product = Popular_products.objects.filter(id=id).first()
        
    
    if not id:
        return Response({'message': 'Product ID not provided'}, status=400)
    
    # Fetch the product using the provided ID
    try : 
        panier = Panier.objects.create(
            user=request.user,
            product=product,
            title=product.title,
            img_link=product.img_link,
            price=product.price,
            availability=product.availability,
            description=product.description,
            rating=0,
            reviews=0
        )
        
        panier.save()  # Save the panier
    except:
        print('the id is not existing !!')
    
    return Response({'message': 'Product added to panier'}, status=200)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def product_user(request):
    if request.method == 'GET':
        user = request.user
        print(f"Authenticated user: {user}")
        popular_products = Popular_products.objects.filter(user=user).order_by('-id')[:10]
        serializer = ProductsSerializer(popular_products, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def panier_view(request):
    if request.method == 'GET':
        user = request.user
        print(f"Authenticated user: {user}")  # Print the authenticated user
        panier = Panier.objects.filter(user=user)
        serializer = PanierSerializer(panier, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def update_panierplus(request):
    if request.method == 'GET':
        try:
           id= request.query_params.get('productfocusedIdPlus')
        except:
           print('dont try please dont give me advices')
        if id is None:
            return Response('ID parameter is missing', status=400)
        if id != "":
            product = get_object_or_404(Panier, pk=id)
            product.quantity += 1
            product.save()
        return Response('Product quantity updated successfully')
    
@api_view(['GET'])
def update_paniermoins(request):
    if request.method == 'GET':
        try:
           id= request.query_params.get('productfocusedIdMoins')
        except:
           print('dont try please dont give me advices')
        if id is None:
            return Response('ID parameter is missing', status=400)
        if id != "":
            product = get_object_or_404(Panier, pk=id)
            product.quantity -= 1
            product.save()
        return Response('Product quantity updated successfully')



class UserSerializers(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    address = serializers.CharField(max_length=500)
    city = serializers.CharField(max_length=100)
    country = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    zipcode = serializers.CharField(max_length=100)
    billing = serializers.CharField(max_length=100)
    image = serializers.ImageField()


@api_view(['POST'])
def get_users(request):
    if request.method == 'POST':
        users = User.objects.all()  # Pass many=True to serialize queryset
        return Response([users.values()])


@api_view(['POST'])
def get_message(request):
    if request.method == 'POST':
        username = request.data['username']
        destination = request.data['destination']
        alba = Message.objects.all()
        message = alba.filter(Q(username=username, destination=destination) | Q(destination=username, username=destination))
        return Response([message.values()])



@api_view(['POST'])
def messageAPIView(request):
    if request.method =='POST':
        username = request.data['username']
        destination = request.data['destination']
        message = request.data['message']
        messages =  Message.objects.create(
            username = username,
            destination = destination,
            message =  message
        )
        messages.save()
        pusher_client.trigger('chat', 'message', {
            'username': username,
            'destination':destination,
            'message': message
        })
        return Response([])

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_products(request):
    print(request.user)
    print("hello")
    if request.method == 'GET':
            amazon_data = pd.read_csv("app/amazon_data.csv")
            title = request.query_params.get('title')
            img_link = request.query_params.get('img_link')
            price = request.query_params.get('price')  # Retrieve the raw password
            availability = request.query_params.get('availability')  # Hash the password
            description = request.query_params.get('description')
            
            new_row = {
                'title' : title,
                'price' : price, 
                'rating' : '4.5 out of 5 stars',
                'reviews' : '14,575 ratings',
                'availability' : availability,
                'img' : img_link,
                'description' : description,
                'user' : request.user
            }
            new_df = pd.DataFrame([new_row])
            amazon_data = pd.concat([amazon_data, new_df])
            
            alba = Popular_products.objects.create(
                user = request.user,
                title=title,
                img_link = img_link,
                price=price,
                availability=availability,
                description=description,
                rating=0,
                reviews=0
            )
            alba.save()
            another = ALL_products.objects.create(
                user = request.user,
                title=title,
                img_link = img_link,
                price=price,
                availability=availability,
                description=description,
                rating=0,
                reviews=0
            )
            another.save()
            # Product Added Seccess
            amazon_data.to_csv("app/amazon_data.csv", index=False)

            titles = amazon_data['title']
            vectorizer = TfidfVectorizer(stop_words='english')  
            tfidf_matrix = vectorizer.fit_transform(titles)
            num_rows = tfidf_matrix.shape[0]
            k = 40
            print('Number of rows:', num_rows)
            print('k:', k)
            kmeans = KMeans(n_clusters=k)
            kmeans.fit(tfidf_matrix)

            vectorizer_path = 'app/api/tfidf_vectorizer.pkl'
            model_path = 'app/api/kmeans_model.pkl'

            with open(vectorizer_path, 'wb') as file:
                pickle.dump(vectorizer, file)

            with open(model_path, 'wb') as file:
                pickle.dump(kmeans, file)
            first_product = Popular_products.objects.order_by('id').first()
            first_product = int(first_product.id)
            amazon_data_len = len(amazon_data)
            id_range = range(first_product, first_product + len(amazon_data))

            amazon_data['product_id'] = list(id_range)
            amazon_data['cluster'] = kmeans.labels_
            all_columns = amazon_data.columns

# Generate a list of columns to drop using list comprehension
            columns_to_drop = [col for col in all_columns if col.startswith('Unnamed: 0')]

            # Drop the columns
            amazon_data.drop(columns=columns_to_drop, inplace=True)
            amazon_data.to_csv('app/api/Constant_cluster.csv', index=False)


            return Response({'message': 'Data received and processed successfully'}, status=status.HTTP_201_CREATED)
    else:
            return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)




from sklearn.feature_extraction.text import CountVectorizer,TfidfVectorizer




# most popular products
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def history(request):
    if request.method == 'GET':
        print(request.data)
        searched_titles = request.query_params.get('name')
        alba = Searched_Titles.objects.create(
            user = request.user,
            title = searched_titles,
        )
        alba.save()
        searched_titles = Searched_Titles.objects.all()

        searched_titles = [a.title for a in searched_titles]
        df = pd.DataFrame()
        all_title = ALL_products.objects.all()
        
        all_titles = [a.title for a in all_title]
        all_img_link = [a.img_link for a in all_title]
        all_price = [a.price for a in all_title]
        all_rating = [a.rating for a in all_title]
        all_reviews = [a.reviews for a in all_title]
        all_availability = [a.availability for a in all_title]
        all_description = [a.description for a in all_title]

        # Use TF-IDF Vectorizer instead of CountVectorizer
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')

        X = tfidf_vectorizer.fit_transform(all_titles)

        searched_titles_vectorized = tfidf_vectorizer.transform(searched_titles)

        cosine_similarities = cosine_similarity(searched_titles_vectorized, X)

        print("Cosine similarities:")
        for i in range(len(cosine_similarities)):
            cosine_similarities[i] = cosine_similarities[i] * i * 2 / (len(cosine_similarities))
        most_similar_indices = np.argsort(-np.sum(cosine_similarities, axis=0)).tolist()
        print(most_similar_indices[0])
        # # best_indexes = [all_titles[idx] for idx in most_similar_indices[0]]
        i = 4479
        product = Popular_products.objects.all()
        product.delete()
        for index in most_similar_indices:
            alba = Popular_products.objects.create(
                user = request.user,
                title=all_titles[index],
                price=all_price[index],
                rating=all_rating[index],
                reviews=all_reviews[index],
                availability=all_availability[index],
                img_link=all_img_link[index],
                description=all_description[index]
            )
            alba.save()

        return Response({'message': 'title successfully registred'}, status=200)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
# most popular products



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def content_based(request):
    if request.method == 'GET':
        print(request.data)
        searched_titles = request.query_params.get('name')
        alba = Searched_Titles.objects.create(
            user=request.user,
            title=searched_titles,
        )
        alba.save()

        # Fetch user-specific search history
        user_search_history = Searched_Titles.objects.filter(user=request.user)
        user_searched_titles = [a.title for a in user_search_history]

        all_title = ALL_products.objects.all()
        all_ids = [a.id for a in all_title]
        all_titles = [a.title for a in all_title]
        all_img_link = [a.img_link for a in all_title]
        all_price = [a.price for a in all_title]
        all_rating = [a.rating for a in all_title]
        all_reviews = [a.reviews for a in all_title]
        all_availability = [a.availability for a in all_title]
        all_description = [a.description for a in all_title]

        count_vectorizer = CountVectorizer(stop_words='english')
        X = count_vectorizer.fit_transform(all_titles)
        user_searched_titles_vectorized = count_vectorizer.transform(user_searched_titles)
        cosine_similarities = cosine_similarity(user_searched_titles_vectorized, X)
        print("Cosine similarities:")
        for i in range(len(cosine_similarities)):
            cosine_similarities[i] = cosine_similarities[i] * i * 2 / (len(cosine_similarities))
            
        print("Cosine similarities:")
        most_similar_indices = np.argsort(-np.sum(cosine_similarities, axis=0)).tolist()
        
        a = Recommended_products.objects.filter(user=request.user)
        a.delete()
        for index in most_similar_indices[0:10]:
            alba = Recommended_products.objects.create(
                user=request.user,
                product_id = all_ids[index],
                title=all_titles[index],
                price=all_price[index],
                rating=all_rating[index],
                reviews=all_reviews[index],
                availability=all_availability[index],
                img_link=all_img_link[index],
                description=all_description[index]
            )
            alba.save()

        return Response({'message': 'title successfully registered'}, status=200)
    else:
        return Response({'message': 'Method not allowed'}, status=405)





class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 400


class ProductViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Popular_products.objects.all()
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination


class ProductsViewSet(ModelViewSet):

    queryset = Popular_products.objects.all()
    serializer_class = ProductsSerializer

class PanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Panier
        fields = "__all__"

class ProductsViewSet(ModelViewSet):

    queryset = Popular_products.objects.all()
    serializer_class = ProductsSerializer
    
class ProductsFormSet(ModelViewSet):
    queryset = ALL_products.objects.all()
    serializer_class = ProductsSerializer
       

class Recommended_productsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommended_products
        fields = "__all__"
class ClusterViewSet(ModelViewSet):
    queryset = Clustered_Products.objects.all()
    serializer_class = ProductsSerializer

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def Recommended_for_you(request):
    if request.method == 'GET':
        user = request.user
        print(f"Authenticated user: {user}")  # Print the authenticated user
        recommended = Recommended_products.objects.filter(user=user)
        serializer = Recommended_productsSerializer(recommended, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response(request.user.username)


# Search update the cluster

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_product(request):
    print(request.user)
    vectorizer_path = 'app/api/tfidf_vectorizer.pkl'
    model_path = 'app/api/kmeans_model.pkl'
    with open(vectorizer_path, 'rb') as file:
        vectorizer = pickle.load(file)    
    with open(model_path, 'rb') as file:
        kmeans = pickle.load(file)
    if request.method == 'GET':

        input_data = request.query_params.get('name')
        print(input_data)

        new_text = [input_data]

        new_text_tfidf = vectorizer.transform(new_text)  

        predicted_cluster = kmeans.predict(new_text_tfidf)

        print("Predicted Cluster:", predicted_cluster)

    #     # # Load the clustered data from CSV
        clustered = pd.read_csv('app/api/Constant_cluster.csv')
        clustered = clustered[clustered["cluster"] == predicted_cluster[0]]
        queryset = Clustered_Products.objects.all()
        queryset.delete()
        for index, row in clustered.iterrows():
            print("hello")
            alba = Clustered_Products.objects.create(
                user = request.user,
                product_id = row['product_id'],
                title=row['title'],
                price=row["price"],
                rating=row['rating'],
                reviews=row['reviews'],
                availability=row['availability'],
                img_link=row['img'],
                description=row['description'],
                cluster=row['cluster']
            )
            alba.save()
        data = Clustered_Products.objects.all()
        return Response({'message': 'Data received and processed successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Search update the cluster


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        print(request.data)
        # Access the form data including the image
        full_name = request.data.get('fullName')
        email = request.data.get('email')
        raw_password = request.data.get('password')  # Retrieve the raw password
        password = make_password(raw_password)  # Hash the password
        address = request.data.get('address')
        city = request.data.get('city')
        country = request.data.get('country')
        state = request.data.get('state')
        zipcode = request.data.get('zipcode')
        billing = request.data.get('billing')
        image = request.FILES.get('image')

        user_profile = User.objects.create(
            full_name=full_name,
            username=full_name,
            password = password,
            email=email,
            address=address,
            city=city,
            country=country,
            state=state,
            zipcode=zipcode,
            billing=billing,
            image=image,
        )

        # Save both the user and profile instances
        user_profile.save()
        return Response({'message': 'Registration successful'}, status=200)
    else:
        return Response({'message': 'Method not allowed'}, status=405)

@api_view(['POST'])
def login(request):
    print(request.data)
    user = get_object_or_404(User, email=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializers(user)
    return Response({'token': token.key, 'user': serializer.data})


add_panier

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        try:
            # Get the token associated with the authenticated user
            token = Token.objects.get(user=request.user)
            # Delete the token
            token.delete()
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'message': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
