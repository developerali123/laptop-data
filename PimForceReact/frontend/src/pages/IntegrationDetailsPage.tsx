import { ArrowLeft, Trash2, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buildUrl } from "../../config";

type MappingSpec = { name: string; value?: string | null };

type IntegrationDetails = {
  name: string;
  status: "Active" | "Paused" | "Disabled";
  createdAt: string;
  storeName?: string | null;
  katana: { url: string; apiKey: string };
  webshop: { url: string; apiKey: string; apiSecret: string };
  mapping: {
    uniqueIdentifier: { identifier?: string | null; type: string };
    productSpecifications: MappingSpec[];
  };
};

const mask = (v: string, visible = 0) =>
  !v ? "—" : v.length <= visible ? "••••••••••" : `${v.slice(0, visible)}${"•".repeat(Math.max(8, v.length - visible))}`;

const StatusBadge = ({ status }: { status: IntegrationDetails["status"] }) => {
  const styles =
    status === "Active"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : status === "Paused"
      ? "bg-amber-100 text-amber-700 border border-amber-200"
      : "bg-rose-100 text-rose-700 border border-rose-200";
  return <Badge className={styles}>{status}</Badge>;
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col">
    <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const SpecRow = ({ name, value }: MappingSpec) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium">{name}</span>
    <span className="text-sm text-muted-foreground break-all">{value}</span>
  </div>
);

// helpers
function toTitle(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase());
}
function mapStatus(raw: string | null | undefined): IntegrationDetails["status"] {
  const s = (raw || "").toLowerCase();
  if (s === "active") return "Active";
  if (s === "paused") return "Paused";
  return "Disabled";
}
function fmtDateTime(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } catch {
    return iso;
  }
}

export default function IntegrationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<IntegrationDetails | null>(null);

  // Delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const token = useMemo(() => sessionStorage.getItem("accessToken"), []);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(buildUrl(`/api/integrations/${id}/`), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `GET /integrations/${id} failed with ${res.status}`);
        }
        const j = await res.json();

        const mapped: IntegrationDetails = {
          name: j?.data?.name ?? "—",
          status: mapStatus(j?.status),
          createdAt: fmtDateTime(j?.created_at),
          storeName: j?.store_data?.Name ?? null,
          katana: {
            url: j?.api_data?.katanaPimUrl ?? "—",
            apiKey: j?.api_data?.katanaPimApiKey ?? "",
          },
          webshop: {
            url: j?.api_data?.webshopUrl ?? "—",
            apiKey: j?.api_data?.wooCommerceApiKey ?? "",
            apiSecret: j?.api_data?.wooCommerceApiSecret ?? "",
          },
          mapping: {
            uniqueIdentifier: {
              identifier: j?.unique_identifier?.identifier ?? "",
              type: j?.unique_identifier?.identificationType ?? "",
            },
            productSpecifications: Array.isArray(j?.fields_mapping_data)
              ? j.fields_mapping_data.map((f: any) => ({
                  name: toTitle(String(f.field ?? "")),
                  value: f.value ?? "",
                }))
              : [],
          },
        };

        setData(mapped);
      } catch (e: any) {
        setErr(e?.message || "Failed to load integration.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  const askDelete = () => {
    setDeleteError(null);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!id) return;
    try {
      setDeleting(true);
      setDeleteError(null);

      const res = await fetch(buildUrl(`/api/integrations/${encodeURIComponent(id)}/`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok && res.status !== 204) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `DELETE failed with ${res.status}`);
      }

      setDeleting(false);
      setConfirmOpen(false);
      // Go back to list after delete
      navigate(-1);
    } catch (e: any) {
      setDeleting(false);
      setDeleteError(e?.message || "Delete failed");
    }
  };

  // Derived: only show mapping rows that have values
  const hasIdentifier = Boolean(data?.mapping.uniqueIdentifier.identifier?.trim());
  const hasIdentifierType = Boolean(data?.mapping.uniqueIdentifier.type?.trim());
  const visibleSpecs =
    data?.mapping.productSpecifications.filter(
      (s) => Boolean(s.value && String(s.value).trim())
    ) ?? [];

  return (
    <DashboardLayout>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto w-full max-w-6xl p-4 sm:p-6"
      >
        {/* Header / Actions */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Integration Details</h1>
            <p className="text-sm text-muted-foreground">View and manage your integration settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Integrations
            </Button>
            <Button variant="destructive" onClick={askDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Integration
            </Button>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <Card className="mb-6">
            <CardContent className="p-6 text-sm text-muted-foreground">Loading…</CardContent>
          </Card>
        )}
        {err && !loading && (
          <Card className="mb-6">
            <CardContent className="p-6 text-sm text-destructive">{err}</CardContent>
          </Card>
        )}

        {/* Content */}
        {data && !loading && !err && (
          <>
            {/* Integration Overview */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Integration Overview</CardTitle>
                  <CardDescription>Basic information and store configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="shadow-none">
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="mb-4 text-sm font-semibold tracking-tight">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <InfoRow label="Name" value={data.name || "—"} />
                          <InfoRow label="Status" value={<StatusBadge status={data.status} />} />
                          <InfoRow label="Created" value={data.createdAt} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-none">
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="mb-4 text-sm font-semibold tracking-tight">Store Configuration</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <InfoRow label="Selected Store" value={data.storeName || "N/A"} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* API Configuration */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">API Configuration</CardTitle>
                  <CardDescription>Credentials and endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* KatanaPIM */}
                    <div className="rounded-xl border bg-card">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-semibold">KatanaPIM</h4>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid gap-4 p-4">
                        {!!data.katana.url && <InfoRow label="URL" value={<span className="break-all">{data.katana.url}</span>} />}
                        {!!data.katana.apiKey && <InfoRow label="API Key" value={<span className="font-mono">{mask(data.katana.apiKey)}</span>} />}
                        {!data.katana.url && !data.katana.apiKey && (
                          <span className="text-sm text-muted-foreground">No values configured</span>
                        )}
                      </div>
                    </div>

                    {/* Webshop */}
                    <div className="rounded-xl border bg-card">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-semibold">Webshop</h4>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid gap-4 p-4">
                        {!!data.webshop.url && <InfoRow label="URL" value={<span className="break-all">{data.webshop.url}</span>} />}
                        {!!data.webshop.apiKey && (
                          <InfoRow label="WooCommerce API Key" value={<span className="font-mono">{mask(data.webshop.apiKey)}</span>} />
                        )}
                        {!!data.webshop.apiSecret && (
                          <InfoRow label="WooCommerce API Secret" value={<span className="font-mono">{mask(data.webshop.apiSecret)}</span>} />
                        )}
                        {!data.webshop.url && !data.webshop.apiKey && !data.webshop.apiSecret && (
                          <span className="text-sm text-muted-foreground">No values configured</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Field Mapping */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Field Mapping</CardTitle>
                  <CardDescription>Identifier and product specifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Unique Identifier */}
                    <div className="rounded-xl border bg-card">
                      <div className="p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Unique Identifier</h4>
                      </div>
                      <Separator />
                      <div className="grid gap-4 p-4">
                        {hasIdentifier && <InfoRow label="Identifier" value={data.mapping.uniqueIdentifier.identifier!} />}
                        {hasIdentifierType && <InfoRow label="Type" value={data.mapping.uniqueIdentifier.type} />}
                        {!hasIdentifier && !hasIdentifierType && (
                          <span className="text-sm text-muted-foreground">No values configured</span>
                        )}
                      </div>
                    </div>

                    {/* Product Specifications (only show those with values) */}
                    <div className="rounded-xl border bg-card">
                      <div className="p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Field Mappings</h4>
                      </div>
                      <Separator />
                      <div className="grid gap-4 p-4">
                        {visibleSpecs.length === 0 ? (
                          <span className="text-sm text-muted-foreground">No mapped fields with values</span>
                        ) : (
                          visibleSpecs.map((s, i) => <SpecRow key={`${s.name}-${i}`} name={s.name} value={s.value} />)
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

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
                onClick={confirmDelete}
                className="bg-rose-600 hover:bg-rose-600/90"
              >
                {deleting ? "Deleting…" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.section>
    </DashboardLayout>
  );
}
