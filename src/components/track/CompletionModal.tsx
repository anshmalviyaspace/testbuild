import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  moduleName: string;
  uncheckedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function CompletionModal({
  moduleName,
  uncheckedCount,
  onConfirm,
  onCancel,
  isSaving = false,
}: Props) {
  const hasUnchecked = uncheckedCount > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={!isSaving ? onCancel : undefined}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-5 animate-scale-in"
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              hasUnchecked ? "bg-warning/10" : "bg-primary/10"
            }`}
          >
            {hasUnchecked ? (
              <AlertTriangle size={18} className="text-warning" />
            ) : (
              <CheckCircle2 size={18} className="text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg">
              {hasUnchecked ? "Are you sure?" : "Ready to move on?"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {hasUnchecked ? (
                <>
                  You have{" "}
                  <span className="text-foreground font-medium">
                    {uncheckedCount} resource{uncheckedCount > 1 ? "s" : ""}
                  </span>{" "}
                  left in{" "}
                  <span className="text-foreground font-medium">"{moduleName}"</span>. Sure
                  you want to continue?
                </>
              ) : (
                <>
                  All resources reviewed in{" "}
                  <span className="text-foreground font-medium">"{moduleName}"</span>. Nice
                  work! Your XP will be added immediately.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            disabled={isSaving}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Saving…
              </>
            ) : (
              "Complete Module ✓"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}