from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls')),
    path('api/', include('company.urls')),
    path('api/', include('employee.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
