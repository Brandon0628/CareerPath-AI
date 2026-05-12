import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Send, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  name: string | null;
  comment: string;
  rating: number;
  created_at: string;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`transition-all ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async () => {
    const { data } = await (supabase as any)
      .from("user_reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast({ title: "Please write a comment", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Please select a star rating", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await (supabase as any).from("user_reviews").insert({
      name: name.trim() || null,
      comment: comment.trim(),
      rating,
    });

    if (error) {
      toast({ title: "Failed to submit. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Review submitted! Thank you 🙏" });
      setName("");
      setComment("");
      setRating(0);
      fetchReviews();
    }
    setSubmitting(false);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Back */}
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground">
            <ArrowLeft className="h-3 w-3" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10">
            <MessageSquare className="h-6 w-6 text-amber-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            What Students Say
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real feedback from real students using CareerPath AI
          </p>
          {reviews.length > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 border border-amber-200">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-amber-700">{avgRating}</span>
              <span className="text-sm text-amber-600">average from {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {/* Submit form */}
        <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-foreground">Leave a Review</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Your Rating *
              </label>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Your Name (optional)
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Leave blank to post as Anonymous"
                className="bg-background"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Your Comment *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How did CareerPath AI help you? What did you discover?"
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !comment.trim() || rating === 0}
              className="gap-2 w-full sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>

        {/* Reviews list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <MessageSquare className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">No reviews yet</p>
            <p className="text-sm">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {review.name ? review.name[0].toUpperCase() : "A"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.name || "Anonymous"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{timeAgo(review.created_at)}</p>
                    </div>
                  </div>
                  <StarRating value={review.rating} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;