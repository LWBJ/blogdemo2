from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apidata.views import MainMealViewset, MainMealInstanceViewset, SnackViewset, SnackInstanceViewset, DrinkViewset, DrinkInstanceViewset, DayViewset, UserDataView, MyTokenObtainPairView
from rest_framework import urls
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()
router.register(r'MainMeal', MainMealViewset)
router.register(r'MainMealInstance', MainMealInstanceViewset)
router.register(r'Snack', SnackViewset)
router.register(r'SnackInstance', SnackInstanceViewset)
router.register(r'Drink', DrinkViewset)
router.register(r'DrinkInstance', DrinkInstanceViewset)
router.register(r'Day', DayViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth', include(urls)),
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token-refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('current-user', UserDataView.as_view(), name='current-user')
]