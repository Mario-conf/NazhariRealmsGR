"use client";

import { Trail, Review } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/star-rating";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Timer, Route, BarChart3, Milestone, Trees, Mountain, Waves } from "lucide-react";
import { Badge } from "./ui/badge";

interface TrailDetailsDialogProps {
  trail: Trail;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
  isOpen: boolean;
  onClose: () => void;
}

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters").max(500),
  user: z.string().min(2, "Name is required").max(50),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const terrainIconMap = {
    Mountain: <Mountain className="h-4 w-4" />,
    Forest: <Trees className="h-4 w-4" />,
    Coastal: <Waves className="h-4 w-4" />,
    Desert: <Milestone className="h-4 w-4" />,
};

export function TrailDetailsDialog({ trail, reviews, onAddReview, isOpen, onClose }: TrailDetailsDialogProps) {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "", user: "" }
  });

  const onSubmit = (data: ReviewFormData) => {
    onAddReview({ ...data, trailId: trail.id });
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pr-6">
          <Image src={trail.imageUrl} alt={trail.name} width={800} height={400} className="w-full h-64 object-cover rounded-t-lg" data-ai-hint={trail.imageHint} />
          <div className="pt-4">
            <DialogTitle className="text-3xl font-headline">{trail.name}</DialogTitle>
            <DialogDescription className="text-base">{trail.location}</DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto px-6 pb-6">
          <div className="md:col-span-2">
            <p className="text-foreground/90">{trail.description}</p>
            <Separator className="my-6" />
            
            <h3 className="font-headline text-xl mb-4">Reviews ({reviews.length})</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                     <p className="font-semibold">{review.user}</p>
                     <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">{review.comment}</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              )) : (
                 <p className="text-muted-foreground">Be the first to review this trail!</p>
              )}
            </div>
            
            <Separator className="my-6" />

            <h3 className="font-headline text-xl mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="user">Your Name</Label>
                <input id="user" {...register("user")} className="mt-1 block w-full border-border rounded-md shadow-sm p-2 bg-input" />
                {errors.user && <p className="text-destructive text-sm mt-1">{errors.user.message}</p>}
              </div>
              <div>
                <Label>Rating</Label>
                <Controller name="rating" control={control} render={({ field }) => (
                  <StarRating rating={field.value} onRate={field.onChange} isInteractive size={24} className="mt-1" />
                )} />
                {errors.rating && <p className="text-destructive text-sm mt-1">{errors.rating.message}</p>}
              </div>
              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" {...register("comment")} className="mt-1" />
                {errors.comment && <p className="text-destructive text-sm mt-1">{errors.comment.message}</p>}
              </div>
              <Button type="submit">Submit Review</Button>
            </form>

          </div>
          <aside className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-headline text-lg mb-3">Trail Stats</h4>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2"><Route className="h-4 w-4 text-primary"/> <span>{trail.distance} km</span></div>
                    <div className="flex items-center gap-2"><Timer className="h-4 w-4 text-primary"/> <span>{trail.duration} hours</span></div>
                    <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary"/> <Badge variant={trail.difficulty === 'Easy' ? 'default' : trail.difficulty === 'Moderate' ? 'secondary' : 'destructive'} className="text-xs">{trail.difficulty}</Badge></div>
                    {trail.hasHistoricalElements && <div className="flex items-center gap-2"><Milestone className="h-4 w-4 text-primary"/> <span>Historical elements</span></div>}
                </div>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-headline text-lg mb-3">Terrain</h4>
                <div className="flex flex-wrap gap-2">
                    {trail.terrain.map(t => (
                        <Badge key={t} variant="outline" className="flex items-center gap-1.5">
                            {terrainIconMap[t]} {t}
                        </Badge>
                    ))}
                </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
