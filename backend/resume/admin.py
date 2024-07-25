from django.contrib import admin
from .models import Resume, Experience, Section, BulletPoint, UserData

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

class ResumeAdmin(admin.StackedInline):
    model = Resume
    extra = 1
    inlines = [SectionInline]

class UserDataAdmin(admin.ModelAdmin):
    inlines = [ResumeAdmin]

admin.site.register(UserData, UserDataAdmin)
admin.site.register(Resume)
admin.site.register(Section)
admin.site.register(Experience)
admin.site.register(BulletPoint)