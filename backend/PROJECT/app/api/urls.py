from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet,ProductsFormSet,update_product,delete_product,product_user,update_panierplus,update_paniermoins,login,content_based,Recommended_for_you,signup,test_token,add_panier,logout,ProductViewSet,ClusterViewSet,ProductsViewSet,ClusterViewSet,panier_view,create_product,history,add_products,messageAPIView,get_message
from .views import get_users

router = DefaultRouter()
router.register(r'posts', ProductViewSet)
router1 = DefaultRouter()
router1.register(r'products', ProductsViewSet)
router2 = DefaultRouter()
router2.register(r'cluster', ClusterViewSet)
router3 = DefaultRouter()
router3.register(r'constpro',ProductsFormSet)


urlpatterns = [
    path('', include(router.urls)),
    path('', include(router1.urls)),
    path('', include(router2.urls)),
    path('', include(router3.urls)),
    path('constpro/<int:pk>/', ProductsFormSet.as_view({'get': 'retrieve'}), name='ProductsFormSet'),
    path('input', create_product, name='create_product'),
    
    path('posts/<int:pk>/', ProductViewSet.as_view({'get': 'retrieve'}), name='posts'),
    path('login', login,name='login'),
    path('logout',logout,name='logout'),
    path('signup', signup,name='signup'),
    path('test_token', test_token,name='test_token'),
    path('history',history,name='history'),
    path('add_products',add_products,name='add_products'),
    path('messageAPIView',messageAPIView,name='messageAPIView'),
    path('get_message',get_message,name='get_message'),
    path('get_users',get_users,name='get_users'),
    path('add_panier',add_panier,name='add_panier'),
    path('panier/', panier_view,name='panier'),
    path('content_based', content_based,name='content_based'),
    path('Recommended_for_you',Recommended_for_you,name='Recommended_for_you'),
    path('update_panierplus',update_panierplus,name='update_panierplus'),
    path('update_paniermoins',update_paniermoins,name='update_paniermoins'),
    path('product_user/', product_user,name='product_user'),
    path('delete_product/', delete_product,name='delete_product'),
    path('update_product/', update_product,name='update_product'), 
    path('cluster_details/<int:pk>/', ClusterViewSet.as_view({'get': 'retrieve'}), name='cluster_details'),
]