from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter
from .views import AllUserProjects

router = DefaultRouter()
router.register("all", AllUserProjects, basename="all_user_project")

urlpatterns = [
    path("new/", views.CreateProjectView.as_view(), name="new_project"),
    path(
        "doc/<str:uuid>/",
        views.DocumentExplorerView.as_view(),
        name="doc_explorer",
    ),
    path(
        "download/<str:project_slug>/",
        views.DownloadZipDocFile.as_view(),
        name="download",
    ),
]

urlpatterns += router.urls
