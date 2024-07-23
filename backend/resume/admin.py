from django.contrib import admin
from .models import Resume, Experience, Section, BulletPoint

# Register your models here.
class BulletPointInline(admin.StackedInline):
    model = BulletPoint
    extra = 1

class ExperienceInline(admin.StackedInline):
    model = Experience
    extra = 1
    inlines = [BulletPointInline]

class SectionInline(admin.StackedInline):
    model = Section
    extra = 1
    inlines = [ExperienceInline]

class ResumeAdmin(admin.ModelAdmin):
    inlines = [SectionInline]

admin.site.register(Resume, ResumeAdmin)
admin.site.register(Section)
admin.site.register(Experience)
admin.site.register(BulletPoint)