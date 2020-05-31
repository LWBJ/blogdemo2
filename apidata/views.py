from django.shortcuts import render
from rest_framework import viewsets, permissions
from apidata.models import MainMeal, MainMealInstance, Snack, SnackInstance, Drink, DrinkInstance, Day
from apidata.serializers import MainMealSerializer, MainMealInstanceSerializer, SnackSerializer, SnackInstanceSerializer, DrinkSerializer, DrinkInstanceSerializer, DaySerializer
from django.db.models import F, Count

# Create your views here.
class MainMealViewset(viewsets.ModelViewSet):
  queryset = MainMeal.objects.all()
  serializer_class = MainMealSerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def get_queryset(self):
    queryset = self.queryset
    
    name = self.request.query_params.get('name', False)
    if name:
      queryset = queryset.filter(name__icontains=name)
    
    lower = self.request.query_params.get('lower', False)
    if lower:
      queryset = queryset.filter(calories__lt=lower)
      
    greater = self.request.query_params.get('greater', False)
    if greater:
      queryset = queryset.filter(calories__gt=greater)
    
    before = self.request.query_params.get('before', False)
    if before:
       queryset = queryset.filter(days__date__lt=before).distinct()    
       
    after = self.request.query_params.get('after', False)
    if after:
       queryset = queryset.filter(days__date__gt=after).distinct()
    
    order = self.request.query_params.get('order', False)
    if order:
      queryset = queryset.order_by(order)
      
    return queryset
  
  def perform_update(self, serializer):
    instance = serializer.save()
    for day in instance.days.distinct():
      day.calories = day.get_calorie_count()
      day.save()
      
  def perform_destroy(self, instance):
    day_set = instance.days.distinct()
    day_list = []
    for day in day_set:
      day_list.append(day)
      
    instance.delete()
    for day2 in day_set:
      day2.calories = day2.get_calorie_count()
      day2.save()
      
  
class MainMealInstanceViewset(viewsets.ModelViewSet):
  queryset = MainMealInstance.objects.all()
  serializer_class = MainMealInstanceSerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def perform_create(self, serializer):
    instance = serializer.save()
    day = instance.day
    day.calories = day.get_calorie_count()
    day.save()
    
  def perform_destroy(self, instance):
    day = instance.day
    instance.delete()
    day.calories = day.get_calorie_count()
    day.save()

class SnackViewset(viewsets.ModelViewSet):
  queryset = Snack.objects.all()
  serializer_class = SnackSerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def get_queryset(self):
    queryset = self.queryset
    
    name = self.request.query_params.get('name', False)
    if name:
      queryset = queryset.filter(name__icontains=name)
    
    lower = self.request.query_params.get('lower', False)
    if lower:
      queryset = queryset.filter(calories__lt=lower)
      
    greater = self.request.query_params.get('greater', False)
    if greater:
      queryset = queryset.filter(calories__gt=greater)
    
    before = self.request.query_params.get('before', False)
    if before:
       queryset = queryset.filter(days__date__lt=before).distinct()    
       
    after = self.request.query_params.get('after', False)
    if after:
       queryset = queryset.filter(days__date__gt=after).distinct()
    
    order = self.request.query_params.get('order', False)
    if order:
      queryset = queryset.order_by(order)
      
    return queryset
  
  def perform_update(self, serializer):
    instance = serializer.save()
    for day in instance.days.distinct():
      day.calories = day.get_calorie_count()
      day.save()
      
  def perform_destroy(self, instance):
    day_set = instance.days.distinct()
    day_list = []
    for day in day_set:
      day_list.append(day)
      
    instance.delete()
    for day2 in day_set:
      day2.calories = day2.get_calorie_count()
      day2.save()
  
class SnackInstanceViewset(viewsets.ModelViewSet):
  queryset = SnackInstance.objects.all()
  serializer_class = SnackInstanceSerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def perform_create(self, serializer):
    instance = serializer.save()
    day = instance.day
    day.calories = day.get_calorie_count()
    day.save()
    
  def perform_destroy(self, instance):
    day = instance.day
    instance.delete()
    day.calories = day.get_calorie_count()
    day.save()

class DrinkViewset(viewsets.ModelViewSet):
  queryset = Drink.objects.all()
  serializer_class = DrinkSerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def get_queryset(self):
    queryset = self.queryset
    
    name = self.request.query_params.get('name', False)
    if name:
      queryset = queryset.filter(name__icontains=name)
    
    lower = self.request.query_params.get('lower', False)
    if lower:
      queryset = queryset.filter(calories__lt=lower)
      
    greater = self.request.query_params.get('greater', False)
    if greater:
      queryset = queryset.filter(calories__gt=greater)
    
    before = self.request.query_params.get('before', False)
    if before:
       queryset = queryset.filter(days__date__lt=before).distinct()    
       
    after = self.request.query_params.get('after', False)
    if after:
       queryset = queryset.filter(days__date__gt=after).distinct()
    
    order = self.request.query_params.get('order', False)
    if order:
      queryset = queryset.order_by(order)
      
    return queryset
    
  def perform_update(self, serializer):
    instance = serializer.save()
    for day in instance.days.distinct():
      day.calories = day.get_calorie_count()
      day.save()
      
  def perform_destroy(self, instance):
    day_set = instance.days.distinct()
    day_list = []
    for day in day_set:
      day_list.append(day)
      
    instance.delete()
    for day2 in day_set:
      day2.calories = day2.get_calorie_count()
      day2.save()
  
class DrinkInstanceViewset(viewsets.ModelViewSet):
  queryset = DrinkInstance.objects.all()
  serializer_class = DrinkInstanceSerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def perform_create(self, serializer):
    instance = serializer.save()
    day = instance.day
    day.calories = day.get_calorie_count()
    day.save()
    
  def perform_destroy(self, instance):
    day = instance.day
    instance.delete()
    day.calories = day.get_calorie_count()
    day.save()

class DayViewset(viewsets.ModelViewSet):
  queryset = Day.objects.all()
  serializer_class = DaySerializer
  #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def get_queryset(self):
    queryset = self.queryset
    
    before = self.request.query_params.get('before', False)
    if before:
      queryset = queryset.filter(date__lt=before)
    
    after = self.request.query_params.get('after', False)
    if after:
      queryset = queryset.filter(date__gt=after)
    
    calories_lower = self.request.query_params.get('lower', False)
    if calories_lower:
      queryset = queryset.filter(calories__lt=calories_lower)
      
    calories_higher = self.request.query_params.get('higher', False)
    if calories_higher:
      queryset = queryset.filter(calories__gt=calories_higher)
    
    meal = self.request.query_params.get('meal', False)
    if meal:
      queryset = queryset.filter(meals__name__icontains=meal)
      
    snack = self.request.query_params.get('snack', False)
    if snack:
      queryset = queryset.filter(snacks__name__icontains=snack)
      
    drink = self.request.query_params.get('drink', False)
    if drink:
      queryset = queryset.filter(drinks__name__icontains=drink)
    
    order = self.request.query_params.get('order', False)
    if order:
      queryset = queryset.order_by(order)
      
    return queryset
  