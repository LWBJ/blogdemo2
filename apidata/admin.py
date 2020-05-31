from django.contrib import admin
from apidata.models import Day, MainMeal, MainMealInstance, Snack, SnackInstance, Drink, DrinkInstance

# Register your models here.

class MainMealInstanceInline(admin.TabularInline):
  model = MainMealInstance
  
class SnackInstanceInline(admin.TabularInline):
  model = SnackInstance
  
class DrinkInstanceInline(admin.TabularInline):
  model = DrinkInstance

class DayAdmin(admin.ModelAdmin):
  list_display = ['date', 'meal_list', 'snack_list', 'drink_list', 'calories']
  inlines = [MainMealInstanceInline, SnackInstanceInline, DrinkInstanceInline]

admin.site.register(Day, DayAdmin)
admin.site.register(MainMeal)
admin.site.register(MainMealInstance)
admin.site.register(Snack)
admin.site.register(SnackInstance)
admin.site.register(Drink)
admin.site.register(DrinkInstance)