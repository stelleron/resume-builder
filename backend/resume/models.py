from django.db import models

# Create your models here.
class Resume(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    linkedin = models.CharField(max_length=120)
    github = models.CharField(max_length=120)


    def __str__(self):
        return self.name + "'s Resume"
    
class Section(models.Model):
    resume = models.ForeignKey(Resume, related_name="sections", on_delete=models.CASCADE)
    category = models.CharField(max_length=20)

class Experience(models.Model):
    section = models.ForeignKey(Section, related_name="experiences", on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    sub_title = models.CharField(max_length=120)
    time_period = models.CharField(max_length=40)

class BulletPoint(models.Model):
    experience = models.ForeignKey(Experience, related_name="bullet_points", on_delete=models.CASCADE)
    text = models.TextField()

class BulletList(models.Model):
    section = models.ForeignKey(Section, related_name="bullet_list", on_delete=models.CASCADE)
    text = models.TextField()