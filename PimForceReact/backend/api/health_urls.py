from django.urls import path
from django.http import JsonResponse
from django.db import connection
from django.core.cache import cache
import redis

def health_check(request):
    """Basic health check endpoint."""
    return JsonResponse({
        'status': 'healthy',
        'service': 'django-backend'
    })

def database_health(request):
    """Database health check."""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        db_status = 'healthy'
    except Exception as e:
        db_status = f'unhealthy: {str(e)}'
    
    return JsonResponse({
        'database': db_status,
        'service': 'django-backend'
    })

def cache_health(request):
    """Cache health check."""
    try:
        cache.set('health_check', 'ok', 10)
        cache_result = cache.get('health_check')
        cache_status = 'healthy' if cache_result == 'ok' else 'unhealthy'
    except Exception as e:
        cache_status = f'unhealthy: {str(e)}'
    
    return JsonResponse({
        'cache': cache_status,
        'service': 'django-backend'
    })

def full_health(request):
    """Comprehensive health check."""
    health_data = {
        'status': 'healthy',
        'service': 'django-backend',
        'checks': {}
    }
    
    # Database check
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        health_data['checks']['database'] = 'healthy'
    except Exception as e:
        health_data['checks']['database'] = f'unhealthy: {str(e)}'
        health_data['status'] = 'unhealthy'
    
    # Cache check
    try:
        cache.set('health_check', 'ok', 10)
        cache_result = cache.get('health_check')
        health_data['checks']['cache'] = 'healthy' if cache_result == 'ok' else 'unhealthy'
        if cache_result != 'ok':
            health_data['status'] = 'unhealthy'
    except Exception as e:
        health_data['checks']['cache'] = f'unhealthy: {str(e)}'
        health_data['status'] = 'unhealthy'
    
    return JsonResponse(health_data)

urlpatterns = [
    path('', health_check, name='health_check'),
    path('db/', database_health, name='database_health'),
    path('cache/', cache_health, name='cache_health'),
    path('full/', full_health, name='full_health'),
]
