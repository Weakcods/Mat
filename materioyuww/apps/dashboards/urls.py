from django.urls import path
from .views import DashboardsView

urlpatterns = [
    path(
        "analytics/",
        DashboardsView.as_view(template_name="dashboard_analytics.html"),
        name="dashboard-analytics",
    ),
    path(
        "crm/",
        DashboardsView.as_view(template_name="dashboard_crm.html"),
        name="dashboard-crm",
    ),
    path(
        "ecommerce/",
        DashboardsView.as_view(template_name="dashboard_ecommerce.html"),
        name="dashboard-ecommerce",
    ),
    path(
        "logistics/",
        DashboardsView.as_view(template_name="dashboard_logistics.html"),
        name="dashboard-logistics",
    ),
    path(
        "academy/",
        DashboardsView.as_view(template_name="dashboard_academy.html"),
        name="dashboard-academy",
    ),
    path(
        "",
        DashboardsView.as_view(template_name="dashboard_analytics.html"),
        name="index",
    ),
]
