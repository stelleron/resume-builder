from django.contrib import admin
from .models import Resume, Experience, Section, BulletList, BulletPoint

# Register your models here.
class BulletListInline(admin.StackedInline):
    model = BulletList
    extra = 1

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
    inlines = [ExperienceInline, BulletListInline]

class ResumeAdmin(admin.ModelAdmin):
    inlines = [SectionInline]

admin.site.register(Resume, ResumeAdmin)
admin.site.register(Section)
admin.site.register(Experience)
admin.site.register(BulletPoint)
admin.site.register(BulletList)