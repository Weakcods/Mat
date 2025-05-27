from django.views.generic import TemplateView
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone
from django.db.models import Sum, Count, Avg
from .models import Order, UserProfile, Revenue
from .utils import TemplateLayout


"""
This file is a view controller for multiple pages as a module.
Here you can override the page view layout.
Refer to dashboards/urls.py file for more pages.
"""


class DashboardsView(TemplateView):
    # Predefined function
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context = TemplateLayout.init(context)
        
        # Get all orders
        orders = Order.objects.all().order_by('-created_at')
        context['orders'] = orders
        
        # Get all users with profiles
        users = User.objects.select_related('profile').all()
        context['users'] = users
        
        # Get all revenue records
        revenues = Revenue.objects.all().order_by('-date')
        context['revenues'] = revenues
        
        # Calculate total revenue
        total_revenue = Revenue.objects.aggregate(total=Sum('total_revenue'))['total'] or 0
        context['total_revenue'] = total_revenue
        
        # Calculate active users
        active_users = UserProfile.objects.filter(is_active=True).count()
        context['active_users'] = active_users
        
        # Calculate total orders
        total_orders = Order.objects.count()
        context['total_orders'] = total_orders
        
        # Calculate growth percentages (you can implement your own logic here)
        context['revenue_growth'] = 15  # Example value
        context['user_growth'] = 10     # Example value
        context['order_growth'] = 20    # Example value
        
        return context

def add_order(request):
    if request.method == 'POST':
        try:
            customer = User.objects.get(id=request.POST['customer'])
            amount = request.POST['amount']
            status = request.POST['status']
            notes = request.POST.get('notes', '')
            
            # Generate order number (you can implement your own logic)
            order_number = f"ORD-{timezone.now().strftime('%Y%m%d%H%M%S')}"
            
            order = Order.objects.create(
                order_number=order_number,
                customer=customer,
                amount=amount,
                status=status,
                notes=notes
            )
            
            # Update user's total orders and spent
            profile = customer.profile
            profile.total_orders += 1
            profile.total_spent += float(amount)
            profile.save()
            
            messages.success(request, 'Order added successfully!')
        except Exception as e:
            messages.error(request, f'Error adding order: {str(e)}')
    
    return redirect('dashboard-analytics')

def add_user(request):
    if request.method == 'POST':
        try:
            username = request.POST['username']
            email = request.POST['email']
            phone = request.POST.get('phone', '')
            address = request.POST.get('address', '')
            is_active = request.POST['is_active'] == '1'
            
            # Create user
            user = User.objects.create_user(
                username=username,
                email=email
            )
            
            # Create profile
            UserProfile.objects.create(
                user=user,
                phone=phone,
                address=address,
                is_active=is_active
            )
            
            messages.success(request, 'User added successfully!')
        except Exception as e:
            messages.error(request, f'Error adding user: {str(e)}')
    
    return redirect('dashboard-analytics')

def add_revenue(request):
    if request.method == 'POST':
        try:
            date = request.POST['date']
            total_revenue = request.POST['total_revenue']
            total_orders = request.POST['total_orders']
            average_order_value = request.POST['average_order_value']
            
            Revenue.objects.create(
                date=date,
                total_revenue=total_revenue,
                total_orders=total_orders,
                average_order_value=average_order_value
            )
            
            messages.success(request, 'Revenue record added successfully!')
        except Exception as e:
            messages.error(request, f'Error adding revenue record: {str(e)}')
    
    return redirect('dashboard-analytics')

def edit_order(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    if request.method == 'POST':
        try:
            order.customer = User.objects.get(id=request.POST['customer'])
            order.amount = request.POST['amount']
            order.status = request.POST['status']
            order.notes = request.POST.get('notes', '')
            order.save()
            
            messages.success(request, 'Order updated successfully!')
        except Exception as e:
            messages.error(request, f'Error updating order: {str(e)}')
    
    return redirect('dashboard-analytics')

def delete_order(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    try:
        order.delete()
        messages.success(request, 'Order deleted successfully!')
    except Exception as e:
        messages.error(request, f'Error deleting order: {str(e)}')
    
    return redirect('dashboard-analytics')

def edit_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == 'POST':
        try:
            user.username = request.POST['username']
            user.email = request.POST['email']
            user.save()
            
            profile = user.profile
            profile.phone = request.POST.get('phone', '')
            profile.address = request.POST.get('address', '')
            profile.is_active = request.POST['is_active'] == '1'
            profile.save()
            
            messages.success(request, 'User updated successfully!')
        except Exception as e:
            messages.error(request, f'Error updating user: {str(e)}')
    
    return redirect('dashboard-analytics')

def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    try:
        user.delete()
        messages.success(request, 'User deleted successfully!')
    except Exception as e:
        messages.error(request, f'Error deleting user: {str(e)}')
    
    return redirect('dashboard-analytics')

def edit_revenue(request, revenue_id):
    revenue = get_object_or_404(Revenue, id=revenue_id)
    if request.method == 'POST':
        try:
            revenue.date = request.POST['date']
            revenue.total_revenue = request.POST['total_revenue']
            revenue.total_orders = request.POST['total_orders']
            revenue.average_order_value = request.POST['average_order_value']
            revenue.save()
            
            messages.success(request, 'Revenue record updated successfully!')
        except Exception as e:
            messages.error(request, f'Error updating revenue record: {str(e)}')
    
    return redirect('dashboard-analytics')

def delete_revenue(request, revenue_id):
    revenue = get_object_or_404(Revenue, id=revenue_id)
    try:
        revenue.delete()
        messages.success(request, 'Revenue record deleted successfully!')
    except Exception as e:
        messages.error(request, f'Error deleting revenue record: {str(e)}')
    
    return redirect('dashboard-analytics')
