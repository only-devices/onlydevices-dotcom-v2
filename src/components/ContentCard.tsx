// src/components/ContentCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { formatDistance } from 'date-fns'

interface ContentCardProps {
  title: string
  description: string
  slug: string
  publishedAt: Date
  author: string
  coverImage?: string
}

export default function ContentCard({
  title,
  description,
  slug,
  publishedAt,
  author,
  coverImage,
}: ContentCardProps) {
  return (
    <Link href={`/news/${slug}`}>
      {/* The card container with hover effects */}
      <div className="group h-full rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        {/* Cover image container */}
        {coverImage && (
          <div className="relative h-48 w-full">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {/* Content section */}
        <div className="p-6">
          {/* Metadata row */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{author}</span>
            <span>•</span>
            <time dateTime={publishedAt.toISOString()}>
              {formatDistance(publishedAt, new Date(), { addSuffix: true })}
            </time>
          </div>

          {/* Title */}
          <h3 className="mt-2 text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="mt-2 text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}