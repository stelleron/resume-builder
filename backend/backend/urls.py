"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from resume import views

router = routers.DefaultRouter()
router.register(r'user_data', views.UserDataViewSet, 'user_data')
router.register(r'resume', views.ResumeViewSet, 'resume')
router.register(r'section', views.SectionViewSet, 'section')
router.register(r'experience', views.ExperienceViewSet, 'experience')
router.register(r'bullet_point', views.BulletPointViewSet, 'bullet_point')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
]
