import Link from 'next/link';
import Image from 'next/image';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Mock product data - same as in the nested dynamic route
const products = {
  electronics: {
    'laptop-001': {
      id: 'laptop-001',
      name: 'MacBook Pro 16"',
      category: 'electronics',
      price: 2499,
      description: 'The most powerful MacBook Pro ever is here.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
    },
    'phone-001': {
      id: 'phone-001',
      name: 'iPhone 15 Pro',
      category: 'electronics',
      price: 999,
      description: 'iPhone 15 Pro. Titanium. So strong. So light. So Pro.',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
    }
  },
  clothing: {
    'shirt-001': {
      id: 'shirt-001',
      name: 'Premium Cotton T-Shirt',
      category: 'clothing',
      price: 29.99,
      description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
    },
    'jeans-001': {
      id: 'jeans-001',
      name: 'Slim Fit Jeans',
      category: 'clothing',
      price: 79.99,
      description: 'Classic slim fit jeans with a modern twist.',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop'
    }
  }
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryProducts = products[category as keyof typeof products];

  if (!categoryProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">Category &quot;{category}&quot; doesn&apos;t exist.</p>
          <Link 
            href="/products"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <nav className="mb-8">
        <Link href="/products" className="text-blue-500 hover:text-blue-700">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 capitalize">{category}</span>
      </nav>
      
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 capitalize">{category}</h1>
        <p className="text-xl text-gray-600">
          {Object.keys(categoryProducts).length} products available
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categoryProducts).map(([productId, product]) => (
          <Link key={productId} href={`/products/${category}/${productId}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <Image 
                src={product.image} 
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

