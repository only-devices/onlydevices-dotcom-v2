import { Metadata } from 'next'
import ContentCard from '@/components/ContentCard'
import { getNotionPosts } from '@/lib/notion'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Latest News & Updates | Your Company',
  description: 'Stay up to date with the latest industry insights, product updates, and company news.',
}

export const revalidate = 3600 // Revalidate every hour

export default async function NewsPage() {
  const posts = await getNotionPosts()

  return (
    <div className="relative">
      {/* Background gradient similar to home page */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Latest Updates
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay informed with our latest insights and announcements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ContentCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              publishedAt={post.publishedAt}
              coverImage={post.coverImage}
              author={post.author}
            />
          ))}
        </div>
      </div>
      {/* Footer section */}
    <Footer />
    </div>
  )
}