from django.db import models

# Create your models here.
class Category(models.Model):
    CategoryId = models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=500)

class Item(models.Model):
    ItemId = models.AutoField(primary_key=True)
    ItemName = models.CharField(max_length=500)
    ItemDescription = models.CharField(max_length=500)
    ItemPrice = models.DecimalField(max_digits=10, decimal_places=2)
    ItemCategory = models.CharField(max_length=500)
    ItemImage = models.CharField(max_length=500)
    ItemStock = models.IntegerField()