import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/lib/blog-utils'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div className="space-y-8 mb-20">
      <h1 className="text-6xl font-bold">Latest posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="group"
              href={`/blog/${post.slug}`}
            >
              {/* Card Container */}
              <div className="rounded-3xl overflow-hidden">
                {/* Image Section */}
                <div className="bg-blue-200 h-48 relative">
                  {post.metadata.image && (
                    <img
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* Content Section */}
                <div className="bg-gray-50 dark:bg-gray-900 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full text-sm">
                      {post.metadata.category || 'Basics'}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {formatDate(post.metadata.publishedAt, false)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {post.metadata.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}