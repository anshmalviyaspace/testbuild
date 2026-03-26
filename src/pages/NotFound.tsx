import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-[120px] font-extrabold leading-none text-muted-foreground/10 select-none">
          404
        </h1>
        <p className="font-heading text-xl font-bold -mt-4 mb-2">This page doesn't exist.</p>
        <p className="text-sm text-primary mb-8">But your next project should.</p>
        <Link
          to="/dashboard/home"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
