from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from InventoryApp.models import Item, Category
from InventoryApp.serializers import ItemSerializer, CategorySerializer
from django.core.files.storage import default_storage



# Create your views here.

@csrf_exempt
def itemApi(request, id=0):
    if request.method=='GET':
        items = Item.objects.all()
        items_serializer = ItemSerializer(items, many=True)
        return JsonResponse(items_serializer.data, safe=False)
    elif request.method=='POST':
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        item_data = JSONParser().parse(request)
        item = Item.objects.get(ItemId=item_data['ItemId'])
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method=='DELETE':
        item = Item.objects.get(ItemId=id)
        item.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt
def categoryApi(request, id=0):
    if request.method=='GET':
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)
    elif request.method=='POST':
        category_data = JSONParser().parse(request)
        category_serializer = CategorySerializer(data=category_data)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        category_data = JSONParser().parse(request)
        category = Category.objects.get(CategoryId=category_data['CategoryId'])
        category_serializer = CategorySerializer(category, data=category_data)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method=='DELETE':
        category = Category.objects.get(CategoryId=id)
        category.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)