import Link from 'next/link';

interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

interface DocSection {
  title: string;
  content: string;
  children?: Record<string, DocSection>;
}

// Mock documentation structure
const documentation: Record<string, DocSection> = {
  'getting-started': {
    title: 'Getting Started',
    content: 'Welcome to our documentation! This guide will help you get started with our platform.',
    children: {
      'installation': {
        title: 'Installation',
        content: 'Follow these steps to install and set up the platform on your system.'
      },
      'configuration': {
        title: 'Configuration',
        content: 'Learn how to configure the platform to meet your specific needs.'
      }
    }
  },
  'api': {
    title: 'API Reference',
    content: 'Complete API documentation with examples and usage patterns.',
    children: {
      'authentication': {
        title: 'Authentication',
        content: 'Learn about our authentication methods and security best practices.'
      },
      'endpoints': {
        title: 'API Endpoints',
        content: 'Detailed documentation for all available API endpoints.'
      }
    }
  },
  'tutorials': {
    title: 'Tutorials',
    content: 'Step-by-step tutorials to help you learn and master our platform.',
    children: {
      'first-app': {
        title: 'Building Your First App',
        content: 'A comprehensive tutorial to build your first application using our platform.'
      },
      'advanced-features': {
        title: 'Advanced Features',
        content: 'Explore advanced features and techniques to enhance your applications.'
      }
    }
  }
};

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  
  // Navigate through the documentation structure based on the slug
  let currentSection: DocSection | Record<string, DocSection> = documentation;
  const breadcrumbs = [{ title: 'Documentation', path: '/docs' }];
  
  for (const segment of slug) {
    if ('children' in currentSection && currentSection.children && segment in currentSection.children) {
      const childSection: DocSection = (currentSection.children as Record<string, DocSection>)[segment];
      currentSection = childSection;
      breadcrumbs.push({ 
        title: childSection.title, 
        path: `/docs/${slug.slice(0, slug.indexOf(segment) + 1).join('/')}` 
      });
    } else if (typeof currentSection === 'object' && segment in currentSection) {
      const section: DocSection = (currentSection as Record<string, DocSection>)[segment];
      currentSection = section;
      breadcrumbs.push({ 
        title: section.title, 
        path: `/docs/${slug.slice(0, slug.indexOf(segment) + 1).join('/')}` 
      });
    } else {
      // Section not found
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">
              The documentation page &quot;{slug.join('/')}&quot; doesn&apos;t exist.
            </p>
            <Link 
              href="/docs"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Back to Documentation
            </Link>
          </div>
        </div>
      );
    }
  }

  // At this point, currentSection should be a DocSection
  const docSection = currentSection as DocSection;

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path}>
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-600">{crumb.title}</span>
            ) : (
              <Link 
                href={crumb.path}
                className="text-blue-500 hover:text-blue-700"
              >
                {crumb.title}
              </Link>
            )}
          </span>
        ))}
      </nav>
      
      {/* Page Content */}
      <article>
        <h1 className="text-4xl font-bold mb-6">{docSection.title}</h1>
        <div className="prose lg:prose-xl max-w-none mb-12">
          <p className="text-lg leading-relaxed">{docSection.content}</p>
        </div>
        
        {/* Sub-sections */}
        {docSection.children && Object.keys(docSection.children).length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Topics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(docSection.children).map(([childSlug, childSection]) => (
                <Link 
                  key={childSlug}
                  href={`/docs/${slug.join('/')}/${childSlug}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{childSection.title}</h3>
                  <p className="text-gray-600 text-sm">{childSection.content}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

