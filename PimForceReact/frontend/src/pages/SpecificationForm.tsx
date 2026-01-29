import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, X, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SpecificationPayload } from "./IntegrationPage";
import { buildUrl } from "../../config";

// MultiSelect Component for specification selection
function MultiSelect({
  value = [],
  onChange,
  options,
  placeholder = "Select specifications...",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const selected = options.filter((o) => value.includes(o.value));

  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const remove = (val: string) => onChange(value.filter((v) => v !== val));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex flex-wrap gap-2 text-left">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              selected.map((item) => (
                <Badge key={item.value} variant="secondary" className="gap-1">
                  {item.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(item.value);
                    }}
                  />
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const active = value.includes(opt.value);
                return (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => toggleValue(opt.value)}
                    className="flex items-center justify-between"
                  >
                    {opt.label}
                    {active ? <Check className="h-4 w-4" /> : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Zod schema for form validation
const formSchema = z.object({
  specifications: z.array(z.string()).min(1, "Select at least one specification"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  slug: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type CreateSpecificationFormProps = {
  baseUrl: string;           // e.g. https://leenweb.katanapim.com
  apiKey: string;            // KatanaPIM API key
  onNextStep: (data: SpecificationPayload) => void;
  onPreviousStep: () => void;
};

type ApiSpecItem = {
  Id: number;
  Name: string;
  Code: string;
  LocalizedProperties?: Array<{
    LanguageId: number;
    LanguageCulture: string;   // e.g., "en-GB"
    LocaleKey: string;         // "Name" | "Description" | ...
    LocaleValue: string | null;
  }>;
};

function getLocalizedName(item: ApiSpecItem): string {
  // Prefer en-GB "Name" if available; otherwise fallback to item.Name
  const en = item.LocalizedProperties?.find(
    (lp) => lp.LocaleKey === "Name" && lp.LanguageCulture?.toLowerCase() === "en-gb"
  );
  return (en?.LocaleValue || item.Name || "").trim();
}

export default function SpecificationForm({
  baseUrl,
  apiKey,
  onNextStep,
  onPreviousStep,
}: CreateSpecificationFormProps) {
  const [specifications, setSpecifications] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specifications: [],
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!baseUrl || !apiKey) return;

    const accessToken = sessionStorage.getItem("accessToken");
    const normalizedBase = baseUrl.replace(/\/+$/, ""); // trim trailing slash

    const fetchAllSpecs = async () => {
      try {
        setLoading(true);
        setErr(null);

        const payload = {
          katana_url: `${normalizedBase}/api/v1/Specifications`, // ✅ full endpoint
          api_key: apiKey,
        };

        // Fetch all pages
        // Safety guard: stop after 50 pages in case of a weird API loop
        const res = await fetch(buildUrl("/api/store-list/"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // remove if backend doesn't need it
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `GET /Specifications failed with ${res.status}`);
        }
        const data = await res.json();

        // Map to MultiSelect options
        const options = data?.Items.map((item: any) => ({
          value: item.Code,
          label: getLocalizedName(item),
        }));

        // Deduplicate by code
        const seen = new Set<string>();
        const unique = options.filter((o: any) => (seen.has(o.value) ? false : seen.add(o.value)));

        setSpecifications(unique);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setErr(e?.message || "Failed to load specifications.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllSpecs();
  }, [baseUrl, apiKey]);

  const handleSubmit = (data: FormValues) => {
    const specificationPayload: SpecificationPayload = {
      // Send only the selected codes (what your backend expects)
      specifications: data.specifications,
      seo_data: {
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        slug: data.slug || "",
      },
    };
    onNextStep(specificationPayload);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="hidden sm:inline">Setup</span>
        <ChevronRight className="hidden h-4 w-4 sm:inline" />
        <span className="hidden sm:inline">Specification</span>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">Create integration</h2>
      <ProgressBar currentStep={5} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Specifications */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-2xl font-semibold">Specifications</h3>

              <FormField
                control={form.control}
                name="specifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select specifications <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value ?? []}
                        onChange={field.onChange}
                        options={specifications}
                        placeholder={loading ? "Loading..." : "Select specifications..."}
                      />
                    </FormControl>
                    <FormMessage />
                    {err && <p className="text-sm text-destructive">{err}</p>}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SEO (optional) */}
          <Card>
            <CardContent className="space-y-6 p-6">
              <h3 className="text-2xl font-semibold">SEO</h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta title (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Summer Collection 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short description for search engines"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., summer-collection" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={onPreviousStep}>
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-[#873EFF]"
              disabled={!form.formState.isValid || loading}
            >
              Finish
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}


