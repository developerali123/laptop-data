import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

type LetsGoProps = {
  onNextStep: () => void;      // use this as "Finish"
  onPreviousStep: () => void;
};

export default function LetsGo({ onNextStep, onPreviousStep }: LetsGoProps) {
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
        <span className="hidden sm:inline">Let’s Go</span>
      </div>

      {/* Step Progress Bar (final step) */}
      <ProgressBar currentStep={6} />

      {/* Centered success content */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500"
          aria-hidden="true"
        >
          <Check className="h-12 w-12 text-white" />
        </motion.div>

        <h2 className="text-2xl font-semibold tracking-tight">
          Ready to Go! 🚀
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Your integration is configured and ready to use.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onPreviousStep}>
          Previous
        </Button>
        <Button type="button" className="bg-[#873EFF]" onClick={onNextStep}>
          Finish
        </Button>
      </div>
    </motion.div>
  );
}
