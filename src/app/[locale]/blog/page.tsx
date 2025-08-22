import { getBlogPosts, BlogPost } from '@/lib/blog-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export default async function BlogPage() {
  const t = useTranslations('BlogPage');
  const posts = await getBlogPosts();

  // Helper to strip HTML for plain text preview
  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') {
        // Cheating on the server side - this is not robust
        return html.replace(/<[^>]*>?/gm, '');
    }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </header>

      {posts.length === 0 ? (
         <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-xl font-semibold text-muted-foreground">
                {t('no_posts_title')}
            </p>
            <p className="text-muted-foreground">
                {t('no_posts_subtitle')}
            </p>
        </div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="p-0">
                 <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 w-full">
                        <Image
                            src={post.image}
                            alt={post.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <CardTitle className="font-serif text-xl mb-1">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <p className="line-clamp-3 text-muted-foreground">{stripHtml(post.content)}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>{t('read_more')}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
      )}
    </div>
  );
}
