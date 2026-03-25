import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

export default function PublicProfilePage() {
  const { username } = useParams();

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={14} /> Back
      </Link>
      <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-heading font-bold">
          {username?.slice(0, 2).toUpperCase()}
        </div>
        <h1 className="font-heading text-2xl font-bold">@{username}</h1>
        <p className="text-sm text-muted-foreground font-mono flex items-center justify-center gap-2">
          <Zap size={14} className="text-primary" /> Builder on Buildhub
        </p>
      </div>
    </div>
  );
}
