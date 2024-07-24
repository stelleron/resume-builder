from rest_framework import serializers
from .models import Resume, Section, Experience, BulletPoint, UserData

class BulletPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulletPoint
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    bullet_points = BulletPointSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Section
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = '__all__'

class UserDataSerializer(serializers.ModelSerializer):
    resume = ResumeSerializer(many=True, read_only=True)

    class Meta:
        model = UserData
        fields = '__all__'

