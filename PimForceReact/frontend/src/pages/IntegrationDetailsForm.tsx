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
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type IntegrationDetailsProps = {
  defaultValues?: FormValues; 
  onNextStep: (data: FormValues) => void;
  onPreviousStep: () => void;
};

// Zod schema (name required)
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function IntegrationDetailsForm({
  defaultValues,
  onNextStep,
  onPreviousStep,
}: IntegrationDetailsProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? { name: "", description: "" },
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
        <span className="hidden sm:inline">Integration details</span>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">Create integration</h2>

      {/* Progress Bar — first step (Template) highlighted */}
      <ProgressBar currentStep={0} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Integration details */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold">Integration details</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                      <FormLabel>
                        Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KatanaPIM → WooCommerce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of this integration (optional)"
                          className="min-h-[110px]"
                          {...field}
                        />
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
              disabled={!form.formState.isValid}
            >
              Next step <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
