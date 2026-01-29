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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MappingPayload } from "./IntegrationPage";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

type CreateMappingFormProps = {
    defaultValues?: FormValues;
    onNextStep: (data: MappingPayload) => void;
    onPreviousStep: () => void;
};

// Internal field rows (label on the left, select on the right)
const INTERNAL_ROWS = [
    { label: "Name", name: "name" },
    { label: "Short Description", name: "shortDescription" },
    { label: "Full Description", name: "longDescription" },
    { label: "Manufacturer Part Number", name: "mpn" },
    { label: "Slug", name: "slug" },
    { label: "Manufacturer", name: "manufacturer" },
    { label: "Related Products", name: "relatedProducts" },
    { label: "CrossSell Products", name: "crossSellProducts" },
    { label: "Images", name: "images" },
    { label: "Categories", name: "categories" },
    { label: "Published", name: "published" },
] as const;

// Options to render in the Internal fields dropdown (Woo/Katana external keys)
const INTERNAL_FIELD_OPTIONS = [
    "name",
    "short_description",
    "description",
    "slug",
    "related_ids",
    "cross_sell_ids",
    "images",
    "status",
    "regular_price",
    "stock_quantity",
    "weight",
];

// Zod schema: identifier fields required; mapping selects optional at schema-level
// We’ll enforce "all visible rows must be filled" via custom submit validation.
const formSchema = z.object({
    identifier: z.string().min(1, "Externalkey / GTIN is required"),
    identificationType: z.string().min(1, "identificationType (SKU) is required"),

    // mapping keys — optional here; enforced on submit for visible rows
    name: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    slug: z.string().optional(),
    mpn: z.string().optional(),
    taxCategory: z.string().optional(),
    manufacturer: z.string().optional(),
    price: z.string().optional(),
    oldPrice: z.string().optional(),
    specialPrice: z.string().optional(),
    productOn: z.string().optional(),
    productOut: z.string().optional(),
    stockQuantity: z.string().optional(),
    availableStart: z.string().optional(),
    availableEnd: z.string().optional(),

    // extras used by rows above
    relatedProducts: z.string().optional(),
    crossSellProducts: z.string().optional(),
    images: z.string().optional(),
    categories: z.string().optional(),
    published: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MappingForm({
    defaultValues,
    onNextStep,
    onPreviousStep,
}: CreateMappingFormProps) {
    const [rows, setRows] = useState([...INTERNAL_ROWS]);
    const [rowsError, setRowsError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            identificationType: "",
            name: "",
            shortDescription: "",
            longDescription: "",
            slug: "",
            mpn: "",
            taxCategory: "",
            manufacturer: "",
            price: "",
            oldPrice: "",
            specialPrice: "",
            productOn: "",
            productOut: "",
            stockQuantity: "",
            availableStart: "",
            availableEnd: "",
            relatedProducts: "",
            crossSellProducts: "",
            images: "",
            categories: "",
            published: "",
        },
        mode: "onChange",
    });

    const removeRow = (name: string) => {
        // clear value + any field-level error when removing
        form.setValue(name as keyof FormValues, "" as any, {
            shouldValidate: true,
            shouldDirty: true,
        });
        form.clearErrors(name as keyof FormValues);
        setRows((prev) => prev.filter((r) => r.name !== name));
        setRowsError(null);
    };

    // Normalize MappingPayload -> FormValues and reset form when defaults change
    useEffect(() => {
        if (!defaultValues) return;

        const mapped: Partial<FormValues> = {
            identifier: (defaultValues as any).identifier ?? "",
            identificationType: (defaultValues as any).identificationType ?? "",
        };

        const fmd = (defaultValues as any).fields_mapping_data;
        if (Array.isArray(fmd)) {
            // convert [{ field, value }] → keyed object
            for (const { field, value } of fmd) {
                (mapped as any)[field] = value ?? "";
            }
        } else {
            Object.assign(mapped, defaultValues);
        }

        form.reset(mapped as FormValues, { keepDirty: false, keepTouched: false });
    }, [defaultValues, form]);

    const handleSubmit = (data: FormValues) => {
        setRowsError(null);

        // Require all VISIBLE rows to have a value
        const empties: string[] = [];
        for (const r of rows) {
            const v = (data as any)[r.name];
            if (!v || String(v).trim() === "") {
                empties.push(r.name);
                form.setError(r.name as keyof FormValues, {
                    type: "manual",
                    message: "Required",
                });
            }
        }

        if (empties.length > 0) {
            setRowsError(
                "All fields must be filled. Either select a value for each visible mapping, or remove unused rows."
            );
            return;
        }

        const mappingData: MappingPayload = {
            identifier: data.identifier,
            identificationType: data.identificationType,
            fields_mapping_data: [
                { field: "name", value: data.name },
                { field: "shortDescription", value: data.shortDescription },
                { field: "longDescription", value: data.longDescription },
                { field: "slug", value: data.slug },
                { field: "mpn", value: data.mpn },
                { field: "taxCategory", value: data.taxCategory },
                { field: "manufacturer", value: data.manufacturer },
                { field: "price", value: data.price },
                { field: "oldPrice", value: data.oldPrice },
                { field: "specialPrice", value: data.specialPrice },
                { field: "productOn", value: data.productOn },
                { field: "productOut", value: data.productOut },
                { field: "stockQuantity", value: data.stockQuantity },
                { field: "availableStart", value: data.availableStart },
                { field: "availableEnd", value: data.availableEnd },
                { field: "relatedProducts", value: data.relatedProducts },
                { field: "crossSellProducts", value: data.crossSellProducts },
                { field: "images", value: data.images },
                { field: "categories", value: data.categories },
                { field: "published", value: data.published },
            ].filter((x) => x.value !== undefined), // keep shape tidy
        };

        onNextStep(mappingData);
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
                <span className="hidden sm:inline">Mapping</span>
            </div>

            {/* Step Progress Bar */}
            <ProgressBar currentStep={3} />

            {/* Top-level banner error */}
            {rowsError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {rowsError}
                </div>
            )}

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {/* Unique Identifier Section */}
                    <Card>
                        <CardContent className="space-y-4 p-6">
                            <h3 className="font-semibold">Unique identifier</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* SKU / Externalkey / GTIN */}
                                <FormField
                                    control={form.control}
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            {/* Logo above label */}
                                            <div className="h-10 flex items-center mb-1">
                                                <img
                                                    src="/katanapim.png"
                                                    alt="KatanaPIM Logo"
                                                    style={{ width: "100px", height: "40px" }}
                                                    className="mb-1"
                                                />
                                            </div>
                                            <FormLabel>
                                                Unique Identifier <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Unique Identifier" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sku-1">SKU-1</SelectItem>
                                                        <SelectItem value="GTIN">GTIN</SelectItem>
                                                        <SelectItem value="Externalkey">Externalkey</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Identification Type (SKU) */}
                                <FormField
                                    control={form.control}
                                    name="identificationType"
                                    render={({ field }) => (
                                        <FormItem>
                                            {/* Logo above label */}
                                            <div className="h-10 flex items-center mb-1">
                                                <img
                                                    src="/woo.png"
                                                    alt="WooCommerce Logo"
                                                    style={{ width: "50px", height: "20px" }}
                                                    className="mb-1"
                                                />
                                            </div>
                                            <FormLabel>
                                                Identification Type <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Identification Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Externalkey">Externalkey</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Internal Fields Section (label + select only) */}
                    <Card>
                        <CardContent className="space-y-4 p-6">
                            <h3 className="font-semibold">Internal fields</h3>

                            <div className="space-y-3">
                                {rows.map((row, idx) => (
                                    <div key={row.name} className="space-y-3">
                                        {/* Row */}
                                        <div className="grid items-center gap-4 sm:grid-cols-[1fr_minmax(220px,1.2fr)_auto]">
                                            {/* Left: label */}
                                            <div className="text-sm font-medium text-foreground">
                                                {row.label}
                                            </div>

                                            {/* Middle: select */}
                                            <FormField
                                                control={form.control}
                                                name={row.name as keyof FormValues}
                                                render={({ field }) => (
                                                    <FormItem className="m-0">
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={(field.value as string) ?? ""}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select…" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {INTERNAL_FIELD_OPTIONS.map((option) => (
                                                                        <SelectItem key={option} value={option}>
                                                                            {option}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Right: delete button */}
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeRow(row.name)}
                                                    aria-label={`Remove ${row.label}`}
                                                    className="rounded-md p-2 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Separator between rows */}
                                        {idx < rows.length - 1 && <Separator />}
                                    </div>
                                ))}

                                {/* Optional: empty state when all rows removed */}
                                {rows.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        No internal fields left to map.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={onPreviousStep}>
                            Previous
                        </Button>
                        <Button type="submit" className="bg-[#873EFF]">
                            Next step <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </motion.div>
    );
}
