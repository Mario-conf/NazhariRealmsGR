import { getBlogPost } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('BlogPostPage');
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_blog')}
        </Link>
      </div>
      <header className="mb-10 md:mb-16 text-center">
        <h1 className="font-serif text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl !leading-tight">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <User className="h-4 w-4"/>
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4"/>
                <time dateTime={post.date}>{post.date}</time>
            </div>
        </div>
      </header>

      <div className="relative mb-10 md:mb-16">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={675}
          data-ai-hint={post.imageHint}
          className="w-full h-auto aspect-video object-cover rounded-2xl shadow-lg"
          priority
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none mx-auto prose-p:leading-relaxed prose-headings:font-serif"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
