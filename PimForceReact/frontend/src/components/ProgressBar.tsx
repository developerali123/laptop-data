export default function ProgressBar({ currentStep = 2 }: { currentStep: number }) {
  const steps = ["Integrate", "Details", "Store", "Fields", "Specification", "Let's Go 🚀"];

  const BAR_VPAD = 16;           // matches py-4
  const GAP_AFTER_ARROW = 16;    // space after chevron (px)

  return (
    <div className="space-y-6">
      <div className="border-2 border-[#E0E0E0] rounded-xl py-4 px-6">
        <div className="relative mx-auto flex w-full max-w-7xl items-stretch">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            const circle =
              isCompleted || isActive
                ? "bg-[#873EFF] text-white border-[#873EFF]"
                : "bg-white text-[#873EFF] border-[#E0E0E0]";
            const label = isCompleted || isActive ? "text-[#873EFF]" : "text-muted-foreground";

            const connectorStroke = "#E0E0E0";

            return (
              <div
                key={index}
                className="relative flex w-full items-center pr-6"
                // add space AFTER the arrow for all steps except the first
                style={{ paddingLeft: index > 0 ? GAP_AFTER_ARROW : 0 }}
              >
                <div className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${circle}`}>
                    {isCompleted ? (
                      <span className="text-white text-sm">✔</span>
                    ) : (
                      <span className="font-semibold text-sm">{index + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-md ${label}`}>{step}</span>
                </div>

                {/* full-height chevron (stroke only) */}
                {index < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute right-0 w-6"
                    style={{ top: -BAR_VPAD, bottom: -BAR_VPAD }}
                  >
                    <svg viewBox="0 0 24 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                      <path d="M1 2 L23 50" stroke={connectorStroke} strokeWidth="2" fill="none" />
                      <path d="M1 98 L23 50" stroke={connectorStroke} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
