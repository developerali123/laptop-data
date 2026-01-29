import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ListFilter,
  PackageCheck,
  PencilLine,
  Search,
  Truck,
  XCircle,
} from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/DashboardLayout';

// ----------------------
// Mock data
// ----------------------
type OrderStatus = 'New' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

type Order = {
  id: string;
  number: string;
  customer: string;
  status: OrderStatus;
  date: string; // ISO
  hasWarning?: boolean;
};

const ORDERS: Order[] = [
  { id: '1', number: 'OR166029', customer: 'John Lesch', status: 'Cancelled', date: '2023-06-24', hasWarning: true },
  { id: '2', number: 'OR533697', customer: 'Prof. Jordan Borer', status: 'Processing', date: '2023-08-27' },
  { id: '3', number: 'OR697099', customer: 'Isabell Block', status: 'Delivered', date: '2023-09-04' },
  { id: '4', number: 'OR561072', customer: 'Emanuel Kassulke', status: 'Delivered', date: '2023-12-22' },
  { id: '5', number: 'OR561073', customer: 'Javon Heathcote', status: 'New', date: '2023-09-21' },
];

// ----------------------
// Small helpers
// ----------------------
const statusBadge: Record<OrderStatus, { label: string; icon: React.ReactNode; className: string }> = {
  New: {
    label: 'New',
    icon: <PackageCheck className="mr-1 h-3.5 w-3.5" />,
    className: 'bg-sky-50 text-sky-600 ring-1 ring-sky-200',
  },
  Processing: {
    label: 'Processing',
    icon: <Clock3 className="mr-1 h-3.5 w-3.5" />,
    className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  },
  Shipped: {
    label: 'Shipped',
    icon: <Truck className="mr-1 h-3.5 w-3.5" />,
    className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  },
  Delivered: {
    label: 'Delivered',
    icon: <CheckCircle2 className="mr-1 h-3.5 w-3.5" />,
    className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  },
  Cancelled: {
    label: 'Cancelled',
    icon: <XCircle className="mr-1 h-3.5 w-3.5" />,
    className: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  },
};

const prettyDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

// ----------------------
// Search form (zod)
// ----------------------
const SearchSchema = z.object({
  q: z.string().optional(),
});
type SearchValues = z.infer<typeof SearchSchema>;

// ----------------------
// Page
// ----------------------
export default function SynchronisationsPage() {
  const [tab, setTab] = React.useState<'All' | OrderStatus>('All');
  const [groupBy, setGroupBy] = React.useState<'none' | 'status' | 'date'>('none');
  const [perPage, setPerPage] = React.useState<'5' | '10' | '20'>('5');

  const form = useForm<SearchValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: { q: '' },
  });

  // Filtering
  const q = form.watch('q')?.trim().toLowerCase() ?? '';
  const base = tab === 'All' ? ORDERS : ORDERS.filter((o) => o.status === tab);
  const filtered = base.filter(
    (o) => o.number.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)
  );

  // Simple grouping (status/date). You can expand as needed.
  const grouped = React.useMemo(() => {
    if (groupBy === 'status') {
      const map = new Map<OrderStatus, Order[]>();
      filtered.forEach((o) => {
        const arr = map.get(o.status) ?? [];
        arr.push(o);
        map.set(o.status, arr);
      });
      return Array.from(map.entries()).map(([key, rows]) => ({ key, rows }));
    }
    if (groupBy === 'date') {
      const map = new Map<string, Order[]>();
      filtered.forEach((o) => {
        const key = new Date(o.date).toISOString().slice(0, 10);
        const arr = map.get(key) ?? [];
        arr.push(o);
        map.set(key, arr);
      });
      // sort groups by date desc
      return Array.from(map.entries())
        .sort(([a], [b]) => (a < b ? 1 : -1))
        .map(([key, rows]) => ({ key, rows }));
    }
    return [{ key: 'All', rows: filtered }];
  }, [filtered, groupBy]);

  // Stats (mocked)
  const totalSyncs = 235;
  const productsToday = 194;
  const warnings = ORDERS.filter((o) => o.hasWarning).length;

  return (
    <DashboardLayout>
      <main className="space-y-6">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground">
          <span>Synchronisations</span>
          <span className="mx-2">›</span>
          <span>dashboard</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">Synchronisations</h1>

        {/* Top stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Synchronisations', value: totalSyncs, icon: null },
            { title: 'Products today', value: productsToday, icon: null },
            { title: 'Warnings', value: warnings, icon: <AlertTriangle className="h-4 w-4 text-rose-500" /> },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Card className="rounded-xl">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{c.title}</p>
                    {c.icon}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{c.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="w-full"
        >
          <TabsList className="h-9">
            {(['All', 'New', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map((t) => (
              <TabsTrigger key={t} value={t} className="px-4">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Controls bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Select value={groupBy} onValueChange={(v: any) => setGroupBy(v)}>
              <SelectTrigger className="w-[130px]">
                <ListFilter className="mr-1 h-4 w-4" />
                <SelectValue placeholder="Group by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Group by</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="date">Order Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => void 0)}
              className="flex w-full items-center gap-2 sm:w-auto"
            >
              <div className="relative w-full sm:w-[280px]">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <FormField
                  control={form.control}
                  name="q"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Search"
                          className="pl-8"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="button" variant="outline" size="icon" className="shrink-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-xl border bg-background"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="min-w-[120px]">Number</TableHead>
                  <TableHead className="min-w-[180px]">Customers</TableHead>
                  <TableHead className="min-w-[160px]">Status</TableHead>
                  <TableHead className="min-w-[140px]">Order Date</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {grouped.map((g) => (
                  <React.Fragment key={g.key.toString()}>
                    {groupBy !== 'none' && (
                      <TableRow className="bg-muted/40">
                        <TableCell colSpan={6} className="text-sm font-medium">
                          {groupBy === 'status' ? g.key : prettyDate(g.key as string)}
                        </TableCell>
                      </TableRow>
                    )}

                    {g.rows.map((o) => {
                      const s = statusBadge[o.status];
                      return (
                        <TableRow key={o.id} className="hover:bg-muted/30">
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{o.number}</TableCell>
                          <TableCell>{o.customer}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${s.className}`}
                            >
                              {s.icon}
                              {s.label}
                            </span>
                          </TableCell>
                          <TableCell>{prettyDate(o.date)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-[#873EFF] hover:text-[#873EFF]">
                              <PencilLine className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}

                {/* Summary rows (static like screenshot) */}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={6} className="font-medium">Summary</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>This page</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>All orders</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t p-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Per page</span>
              <Select value={perPage} onValueChange={(v: any) => setPerPage(v)}>
                <SelectTrigger className="h-8 w-[72px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button size="sm" className="bg-[#873EFF] hover:bg-[#7a34ef]">Next</Button>
            </div>
          </div>
        </motion.div>
      </main>
    </DashboardLayout>
  );
}
