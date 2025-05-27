from django.urls import path
from .views import (
    DashboardsView,
    add_order,
    add_user,
    add_revenue,
    edit_order,
    delete_order,
    edit_user,
    delete_user,
    edit_revenue,
    delete_revenue,
)

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
    # Order URLs
    path("orders/add/", add_order, name="add-order"),
    path("orders/<int:order_id>/edit/", edit_order, name="edit-order"),
    path("orders/<int:order_id>/delete/", delete_order, name="delete-order"),
    # User URLs
    path("users/add/", add_user, name="add-user"),
    path("users/<int:user_id>/edit/", edit_user, name="edit-user"),
    path("users/<int:user_id>/delete/", delete_user, name="delete-user"),
    # Revenue URLs
    path("revenue/add/", add_revenue, name="add-revenue"),
    path("revenue/<int:revenue_id>/edit/", edit_revenue, name="edit-revenue"),
    path("revenue/<int:revenue_id>/delete/", delete_revenue, name="delete-revenue"),
]
