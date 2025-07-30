import Link from 'next/link';

// Mock blog data - same as in the dynamic route
const blogPosts = {
  'getting-started-with-nextjs': {
    title: 'Getting Started with Next.js',
    excerpt: 'Next.js is a powerful React framework that makes building full-stack web applications simple and efficient.',
    author: 'John Doe',
    date: '2024-01-15'
  },
  'dynamic-routing-explained': {
    title: 'Dynamic Routing Explained',
    excerpt: 'Dynamic routes in Next.js allow you to create pages that can handle different parameters.',
    author: 'Jane Smith',
    date: '2024-01-20'
  },
  'api-routes-best-practices': {
    title: 'API Routes Best Practices',
    excerpt: 'Next.js API routes provide a powerful way to build backend functionality.',
    author: 'Mike Johnson',
    date: '2024-01-25'
  }
};

export default function BlogPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600">Latest articles and tutorials</p>
      </header>

      <div className="grid gap-8">
        {Object.entries(blogPosts).map(([slug, post]) => (
          <article key={slug} className="border-b border-gray-200 pb-8">
            <Link href={`/blog/${slug}`}>
              <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>By {post.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}