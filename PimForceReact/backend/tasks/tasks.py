import time
import random
from celery import shared_task
import logging
from django.utils import timezone
from .katana_to_woo import run_sync as katana_to_woo_run_sync

logger = logging.getLogger(__name__)


@shared_task
def send_notification(user_id, message):
    """Send a notification to a user."""
    # Simulate sending notification
    time.sleep(0.5)
    print(f"Notification sent to user {user_id}: {message}")
    return {'user_id': user_id, 'message': message, 'sent_at': timezone.now().isoformat()}


@shared_task
def process_batch_tasks(task_ids):
    """Process multiple tasks in batch."""
    results = []
    for task_id in task_ids:
        try:
            # Task processing removed
            results.append({'task_id': task_id, 'status': 'skipped', 'celery_id': None})
        except Exception as e:
            results.append({'task_id': task_id, 'status': 'failed', 'error': str(e)})
    
    return results


@shared_task
def test_periodic_task():
    logger.info("Test periodic task ran successfully!")
    # Your logic here


@shared_task
def run_katana_to_woo_sync():
    logger.info("Starting KatanaPIM to WooCommerce sync via Celery task...")
    try:
        result = katana_to_woo_run_sync()
        logger.info(f"KatanaPIM to WooCommerce sync finished with exit code: {result}")
    except Exception as e:
        logger.error(f"Error running KatanaPIM to WooCommerce sync: {e}")
