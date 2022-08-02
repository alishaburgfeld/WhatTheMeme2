from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('signup', views.sign_up),
    path('login', views.log_in),
    path('logout', views.log_out),
    path('whoami', views.who_am_i),
    path('addfriend/', views.add_friend),
    path('removefriend/', views.remove_friend),
    path('friendlist/', views.view_friend_list),
    path('friendrequests/view', views.view_friend_requests),
    # cancel will be a stretch goal:
    # path('friendrequests/cancel', views.cancel_friend_request),
    path('friendrequests/create', views.create_friend_request),

]