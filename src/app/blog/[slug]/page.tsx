import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock blog data - in a real app, this would come from a database or CMS
const blogPosts = {
  'getting-started-with-nextjs': {
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful React framework that makes building full-stack web applications simple and efficient. In this post, we\'ll explore the basics of Next.js and how to get started with your first project.',
    author: 'John Doe',
    date: '2024-01-15'
  },
  'dynamic-routing-explained': {
    title: 'Dynamic Routing Explained',
    content: 'Dynamic routes in Next.js allow you to create pages that can handle different parameters. This is perfect for blog posts, user profiles, product pages, and more.',
    author: 'Jane Smith',
    date: '2024-01-20'
  },
  'api-routes-best-practices': {
    title: 'API Routes Best Practices',
    content: 'Next.js API routes provide a powerful way to build backend functionality. Learn the best practices for creating robust and scalable API endpoints.',
    author: 'Mike Johnson',
    date: '2024-01-25'
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post &quot;{slug}&quot; doesn&apos;t exist.</p>
          <Link 
            href="/blog"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link 
        href="/blog"
        className="text-blue-500 hover:text-blue-700 mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      
      <article className="prose lg:prose-xl max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>
        
        <div className="text-lg leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}

