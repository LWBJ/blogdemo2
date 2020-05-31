from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apidata.views import MainMealViewset, MainMealInstanceViewset, SnackViewset, SnackInstanceViewset, DrinkViewset, DrinkInstanceViewset, DayViewset
from rest_framework import urls

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
    path('api-auth', include(urls))
]