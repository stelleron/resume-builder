from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ResumeSerializer, SectionSerializer, ExperienceSerializer, BulletListSerializer, BulletPointSerializer
from .models import Resume, Section, Experience, BulletPoint, BulletList

# Create your views here.
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

class BulletListViewSet(viewsets.ModelViewSet):
    queryset = BulletList.objects.all()
    serializer_class = BulletListSerializer