from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ResumeSerializer, SectionSerializer, ExperienceSerializer, BulletPointSerializer, UserDataSerializer
from .models import Resume, Section, Experience, BulletPoint, UserData

# Create your views here.
class UserDataViewSet(viewsets.ModelViewSet):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class BulletPointViewSet(viewsets.ModelViewSet):
    queryset = BulletPoint.objects.all()
    serializer_class = BulletPointSerializer
