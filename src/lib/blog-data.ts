import fs from 'fs/promises';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  imageHint: string;
}

// This function now fetches the blog posts from the JSON file.
// It's async because file reading is an async operation.
async function fetchPosts(): Promise<BlogPost[]> {
  // We construct the path to the JSON file in the public directory.
  const filePath = path.join(process.cwd(), 'public', 'posts.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const posts: BlogPost[] = JSON.parse(data);
    return posts;
  } catch (error) {
    console.error('Failed to read or parse blog posts:', error);
    return []; // Return an empty array in case of an error.
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return await fetchPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchPosts();
  return posts.find((post) => post.slug === slug);
}
