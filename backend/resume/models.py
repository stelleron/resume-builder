from django.db import models

# Create your models here.
class Resume(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    linkedin = models.CharField(max_length=120, blank=True, null=True)
    github = models.CharField(max_length=120, blank=True, null=True)


    def __str__(self):
        return self.name + "'s Resume"
    
class Section(models.Model):
    name = models.CharField(max_length=20)
    resume = models.ForeignKey(Resume, related_name="sections", on_delete=models.CASCADE)

class Experience(models.Model):
    title = models.CharField(max_length=120, blank=True, null=True)
    sub_title = models.CharField(max_length=120, blank=True, null=True)
    time_period = models.CharField(max_length=40, blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    section = models.ForeignKey(Section, related_name="experiences", on_delete=models.CASCADE)

class BulletPoint(models.Model):
    experience = models.ForeignKey(Experience, related_name="bullet_points", on_delete=models.CASCADE)
    text = models.TextField()

class BulletList(models.Model):
    section = models.ForeignKey(Section, related_name="bullet_list", on_delete=models.CASCADE)
    text = models.TextField()