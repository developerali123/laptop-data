from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Integration
from .serializers import IntegrationSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiRequest, OpenApiResponse, OpenApiTypes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

@extend_schema(
    tags=["Integration"],
    description="API endpoints for managing integrations.",
    parameters=[
        OpenApiParameter(name="user_id", description="Filter by user ID", required=False, type=int),
        OpenApiParameter(name="status", description="Filter by status", required=False, type=str),
        OpenApiParameter(name="step", description="Filter by step", required=False, type=int),
    ],
)
class IntegrationViewSet(viewsets.ModelViewSet):
    queryset = Integration.objects.all()
    serializer_class = IntegrationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = [
        'user_id', 'status', 'step',
    ]
    search_fields = ['status']
    ordering_fields = ['created_at', 'updated_at', 'user_id', 'step']
    ordering = ['-created_at']

@extend_schema(
    tags=["Integration"],
    description="Get all stores from KatanaPIM using provided katana_url and api_key.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "katana_url": {"type": "string", "description": "Full KatanaPIM Store API URL"},
                "api_key": {"type": "string", "description": "KatanaPIM API key"}
            },
            "required": ["katana_url", "api_key"]
        }
    },
    responses={
        200: OpenApiResponse(description="List of stores returned from KatanaPIM"),
        400: OpenApiResponse(description="Missing katana_url or api_key"),
        502: OpenApiResponse(description="Error from KatanaPIM or network issue")
    }
)
class StoreListView(APIView):
    def post(self, request):
        katana_url = request.data.get("katana_url")
        api_key = request.data.get("api_key")
        if not katana_url or not api_key:
            return Response({"error": "katana_url and api_key are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = requests.get(
                katana_url,
                headers={
                    "ApiKey": api_key,
                    "Accept": "application/json"
                },
                timeout=60,
                verify=False  # Only for development!
            )
            response.raise_for_status()
            stores = response.json()
            return Response(stores, status=status.HTTP_200_OK)
        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)
