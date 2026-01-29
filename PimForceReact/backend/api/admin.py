from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Integration


# Admin branding
admin.site.site_header = "PimForce Admin"
admin.site.site_title = "PimForce Admin"
admin.site.index_title = "Administration"


class CustomUserAdmin(UserAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "integration_count",
        "is_staff",
        "is_active",
        "date_joined",
        "last_login",
    )
    list_filter = ("is_staff", "is_superuser", "is_active", "date_joined")
    search_fields = ("username", "first_name", "last_name", "email")
    ordering = ("-date_joined",)
    list_per_page = 25

    def integration_count(self, obj: User) -> int:
        try:
            return Integration.objects.filter(user_id=obj.id).count()
        except Exception:
            return 0
    integration_count.short_description = "Integrations"
    integration_count.admin_order_field = "id"

    class Media:
        css = {"all": ("admin/pimforce.css",)}


@admin.register(Integration)
class IntegrationAdmin(admin.ModelAdmin):
    date_hierarchy = "created_at"
    list_display = (
        "id",
        "uuid",
        "name",
        "store_name",
        "status_badge",
        "user_id",
        "step",
        "created_at",
        "updated_at",
    )
    list_filter = ("status", "step", "created_at")
    search_fields = (
        "id",
        "uuid",
        "user_id",
        "status",
        "data__name",
    )
    ordering = ("-created_at",)
    readonly_fields = ("uuid", "created_at", "updated_at")
    list_per_page = 25

    fieldsets = (
        (None, {
            "fields": ("uuid", "user_id", "step", "status"),
        }),
        ("Details", {
            "classes": ("collapse",),
            "fields": ("data", "store_data", "api_data"),
        }),
        ("Mapping & SEO", {
            "classes": ("collapse",),
            "fields": ("fields_mapping_data", "unique_identifier", "specifications", "seo_data"),
        }),
        ("Timestamps", {
            "classes": ("collapse",),
            "fields": ("created_at", "updated_at"),
        }),
    )

    def name(self, obj: Integration) -> str:
        try:
            if isinstance(obj.data, dict):
                return obj.data.get("name") or "—"
        except Exception:
            pass
        return "—"
    name.short_description = "Name"

    def store_name(self, obj: Integration) -> str:
        try:
            if isinstance(obj.store_data, dict):
                return obj.store_data.get("Name") or obj.store_data.get("name") or "—"
        except Exception:
            pass
        return "—"
    store_name.short_description = "Store"

    def status_badge(self, obj: Integration) -> str:
        status = (obj.status or "").strip().lower()
        label = obj.status or "—"
        css = "pf-badge"
        if status == "active":
            css += " pf-badge--active"
        elif status == "paused":
            css += " pf-badge--paused"
        elif status:
            css += " pf-badge--disabled"
        return format_html('<span class="{}">{}</span>', css, label)
    status_badge.short_description = "Status"
    status_badge.admin_order_field = "status"

    actions = [
        "mark_active",
        "mark_paused",
        "mark_disabled",
    ]

    def mark_active(self, request, queryset):
        queryset.update(status="active")
    mark_active.short_description = "Mark selected as Active"

    def mark_paused(self, request, queryset):
        queryset.update(status="paused")
    mark_paused.short_description = "Mark selected as Paused"

    def mark_disabled(self, request, queryset):
        queryset.update(status="disabled")
    mark_disabled.short_description = "Mark selected as Disabled"

    class Media:
        css = {"all": ("admin/pimforce.css",)}


# Re-register User with custom admin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
