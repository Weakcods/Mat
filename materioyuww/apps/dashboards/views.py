from django.views.generic import TemplateView
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone
from django.db.models import Sum, Count, Avg
from .models import Order, UserProfile, Revenue, Shipment, Inventory, Delivery
from .utils import TemplateLayout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import uuid


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
        
        # Calculate average order value
        average_order_value = Order.objects.aggregate(avg=Avg('amount'))['avg'] or 0
        context['average_order_value'] = average_order_value
        
        # Calculate growth percentages
        last_month = timezone.now().replace(day=1) - timezone.timedelta(days=1)
        
        # Revenue growth
        last_month_revenue = Revenue.objects.filter(date__lt=last_month).aggregate(total=Sum('total_revenue'))['total'] or 0
        revenue_growth = ((total_revenue - last_month_revenue) / max(last_month_revenue, 1)) * 100
        context['revenue_growth'] = round(revenue_growth, 2)
        context['revenue_growth_abs'] = round(abs(revenue_growth), 2)
        
        # User growth - using last_login instead of created_at
        last_month_users = UserProfile.objects.filter(last_login__lt=last_month).count()
        user_growth = ((active_users - last_month_users) / max(last_month_users, 1)) * 100
        context['user_growth'] = round(user_growth, 2)
        context['user_growth_abs'] = round(abs(user_growth), 2)
        
        # Order growth
        last_month_orders = Order.objects.filter(created_at__lt=last_month).count()
        order_growth = ((total_orders - last_month_orders) / max(last_month_orders, 1)) * 100
        context['order_growth'] = round(order_growth, 2)
        context['order_growth_abs'] = round(abs(order_growth), 2)
        
        # AOV growth
        last_month_aov = Order.objects.filter(created_at__lt=last_month).aggregate(avg=Avg('amount'))['avg'] or 0
        aov_growth = ((average_order_value - last_month_aov) / max(last_month_aov, 1)) * 100
        context['aov_growth'] = round(aov_growth, 2)
        context['aov_growth_abs'] = round(abs(aov_growth), 2)
        
        # Get revenue data for the last 7 days
        today = timezone.now().date()
        revenue_data = []
        for i in range(6, -1, -1):
            date = today - timezone.timedelta(days=i)
            daily_revenue = Revenue.objects.filter(date=date).aggregate(total=Sum('total_revenue'))['total'] or 0
            revenue_data.append(float(daily_revenue))
        context['revenue_data'] = revenue_data
        
        # Get user activity data for the last 7 days - using last_login
        user_activity_data = []
        for i in range(6, -1, -1):
            date = today - timezone.timedelta(days=i)
            daily_users = UserProfile.objects.filter(last_login__date=date).count()
            user_activity_data.append(daily_users)
        context['user_activity_data'] = user_activity_data
        
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

@login_required
def logistics_dashboard(request):
    context = TemplateLayout.init({})
    
    # Get analytics data
    active_shipments = Shipment.objects.filter(status__in=['PENDING', 'IN_TRANSIT']).count()
    total_inventory = Inventory.objects.aggregate(total=Sum('quantity'))['total'] or 0
    delivery_success_rate = Delivery.objects.filter(status='COMPLETED').count() / max(Delivery.objects.count(), 1) * 100
    total_revenue = Revenue.objects.aggregate(total=Sum('total_revenue'))['total'] or 0

    # Calculate growth rates
    last_month = timezone.now().replace(day=1) - timezone.timedelta(days=1)
    shipment_growth = ((active_shipments - Shipment.objects.filter(created_at__lt=last_month).count()) / max(Shipment.objects.filter(created_at__lt=last_month).count(), 1)) * 100
    inventory_growth = ((total_inventory - Inventory.objects.filter(created_at__lt=last_month).aggregate(total=Sum('quantity'))['total'] or 0) / max(Inventory.objects.filter(created_at__lt=last_month).aggregate(total=Sum('quantity'))['total'] or 1, 1)) * 100
    delivery_growth = ((delivery_success_rate - (Delivery.objects.filter(created_at__lt=last_month, status='COMPLETED').count() / max(Delivery.objects.filter(created_at__lt=last_month).count(), 1) * 100)) / max(Delivery.objects.filter(created_at__lt=last_month).count(), 1)) * 100
    revenue_growth = ((total_revenue - Revenue.objects.filter(date__lt=last_month).aggregate(total=Sum('total_revenue'))['total'] or 0) / max(Revenue.objects.filter(date__lt=last_month).aggregate(total=Sum('total_revenue'))['total'] or 1, 1)) * 100

    # Get data for tables
    shipments = Shipment.objects.all().order_by('-created_at')
    inventory = Inventory.objects.all().order_by('-created_at')
    deliveries = Delivery.objects.all().order_by('-created_at')
    users = User.objects.all()

    context.update({
        'active_shipments': active_shipments,
        'total_inventory': total_inventory,
        'delivery_success_rate': round(delivery_success_rate, 2),
        'total_revenue': total_revenue,
        'shipment_growth': round(shipment_growth, 2),
        'inventory_growth': round(inventory_growth, 2),
        'delivery_growth': round(delivery_growth, 2),
        'revenue_growth': round(revenue_growth, 2),
        'shipments': shipments,
        'inventory': inventory,
        'deliveries': deliveries,
        'users': users,
    })

    return render(request, 'dashboard_logistics.html', context)

@login_required
def add_shipment(request):
    if request.method == 'POST':
        try:
            tracking_id = f"SH{str(uuid.uuid4())[:8].upper()}"
            customer = User.objects.get(id=request.POST['customer'])
            shipment = Shipment.objects.create(
                tracking_id=tracking_id,
                customer=customer,
                origin=request.POST['origin'],
                destination=request.POST['destination'],
                status=request.POST['status'],
                estimated_delivery=request.POST['estimated_delivery']
            )
            messages.success(request, f'Shipment {tracking_id} created successfully!')
        except Exception as e:
            messages.error(request, f'Error creating shipment: {str(e)}')
    return redirect('dashboard-logistics')

@login_required
def add_inventory(request):
    if request.method == 'POST':
        try:
            item_id = f"INV{str(uuid.uuid4())[:8].upper()}"
            inventory = Inventory.objects.create(
                item_id=item_id,
                name=request.POST['name'],
                category=request.POST['category'],
                quantity=request.POST['quantity'],
                location=request.POST['location'],
                status=request.POST['status']
            )
            messages.success(request, f'Inventory item {item_id} created successfully!')
        except Exception as e:
            messages.error(request, f'Error creating inventory item: {str(e)}')
    return redirect('dashboard-logistics')

@login_required
def add_delivery(request):
    if request.method == 'POST':
        try:
            delivery_id = f"DEL{str(uuid.uuid4())[:8].upper()}"
            shipment = Shipment.objects.get(id=request.POST['shipment'])
            delivery = Delivery.objects.create(
                delivery_id=delivery_id,
                shipment=shipment,
                driver=request.POST['driver'],
                date=request.POST['date'],
                status=request.POST['status'],
                customer_rating=request.POST.get('customer_rating')
            )
            messages.success(request, f'Delivery {delivery_id} created successfully!')
        except Exception as e:
            messages.error(request, f'Error creating delivery: {str(e)}')
    return redirect('dashboard-logistics')

@login_required
def update_shipment_status(request, shipment_id):
    if request.method == 'POST':
        try:
            shipment = Shipment.objects.get(id=shipment_id)
            shipment.status = request.POST['status']
            shipment.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@login_required
def update_inventory_status(request, inventory_id):
    if request.method == 'POST':
        try:
            inventory = Inventory.objects.get(id=inventory_id)
            inventory.status = request.POST['status']
            inventory.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@login_required
def update_delivery_status(request, delivery_id):
    if request.method == 'POST':
        try:
            delivery = Delivery.objects.get(id=delivery_id)
            delivery.status = request.POST['status']
            delivery.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
