from rest_framework import serializers
from apidata.models import MainMeal, MainMealInstance, Snack, SnackInstance, Drink, DrinkInstance, Day
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MainMealSerializer(serializers.HyperlinkedModelSerializer):
  days = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='day-detail')
  days_text = serializers.SerializerMethodField()

  class Meta:
    model = MainMeal
    fields = '__all__'
    
  def get_days_text(self, obj):
    set = []
    for i in obj.days.all():
      set.append(str(i.date))
      
    return set[0:100]
    
class MainMealInstanceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = MainMealInstance
    fields = '__all__'

class SnackSerializer(serializers.HyperlinkedModelSerializer):
  days = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='day-detail')
  days_text = serializers.SerializerMethodField()

  class Meta:
    model = Snack
    fields = '__all__'
    
  def get_days_text(self, obj):
    set = []
    for i in obj.days.all():
      set.append(str(i.date))
      
    return set[0:100]

class SnackInstanceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = SnackInstance
    fields = '__all__'

class DrinkSerializer(serializers.HyperlinkedModelSerializer):
  days = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='day-detail')
  days_text = serializers.SerializerMethodField()

  class Meta:
    model = Drink
    fields = '__all__'
    
  def get_days_text(self, obj):
    set = []
    for i in obj.days.all():
      set.append(str(i.date))
      
    return set[0:100]

class DrinkInstanceSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = DrinkInstance
    fields = '__all__'

class MainMealInfo(serializers.HyperlinkedModelSerializer):
  meal_name = serializers.SerializerMethodField()
  
  class Meta:
    model = MainMealInstance
    fields = ['meal_name', 'url']
    
  def get_meal_name(self, obj):
    return obj.mainMeal.name
    
class SnackInfo(serializers.HyperlinkedModelSerializer):
  snack_name = serializers.SerializerMethodField()
  
  class Meta:
    model = SnackInstance
    fields = ['snack_name', 'url']
    
  def get_snack_name(self, obj):
    return obj.snack.name
    
class DrinkInfo(serializers.HyperlinkedModelSerializer):
  drink_name = serializers.SerializerMethodField()
  
  class Meta:
    model = DrinkInstance
    fields = ['drink_name', 'url']
    
  def get_drink_name(self, obj):
    return obj.drink.name

class DaySerializer(serializers.HyperlinkedModelSerializer):
  meals_set = serializers.SerializerMethodField()
  snacks_set = serializers.SerializerMethodField()
  drinks_set = serializers.SerializerMethodField()
  
  main_meal_instances = MainMealInfo(many=True, read_only=True)
  snack_instances = SnackInfo(many=True, read_only=True)
  drink_instances = DrinkInfo(many=True, read_only=True)
  
  class Meta:
    model = Day
    fields = '__all__'
    
  def get_meals_set(self, obj):
    set = []
    for i in obj.meals.all():
      set.append(str(i))
      
    return set[0:100]
  
  def get_snacks_set(self, obj):
    set = []
    for i in obj.snacks.all():
      set.append(str(i))
      
    return set[0:100]
    
  def get_drinks_set(self, obj):
    set = []
    for i in obj.drinks.all():
      set.append(str(i))
      
    return set[0:100]
    
    
class UserDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username

        return data