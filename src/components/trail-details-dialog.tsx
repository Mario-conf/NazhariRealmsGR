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
import { Timer, Route, Mountain, Waves, Trees, Milestone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

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

const reviewDistribution = (reviews: Review[]) => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(r => {
        if(r.rating >= 1 && r.rating <= 5) {
            counts[r.rating -1]++;
        }
    });
    const total = reviews.length;
    if(total === 0) return [0,0,0,0,0];
    return counts.map(c => (c/total) * 100).reverse();
}

export function TrailDetailsDialog({ trail, reviews, onAddReview, isOpen, onClose }: TrailDetailsDialogProps) {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "", user: "" }
  });

  const onSubmit = (data: ReviewFormData) => {
    onAddReview({ ...data, trailId: trail.id });
    reset();
  };

  const reviewPercentages = reviewDistribution(reviews);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] flex flex-col p-0">
        <div className="relative flex-shrink-0">
            <Image src={trail.imageUrl} alt={trail.name} width={800} height={300} className="w-full h-48 object-cover" data-ai-hint={trail.imageHint} />
        </div>
        
        <div className="flex-grow overflow-y-auto px-4 pb-6">
            <DialogHeader className="pt-4 text-left">
                <DialogTitle className="text-2xl font-bold leading-tight tracking-[-0.015em]">{trail.name}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground pt-1">{trail.description}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
                <div className="flex justify-between gap-x-6 py-1.5">
                    <p className="text-muted-foreground text-sm font-normal">Difficulty</p>
                    <p className="text-foreground text-sm font-medium text-right">{trail.difficulty}</p>
                </div>
                <div className="flex justify-between gap-x-6 py-1.5">
                    <p className="text-muted-foreground text-sm font-normal">Duration</p>
                    <p className="text-foreground text-sm font-medium text-right">{trail.duration} hours</p>
                </div>
                <div className="flex justify-between gap-x-6 py-1.5">
                    <p className="text-muted-foreground text-sm font-normal">Distance</p>
                    <p className="text-foreground text-sm font-medium text-right">{trail.distance} km</p>
                </div>
                <div className="flex justify-between gap-x-6 py-1.5">
                    <p className="text-muted-foreground text-sm font-normal">Terrain</p>
                    <div className="flex flex-wrap gap-2 justify-end">
                        {trail.terrain.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                    </div>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-x-8 gap-y-6">
                <div className="flex flex-col gap-1.5">
                    <p className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">{trail.averageRating.toFixed(1)}</p>
                    <StarRating rating={trail.averageRating} size={18} />
                    <p className="text-muted-foreground text-base font-normal">{reviews.length} reviews</p>
                </div>
                <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-x-3 gap-y-2">
                    {reviewPercentages.map((pct, i) => (
                        <React.Fragment key={i}>
                            <p className="text-foreground text-sm font-normal">{5-i}</p>
                            <Progress value={pct} className="h-2"/>
                            <p className="text-muted-foreground text-sm font-normal text-right">{Math.round(pct)}%</p>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <Separator className="my-4" />
            
            <h3 className="font-bold text-lg mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="user" className="font-medium text-sm">Your Name</Label>
                <input id="user" {...register("user")} className="mt-1 block w-full border-border rounded-md shadow-sm p-2 bg-input" />
                {errors.user && <p className="text-destructive text-sm mt-1">{errors.user.message}</p>}
              </div>
              <div>
                <Label className="font-medium text-sm">Rating</Label>
                <Controller name="rating" control={control} render={({ field }) => (
                  <StarRating rating={field.value} onRate={field.onChange} isInteractive size={22} className="mt-1" />
                )} />
                {errors.rating && <p className="text-destructive text-sm mt-1">{errors.rating.message}</p>}
              </div>
              <div>
                <Label htmlFor="comment" className="font-medium text-sm">Comment</Label>
                <Textarea id="comment" {...register("comment")} className="mt-1" />
                {errors.comment && <p className="text-destructive text-sm mt-1">{errors.comment.message}</p>}
              </div>
              <Button type="submit">Submit Review</Button>
            </form>

            <Separator className="my-4" />

             <h3 className="font-bold text-lg mb-4">Reviews</h3>
            <div className="space-y-4">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="bg-secondary p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="font-semibold">{review.user}</p>
                         <p className="text-xs text-muted-foreground mt-1">{new Date(review.date).toLocaleDateString()}</p>
                     </div>
                     <StarRating rating={review.rating} size={16} />
                  </div>
                  <p className="text-foreground text-sm mt-2">{review.comment}</p>
                </div>
              )) : (
                 <p className="text-muted-foreground">Be the first to review this trail!</p>
              )}
            </div>
        </div>

        <div className="px-4 py-3 border-t bg-background">
            <Button className="w-full h-12 text-base font-bold">Start Navigation</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
