import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  ExternalLink,
  Layers3,
  Plus,
  ShieldCheck,
  Store,
  Trash2,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrl } from "../../config";

// Lightweight type to describe an integration card
export type IntegrationInfo = {
  id: string | number;
  name: string;
  status: "active" | "pending" | "disabled";
  dateLabel?: string; // e.g., "Sep 02, 2025"
  store?: string | null; // e.g., "Shopify EU" or null
  apiStatus?: "ok" | null;
  lastUpdated?: string; // e.g., "0 seconds ago"
};

function IntegrationsMainContent({
  heading = "Integrations",
  subheading = "Connect your data sources and automate workflows",
  counts = { total: 1, active: 1, pending: 0, stores: 1 },
  integrations = [],
  onCreate,
  onView,
  onDelete,
}: {
  heading?: string;
  subheading?: string;
  counts?: { total: number; active: number; pending: number; stores: number };
  integrations?: IntegrationInfo[];
  onCreate?: () => void;
  onView?: (id: IntegrationInfo["id"]) => void;
  onDelete?: (id: IntegrationInfo["id"]) => void;
}) {
  return (
    <motion.main
      className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 md:pt-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top bar: title + create button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onCreate}
            size="lg"
            className="rounded-xl bg-fuchsia-600 text-white hover:bg-fuchsia-600/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Integration
          </Button>
        </motion.div>
      </motion.div>

      {/* KPI cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          icon={<Layers3 className="h-4 w-4" />}
          label="Total"
          value={counts.total}
          chipColor="violet"
        />
        <StatCard
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Active"
          value={counts.active}
          chipColor="green"
        />
        <StatCard
          icon={<AlertCircle className="h-4 w-4" />}
          label="Pending"
          value={counts.pending}
          chipColor="amber"
        />
        <StatCard
          icon={<Store className="h-4 w-4" />}
          label="Stores"
          value={counts.stores}
          chipColor="blue"
        />
      </motion.div>

      {/* Integrations grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {integrations.map((i) => (
          <IntegrationCard
            key={i.id}
            info={i}
            onView={onView}
            onDelete={onDelete}
          />
        ))}

        {/* Empty state example if none passed */}
        {integrations.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex h-40 flex-col items-center justify-center text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                No integrations yet
              </p>
              <Button onClick={onCreate} variant="secondary" className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Create your first integration
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </motion.main>
  );
}

function StatCard({
  icon,
  label,
  value,
  chipColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  chipColor: "violet" | "green" | "amber" | "blue";
}) {
  const chipMap = {
    violet: "bg-fuchsia-100 text-fuchsia-800",
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    blue: "bg-blue-100 text-blue-800",
  } as const;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-muted/60">
            {icon}
          </span>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div className="text-3xl font-bold tabular-nums">{value}</div>
        <span className={`rounded-full px-2 py-0.5 text-xs ${chipMap[chipColor]}`}>
          {label}
        </span>
      </CardContent>
    </Card>
  );
}

function IntegrationCard({
  info,
  onView,
  onDelete,
}: {
  info: IntegrationInfo;
  onView?: (id: IntegrationInfo["id"]) => void;
  onDelete?: (id: IntegrationInfo["id"]) => void;
}) {
  const statusBadge = (status: IntegrationInfo["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Active
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary" className="rounded-full">Pending</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">Disabled</Badge>;
    }
  };

  // Show "Complete" instead of "Incomplete" when API is OK
  const apiStatusChip = (apiStatus: IntegrationInfo["apiStatus"]) => {
    if (apiStatus === "ok")
      return (
        <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Complete
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700">
        <AlertCircle className="h-3.5 w-3.5" />
        Incomplete
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-100 text-violet-700">
                  <Layers3 className="h-4 w-4" />
                </span>
                <span className="truncate">{info.name}</span>
              </CardTitle>
              {info.dateLabel && (
                <p className="mt-0.5 text-xs text-muted-foreground">{info.dateLabel}</p>
              )}
            </div>
            {statusBadge(info.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <Row
              label="Store"
              value={info.store ?? "N/A"}
              icon={<Store className="h-3.5 w-3.5" />}
            />
            <Row
              label="API Status"
              value={apiStatusChip("ok")}
              icon={<ShieldCheck className="h-3.5 w-3.5" />}
            />
            <Row
              label="Last Updated"
              value={<span>{info.lastUpdated ?? "—"}</span>}
              icon={<Clock className="h-3.5 w-3.5" />}
            />
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <button
                onClick={() => onView?.(info.id)}
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline"
              >
                <ExternalLink className="h-4 w-4" /> View Details
              </button>
              <button
                onClick={() => onDelete?.(info.id)}
                className="inline-flex items-center gap-1 text-sm font-medium text-rose-700 hover:underline"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon && (
          <span className="grid h-6 w-6 place-items-center rounded-md bg-muted/50">
            {icon}
          </span>
        )}
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <div className="ml-4 text-right">{value}</div>
    </div>
  );
}

// <- export your IntegrationsMainContent from the same file or adjust path

type ApiIntegration = {
  id: number;
  uuid: string;
  user_id: number;
  step: number;
  data: { name?: string; description?: string };
  store_data?: { Id: number; Name: string; SystemName: string };
  api_data: Record<string, unknown>;
  fields_mapping_data: Array<{ field: string; value: string }>;
  seo_data: { slug: string; metaTitle: string; metaDescription: string };
  specifications: string[];
  unique_identifier: { identifier: string; identificationType: string };
  status: string | null; // ← used for card status
  created_at?: string; // ← used for dateLabel
  updated_at?: string; // ← used for lastUpdated
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiIntegration[];
};

function formatDate(dateISO?: string) {
  if (!dateISO) return "";
  try {
    const d = new Date(dateISO);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return dateISO;
  }
}

function formatDateTime(dateISO?: string) {
  if (!dateISO) return "—";
  try {
    const d = new Date(dateISO);
    return d.toLocaleString();
  } catch {
    return dateISO;
  }
}

function mapStatus(s: string | null | undefined): IntegrationInfo["status"] {
  const v = (s || "").toLowerCase();
  if (v === "active") return "active";
  if (v === "disabled") return "disabled";
  // Treat null/unknown as pending by default
  return "pending";
}

// Basic completeness check: tweak as your step logic evolves
function isIntegrationComplete(r: ApiIntegration): boolean {
  const hasName = Boolean(r.data?.name);
  const hasStore = Boolean(r.store_data?.Id);
  const hasIdentifier =
    Boolean(r.unique_identifier?.identifier) &&
    Boolean(r.unique_identifier?.identificationType);
  const hasMapping = Array.isArray(r.fields_mapping_data) && r.fields_mapping_data.length > 0;
  const hasSeo = Boolean(r.seo_data?.slug);
  return hasName && hasStore && hasIdentifier && hasMapping && hasSeo;
}

function recomputeCounts(cards: IntegrationInfo[]) {
  const total = cards.length;
  const active = cards.filter((c) => c.status === "active").length;
  const pending = cards.filter((c) => c.status === "pending").length;
  const stores = new Set(cards.map((c) => c.store).filter(Boolean)).size;
  return { total, active, pending, stores };
}

export default function CreateIntegration({
  onNextStep,
}: {
  onNextStep: () => void;
}) {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState<IntegrationInfo[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    pending: 0,
    stores: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // Delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const accessToken = useMemo(
    () => sessionStorage.getItem("accessToken"),
    []
  );

  useEffect(() => {
    async function load() {
      try {
        setError(null);

        const res = await fetch(buildUrl("/api/integrations/"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `GET /integrations failed with ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        const results = Array.isArray(data?.results) ? data.results : [];

        // Map API rows -> cards
        const cards: IntegrationInfo[] = results.map((r) => ({
          id: r.id,
          name: r.data?.name || "Unnamed Integration",
          status: mapStatus(r.status),
          dateLabel: formatDate(r.created_at),
          store: r.store_data?.Name ?? null,
          // << CHANGED: compute "ok" (Complete) vs "incomplete"
          apiStatus: isIntegrationComplete(r) ? "ok" : null,
          lastUpdated: formatDateTime(r.updated_at),
        }));

        setIntegrations(cards);
        setCounts({
          total: typeof data.count === "number" ? data.count : results.length,
          active: results.filter((r) => (r.status || "").toLowerCase() === "active").length,
          pending: results.filter((r) => {
            const s = (r.status || "").toLowerCase();
            return s === "pending" || s === "" || r.status == null;
          }).length,
          stores: new Set(results.map((r) => r.store_data?.SystemName).filter(Boolean)).size,
        });
      } catch (e: any) {
        setError(e?.message || "Failed to load integrations");
        setIntegrations([]);
        setCounts({ total: 0, active: 0, pending: 0, stores: 0 });
      }
    }

    load();
  }, [accessToken]);

  // Open delete confirm
  const handleAskDelete = (id: IntegrationInfo["id"]) => {
    setDeleteError(null);
    setDeletingId(id);
    setConfirmOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (deletingId == null) return;
    try {
      setDeleting(true);
      setDeleteError(null);

      const res = await fetch(
        buildUrl(`/api/integrations/${encodeURIComponent(String(deletingId))}/`),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok && res.status !== 204) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `DELETE failed with ${res.status}`);
      }

      // Update local state
      const next = integrations.filter((c) => c.id !== deletingId);
      setIntegrations(next);
      setCounts(recomputeCounts(next));
      setConfirmOpen(false);
      setDeleting(false);
      setDeletingId(null);
    } catch (e: any) {
      setDeleteError(e?.message || "Delete failed");
      setDeleting(false);
    }
  };

  return (
    <main className="space-y-6">
      {/* Optional error banner */}
      {error && (
        <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <IntegrationsMainContent
        counts={counts}
        integrations={integrations}
        onCreate={onNextStep}
        onView={(id) => {
          navigate(`/integration/${id}`);
        }}
        onDelete={handleAskDelete}
      />

      {/* Delete confirmation modal */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete integration?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The integration and its configuration will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="mb-2 rounded-md border border-destructive/20 bg-destructive/5 p-2 text-sm text-destructive">
              {deleteError}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-600/90"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
