'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (data: { author: string; rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || rating === 0 || !comment) {
      setError('Please fill out all fields and provide a rating.');
      return;
    }
    onSubmit({ author, rating, comment });
    setAuthor('');
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="author">Your Name</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                (hoverRating || rating) >= star
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience on the trail..."
          rows={4}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full">Submit Review</Button>
    </form>
  );
}
