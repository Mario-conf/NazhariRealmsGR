import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { notFound } from 'next/navigation';

const BlogPostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  date: z.string().date(),
  image: z.string().url(),
  imageHint: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

const BlogPostsSchema = z.array(BlogPostSchema);

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'posts.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const posts = JSON.parse(data);
    return BlogPostsSchema.parse(posts);
  } catch (error) {
    console.error("Error reading or parsing blog posts:", error);
    // In a real app, you might want to return an empty array or handle this differently
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchPosts();
  // Sort posts by date in descending order (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return post;
}
