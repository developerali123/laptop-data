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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type CreateApiKeysFormProps = {
    defaultValues?: FormValues;
    onNextStep: (data: FormValues) => void; // this performs verify+preload in parent now
    onPreviousStep: () => void;
    verifying?: boolean;                    // ✅ new
    verifiedMessage?: string | null;        // ✅ new
    errorMessage?: string;                  // ✅ new (from parent)
};

// Zod Schema for Form Validation
const formSchema = z.object({
    katanaPimUrl: z.string().url("Enter a valid KatanaPIM URL"),
    katanaPimApiKey: z.string().min(5, "API Key is required"),
    webshopUrl: z.string().url("Enter a valid webshop URL"),
    wooCommerceApiKey: z.string().min(5, "Customer key is required"),
    wooCommerceApiSecret: z.string().min(5, "Secret key is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ApiKeysForm({ defaultValues,
    onNextStep,
    onPreviousStep,
    verifying = false,
    verifiedMessage,
    errorMessage, }: CreateApiKeysFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues ?? {
            katanaPimUrl: "",
            katanaPimApiKey: "",
            webshopUrl: "",
            wooCommerceApiKey: "",
            wooCommerceApiSecret: "",
        },
        mode: "onChange",
    });

    const handleSubmit = (data: FormValues) => {
        onNextStep(data);
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
                <span className="hidden sm:inline">API keys</span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">Create integration</h2>

            {/* Step Progress Bar */}
            <ProgressBar currentStep={1} />

            {/* Inline banners */}
            {verifiedMessage && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    {verifiedMessage}
                </div>
            )}
            {errorMessage && (
                <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {errorMessage}
                </div>
            )}

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {/* KatanaPIM Section */}
                    <Card>
                        <CardContent className="space-y-4 p-6">
                            <h3 className="flex items-center justify-between font-semibold">
                                <div className="flex items-center">
                                    <span>KatanaPIM</span>
                                </div>
                                {/* KatanaPIM Logo Image aligned to the right */}
                                <div className="flex justify-end">
                                    <img
                                        src="/katanapim.png"
                                        alt="KatanaPIM Logo"
                                        style={{ width: "60px", height: "40px" }} // Set width and height to be the same
                                    />
                                </div>
                            </h3>
                            <FormField
                                control={form.control}
                                name="katanaPimUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>KatanaPIM URL <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.katana.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="katanaPimApiKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>API-key KatanaPIM <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Katana API key" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* WooCommerce Section */}
                    <Card>
                        <CardContent className="space-y-4 p-6">
                            <h3 className="flex items-center justify-between font-semibold">
                                <div className="flex items-center">
                                    <span>WooCommerce</span>
                                </div>
                                {/* WooCommerce Logo Image aligned to the right */}
                                <div className="flex justify-end">
                                    <img
                                        src="/woo.png"
                                        alt="WooCommerce Logo"
                                        style={{ width: "30px", height: "20px" }} // Set width and height to be the same
                                    />
                                </div>
                            </h3>
                            <FormField
                                control={form.control}
                                name="webshopUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Webshop URL <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.shop.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="wooCommerceApiKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>API-key customer WooCommerce <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter customer key" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="wooCommerceApiSecret"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>API-key secret WooCommerce <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter secret key" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={onPreviousStep} disabled={verifying}>
                            Previous
                        </Button>
                        <Button type="submit" className="bg-[#873EFF]" disabled={!form.formState.isValid || verifying}>
                            {verifying ? "Verifying…" : "Next step"} <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </motion.div>
    );
}
