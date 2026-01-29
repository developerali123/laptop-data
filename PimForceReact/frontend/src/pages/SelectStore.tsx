import ProgressBar from "@/components/ProgressBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronRight, StoreIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { StoreItem } from "./IntegrationPage"; // or move the type to a shared file

type SelectStoreProps = {
  defaultValues?: FormValues;
  onNextStep: (store: StoreItem) => void;
  onPreviousStep: () => void;
  preloadedStores?: StoreItem[];     // ✅ NEW
};

const formSchema = z.object({
  storeId: z.string().min(1, "Store selection is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Card component for a store
const StoreCard = ({
  s,
  selected,
  onSelect,
}: {
  s: StoreItem;
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={selected}
      role="radio"
      aria-checked={selected}
      className={[
        "text-left focus:outline-none",
        "rounded-xl transition-all",
        selected
          ? "ring-2 ring-[#3B82F6]/60 bg-muted/40"
          : "ring-1 ring-border hover:ring-[#3B82F6]/40",
      ].join(" ")}
    >
      <Card className="border-none shadow-none">
        <CardContent className="flex items-start gap-4 p-4 sm:p-6">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-blue-700">
            <StoreIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold truncate">{s.Name}</div>
            <div className="text-sm text-muted-foreground truncate">
              {s.SystemName}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Store ID: {s.Id}</div>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
};

export default function SelectStore({ defaultValues,
  onNextStep,
  onPreviousStep,
  preloadedStores = [], }: SelectStoreProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? { storeId: "" },
    mode: "onChange",
  });

  const [stores, setStores] = useState<StoreItem[]>([]);

  useEffect(() => {
    // ✅ If we already have preloaded stores, skip fetching
    if (preloadedStores && preloadedStores.length > 0) {
      setStores(preloadedStores);
      return;
    }
  }, [preloadedStores]);  

  const selectedStore = stores.find((s) => String(s.Id) === form.watch("storeId"));

  const handleSubmit = (values: FormValues) => {
    const chosen = stores.find((s) => String(s.Id) === values.storeId);
    if (chosen) onNextStep(chosen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="hidden sm:inline">Setup</span>
        <ChevronRight className="hidden h-4 w-4 sm:inline" />
        <span className="hidden sm:inline">Store</span>
      </div>

      <ProgressBar currentStep={2} />

      {/* Selected banner */}
      {selectedStore && (
        <motion.div initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <Alert className="border-blue-200 bg-blue-50 text-blue-900">
            <AlertDescription className="text-sm">
              <span className="font-medium">Store selected:</span> {selectedStore.Name}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="storeId"
            render={({ field }) => (
              <FormItem>
                {/* The grid of selectable store cards */}
                <FormControl>
                  <div
                    role="radiogroup"
                    aria-label="Select a store"
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {stores.map((s) => {
                      const isSelected = field.value === String(s.Id);
                      return (
                        <StoreCard
                          key={s.Id}
                          s={s}
                          selected={isSelected}
                          onSelect={() => field.onChange(String(s.Id))}
                        />
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
                
              </FormItem>
            )}
          />

          <div className="flex justify-between">
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
