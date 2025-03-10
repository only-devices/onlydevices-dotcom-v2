// src/app/news/[slug]/page.tsx
import { getPostBySlug } from '@/lib/notion';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define proper types for Next.js App Router
type Params = {
  slug: string;
};

type Props = {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
};

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    console.error('Error fetching post from Notion:', error);
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found',
    };
  }
}

// The main page component
export default async function PostPage({ params }: Props) {
  try {
    const post = await getPostBySlug(params.slug);

    return (
      <div className="container mx-auto py-10 px-4">
        <article className="prose lg:prose-xl max-w-4xl mx-auto">
          {post.coverImage && (
            <div className="mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 mb-8">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>

          <div className="mt-8 whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post from Notion:', error);
    notFound();
  }
}