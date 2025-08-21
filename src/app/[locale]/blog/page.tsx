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

export default function BlogPage() {
  const t = useTranslations('BlogIndexPage');
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>
                {post.date} por {post.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-primary hover:underline"
              >
                {t('read_more')}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
