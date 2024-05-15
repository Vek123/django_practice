from rest_framework import routers

from catalog.views import ProductsListApiViewSet, ProductsDetailApiViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductsListApiViewSet, basename="products")
router.register(r'products', ProductsDetailApiViewSet, basename="product")
