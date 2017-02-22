"""relationships_manager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

from interview import views

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^login/$',
        auth_views.login,
        {'template_name': 'interview/login.html'},
        name='login'),

    url(r'^logout/$',
        auth_views.logout,
        {'next_page': '/login/'},
        name='logout'),

    url(r'^register/$',
        views.register,
        name='register'),

    url(r'^profile/', views.build_profile, name='build_profile'),
    url(r'^candidates-list/', views.candidates_list, name='candidates_list'),
    url(r'^schedule-interview/', views.schedule_interview, name='schedule_interview'),

    url(r'^', views.index)

]
