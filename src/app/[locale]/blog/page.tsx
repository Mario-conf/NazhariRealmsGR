import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getBlogPosts } from '@/lib/blog-data';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// This is now an async component because getBlogPosts is async
export default async function BlogPage() {
  const t = useTranslations('BlogIndexPage');
  // We need to `await` the result of getBlogPosts
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <Card
              className="flex h-full flex-col overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2"
            >
              <CardHeader className="p-0">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      data-ai-hint={post.imageHint}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col p-6">
                <CardTitle className="font-serif text-xl mb-2 !leading-tight">
                  {post.title}
                </CardTitle>
                 <CardDescription className="mb-4 text-sm">
                   {post.author} &middot; {post.date}
                </CardDescription>
                <p className="text-muted-foreground flex-grow">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center font-semibold text-primary">
                  <span>{t('read_more')}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
