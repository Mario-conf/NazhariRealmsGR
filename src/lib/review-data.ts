'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { notFound } from 'next/navigation';

const ReviewSchema = z.object({
  id: z.number(),
  slug: z.string(),
  productName: z.string(),
  brand: z.string(),
  category: z.string(),
  author: z.string(),
  date: z.string().date(),
  image: z.string().url(),
  imageHint: z.string(),
  rating: z.number(),
  summary: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  tags: z.array(z.string()),
  content: z.string(),
});

export type Review = z.infer<typeof ReviewSchema>;

const ReviewsSchema = z.array(ReviewSchema);

async function fetchReviews(): Promise<Review[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'reviews.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const reviews = JSON.parse(data);
    return ReviewsSchema.parse(reviews);
  } catch (error) {
    console.error("Error reading or parsing product reviews:", error);
    return [];
  }
}

export async function getReviews(): Promise<Review[]> {
  const reviews = await fetchReviews();
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getReview(slug: string): Promise<Review> {
  const reviews = await fetchReviews();
  const review = reviews.find((r) => r.slug === slug);

  if (!review) {
    notFound();
  }

  return review;
}
