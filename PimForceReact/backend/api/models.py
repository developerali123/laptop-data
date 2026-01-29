# NOTE: Linter errors for django.db and django.contrib.postgres.indexes imports are expected in some IDEs but are valid in Django projects.

import uuid
from django.db import models  # noqa: F401 (valid in Django project)
from django.contrib.postgres.indexes import GinIndex  # noqa: F401 (valid in Django project)

class IntegrationManager(models.Manager):
    def active(self):
        return self.filter(status__iexact='active')

class Integration(models.Model):
    """
    Represents an integration configuration for a user, including mapping, API, SEO, and other related data.
    """
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, help_text="Universally unique identifier for this integration.")

    user_id = models.BigIntegerField(db_index=True, help_text="ID of the user who owns this integration.")
    step = models.PositiveIntegerField(help_text="Current step in the integration process.")

    data = models.JSONField(default=dict, blank=True, null=True, help_text="General integration data.")
    store_data = models.JSONField(default=dict, blank=True, null=True, help_text="Store-specific data for the integration.")
    api_data = models.JSONField(default=dict, blank=True, null=True, help_text="API-related data for the integration.")
    fields_mapping_data = models.JSONField(default=dict, blank=True, null=True, help_text="Field mapping configuration data.")
    seo_data = models.JSONField(default=dict, blank=True, null=True, help_text="SEO-related data for the integration.")
    specifications = models.JSONField(default=dict, blank=True, null=True, help_text="Product or integration specifications.")
    unique_identifier = models.JSONField(default=dict, blank=True, null=True, help_text="Unique identifier data for the integration.")

    status = models.CharField(max_length=255, blank=True, null=True, db_index=True, help_text="Status of the integration.")

    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the integration was created.")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the integration was last updated.")

    objects = IntegrationManager()

    class Meta:
        db_table = "integrations"
        verbose_name = "Integration"
        verbose_name_plural = "Integrations"
        indexes = [
            GinIndex(fields=["data"]),
            GinIndex(fields=["store_data"]),
            GinIndex(fields=["api_data"]),
            GinIndex(fields=["fields_mapping_data"]),
            GinIndex(fields=["seo_data"]),
            GinIndex(fields=["specifications"]),
            GinIndex(fields=["unique_identifier"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"Integration {self.id} - User {self.user_id}"
