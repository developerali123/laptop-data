from rest_framework.routers import DefaultRouter
from .views import IntegrationViewSet, StoreListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

router = DefaultRouter()
router.register(r'integrations', IntegrationViewSet, basename='integration')

urlpatterns = router.urls + [
    # JWT Auth endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('store-list/', StoreListView.as_view(), name='store-list'),
]
