from rest_framework import serializers
from .models import Resume, Section, Experience, BulletList, BulletPoint

class BulletPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulletPoint
        fields = ['id', 'text']

class BulletListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulletList
        fields = ['id', 'text']

class ExperienceSerializer(serializers.ModelSerializer):
    bullet_points = BulletPointSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = ['id', 'title', 'sub_title', 'time_period', 'location', 'bullet_points']

class SectionSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, read_only=True)
    bullet_list = BulletListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Section
        fields = ['id', 'name', 'experiences', 'bullet_list']

class ResumeSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = ['id', 'name', 'email', 'phone', 'linkedin', 'github', 'sections']

