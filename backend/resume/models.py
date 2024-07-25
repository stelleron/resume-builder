from django.db import models

# Create your models here.
class UserData(models.Model):
    username = models.CharField(max_length=100)

class Resume(models.Model):
    user = models.ForeignKey(UserData, related_name="resume", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    linkedin = models.CharField(max_length=120, blank=True, null=True)
    github = models.CharField(max_length=120, blank=True, null=True)

    def __str__(self):
        return self.name + "'s Resume"
    
class Section(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(UserData, related_name="sections", on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, related_name="sections", on_delete=models.CASCADE, blank=True, null=True)

class Experience(models.Model):
    title = models.CharField(max_length=120, blank=True, null=True)
    sub_title = models.CharField(max_length=120, blank=True, null=True)
    time_period = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    display = models.BooleanField()
    section = models.ForeignKey(Section, related_name="experiences", on_delete=models.CASCADE)

class BulletPoint(models.Model):
    experience = models.ForeignKey(Experience, related_name="bullet_points", on_delete=models.CASCADE)
    text = models.TextField()