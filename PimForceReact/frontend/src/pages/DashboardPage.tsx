import DashboardLayout from "@/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Clock, Layers3, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrl } from "../../config";

function DashboardMainContent({
  userName = "Martijn Leenen",
  totalIntegrations = 0,
  activeIntegrations = 0,
  lastActivity = "No activity yet",
  onCreateFirstIntegration,
}: {
  userName?: string;
  totalIntegrations?: number;
  activeIntegrations?: number;
  lastActivity?: string;
  onCreateFirstIntegration?: () => void;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <motion.main
      className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 md:pt-10"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Header / Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-col gap-2 md:mb-8"
      >
        <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
          <span>Welcome back, {userName}! </span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-xl md:h-8 md:w-8">👋</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Ready to manage your product integrations today?
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Total Integrations */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Layers3 className="h-4 w-4" /> Total Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-4xl font-bold tabular-nums">{totalIntegrations}</div>
            <Badge variant="secondary" className="rounded-full">All</Badge>
          </CardContent>
        </Card>

        {/* Active Integrations */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Activity className="h-4 w-4 text-green-600" /> Active Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-4xl font-bold tabular-nums">{activeIntegrations}</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </CardContent>
        </Card>

        {/* Last Activity */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Clock className="h-4 w-4 text-violet-600" /> Last Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-lg font-semibold">{lastActivity}</div>
            <Badge variant="outline" className="rounded-full">Timeline</Badge>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hero / CTA — only when there are NO integrations */}
      {totalIntegrations === 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-3xl border bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-sm sm:p-8"
        >
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80">
                <Zap className="h-4 w-4" /> Get Started with Your First Integration
              </div>
              <h3 className="text-2xl font-bold leading-tight md:text-3xl">Welcome to PimForce!</h3>
              <p className="text-white/90">
                Create your first product integration to start managing your products efficiently.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={onCreateFirstIntegration}
                className="h-11 rounded-xl bg-white text-slate-900 hover:bg-white/90"
              >
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Zap className="h-3.5 w-3.5" />
                </span>
                Create Your First Integration
              </Button>
            </motion.div>
          </div>
        </motion.section>
      )}
    </motion.main>
  );
}


type IntegrationRow = {
  id: number;
  status: string | null;
  created_at?: string;
  updated_at?: string;
};

export default function DashboardPage() {
  const navigate=useNavigate();
  const [total, setTotal] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [lastActivity, setLastActivity] = useState<string>("No activity yet");

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken"); // include if your backend needs it

    const load = async () => {
      try {
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

        const data = await res.json();
        const results: IntegrationRow[] = Array.isArray(data?.results) ? data.results : [];
        const count = typeof data?.count === "number" ? data.count : results.length;

        setTotal(count);

        // Active integrations (if your API sets status = "active")
        const activeCount = results.filter(
          (r) => r?.status?.toLowerCase?.() === "active"
        ).length;
        setActive(activeCount);

        // Last activity = most recent of updated_at/created_at
        if (results.length > 0) {
          const mostRecentISO = results
            .map((r) => r.updated_at || r.created_at)
            .filter(Boolean)
            .sort() // ISO strings sort lexicographically by time
            .at(-1);
          if (mostRecentISO) {
            setLastActivity(new Date(mostRecentISO).toLocaleString());
          }
        } else {
          setLastActivity("No activity yet");
        }
      } catch (e: any) {
        setTotal(0);
        setActive(0);
        setLastActivity("No activity yet");
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      {/* Optional: surface errors somewhere in your layout */}
      {/* {error && <div className="p-3 text-sm text-red-600">{error}</div>} */}

      <DashboardMainContent
        userName="Martijn Leenen"
        totalIntegrations={total}
        activeIntegrations={active}
        lastActivity={lastActivity}
        onCreateFirstIntegration={() => {
          navigate("/integration")
        }}
      />
    </DashboardLayout>
  );
}

