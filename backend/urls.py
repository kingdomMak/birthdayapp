from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', csrf_exempt(TemplateView.as_view(template_name='index.html'))),
    path('<path:path>', csrf_exempt(TemplateView.as_view(template_name='index.html'))),
] 