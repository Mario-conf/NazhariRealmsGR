import { getBlogPost } from '@/lib/blog-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { translateText } from '@/ai/flows/translate-flow';

// This function generates the static paths for each blog post
export async function generateStaticParams() {
  const { getBlogPosts } = await import('@/lib/blog-data');
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { translatedText } = await translateText({
    text: post.content,
    targetLanguage: params.locale,
  });

  return (
    <article className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="overflow-hidden shadow-lg">
        {/* Main Image */}
        <div className="relative h-64 w-full md:h-80">
          <Image
            src={post.image}
            alt={post.imageHint}
            fill
            className="object-cover"
            priority
          />
        </div>

        <CardHeader className="p-6 md:p-8">
          <CardTitle className="font-serif text-3xl font-bold leading-tight md:text-4xl">
            {post.title}
          </CardTitle>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString(params.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 pt-0">
          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* HTML Content */}
          <div
            className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-serif prose-headings:text-foreground prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: translatedText }}
          />
        </CardContent>
      </Card>
    </article>
  );
}
