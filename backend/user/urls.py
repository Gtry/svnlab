from django.urls import path

from backend.user import views

urlpatterns = [
	path(r'login', views.userLogin),
	path(r'logout', views.userLogout),
	path(r'info', views.userInfo),
]
