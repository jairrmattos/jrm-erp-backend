from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(request):
    return HttpResponse("🚀 O app ERP está funcionando com sucesso!")

