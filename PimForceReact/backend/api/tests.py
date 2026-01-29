from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Integration
import uuid

class IntegrationAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.integration = Integration.objects.create(
            user_id=self.user.id,
            step=1,
            status='active',
            data={"foo": "bar"},
        )
        self.list_url = reverse('integration-list')

    def test_list_integrations(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data['results']), 1)

    def test_create_integration(self):
        payload = {
            "user_id": self.user.id,
            "step": 2,
            "status": "pending",
            "data": {"hello": "world"}
        }
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user_id'], self.user.id)

    def test_retrieve_integration(self):
        url = reverse('integration-detail', args=[self.integration.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.integration.id)

    def test_update_integration(self):
        url = reverse('integration-detail', args=[self.integration.id])
        response = self.client.patch(url, {"status": "inactive"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], "inactive")

    def test_delete_integration(self):
        url = reverse('integration-detail', args=[self.integration.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Integration.objects.filter(id=self.integration.id).exists())

    def test_filter_by_status(self):
        Integration.objects.create(user_id=self.user.id, step=2, status='pending')
        response = self.client.get(self.list_url, {'status': 'pending'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for item in response.data['results']:
            self.assertEqual(item['status'], 'pending')

    def test_permissions(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_performance_list(self):
        # Create many integrations for performance test
        for i in range(50):
            Integration.objects.create(user_id=self.user.id, step=i, status='active')
        with self.assertNumQueriesLessThan(10):
            self.client.force_authenticate(user=self.user)
            response = self.client.get(self.list_url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Helper for performance assertion
    from contextlib import contextmanager
    @contextmanager
    def assertNumQueriesLessThan(self, num):
        from django.test.utils import CaptureQueriesContext
        from django.db import connection
        with CaptureQueriesContext(connection) as ctx:
            yield
            actual = len(ctx.captured_queries)
            assert actual < num, f"Too many queries: {actual} >= {num}"
