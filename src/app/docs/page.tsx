import Link from 'next/link';

// Mock documentation structure - same as in the catch-all route
const documentation = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    icon: '🚀',
    children: {
      'installation': { title: 'Installation' },
      'configuration': { title: 'Configuration' }
    }
  },
  'api': {
    title: 'API Reference',
    description: 'Complete API documentation with examples',
    icon: '📚',
    children: {
      'authentication': { title: 'Authentication' },
      'endpoints': { title: 'API Endpoints' }
    }
  },
  'tutorials': {
    title: 'Tutorials',
    description: 'Step-by-step guides and examples',
    icon: '🎓',
    children: {
      'first-app': { title: 'Building Your First App' },
      'advanced-features': { title: 'Advanced Features' }
    }
  }
};

export default function DocsIndexPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-gray-600">Everything you need to know about our platform</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(documentation).map(([sectionKey, section]) => (
          <Link key={sectionKey} href={`/docs/${sectionKey}`}>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{section.icon}</span>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              
              <p className="text-gray-600 mb-6">{section.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Topics:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {Object.entries(section.children).map(([childKey, childSection]) => (
                    <li key={childKey} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {childSection.title}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-blue-500 font-semibold">Read more →</div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Need Help?</h2>
        <p className="text-gray-700 mb-4">
          Can&apos;t find what you&apos;re looking for? Check out our additional resources.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Blog Posts →
          </Link>
          <Link 
            href="/users"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Community →
          </Link>
        </div>
      </div>
    </div>
  );
}