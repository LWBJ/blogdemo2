from django.db import models

# Create your models here.
class MainMeal(models.Model):
  name = models.CharField(max_length=100, unique=True)
  calories = models.IntegerField()
  
  class Meta:
    ordering = ['name']
    
  def __str__(self):
    return self.name

class Snack(models.Model):
  name = models.CharField(max_length=100, unique=True)
  calories = models.IntegerField()
  
  class Meta:
    ordering = ['name']
    
  def __str__(self):
    return self.name
    
class Drink(models.Model):
  name = models.CharField(max_length=100, unique=True)
  calories = models.IntegerField()
  
  class Meta:
    ordering = ['name']
    
  def __str__(self):
    return self.name

class Day(models.Model):
  date = models.DateField(unique=True)
  meals = models.ManyToManyField(MainMeal, through='MainMealInstance', related_name='days')
  snacks = models.ManyToManyField(Snack, through='SnackInstance', related_name='days')
  drinks = models.ManyToManyField(Drink, through='DrinkInstance', related_name='days')
  calories = models.IntegerField(blank=True, null=True)
  
  class Meta:
    ordering = ['-date']
    
  def __str__(self):
    return str(self.date)
  
  def get_calorie_count(self):
    total_calories = 0
    for i in self.meals.all():
      total_calories += i.calories
      
    for j in self.snacks.all():
      total_calories += j.calories
      
    for k in self.drinks.all():
      total_calories += k.calories
      
    return total_calories
  
  def snack_list(self):
    snacks = []
    for i in self.snacks.all():
      snacks.append(i.name)
      
    return snacks
      
  def drink_list(self):
    drinks = []
    for i in self.drinks.all():
      drinks.append(i.name)
      
    return drinks
    
  def meal_list(self):
    meals = []
    for i in self.meals.all():
      meals.append(i.name)
      
    return meals
  
class MainMealInstance(models.Model):
  mainMeal = models.ForeignKey(MainMeal, on_delete=models.CASCADE)
  day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='main_meal_instances')
  
  def __str__(self):
    return self.mainMeal.name
    
class SnackInstance(models.Model):
  snack = models.ForeignKey(Snack, on_delete=models.CASCADE)
  day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='snack_instances')
  
  def __str__(self):
    return self.snack.name
    
class DrinkInstance(models.Model):
  drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
  day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='drink_instances')
  
  def __str__(self):
    return self.drink.name
  
  