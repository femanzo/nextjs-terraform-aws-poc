import Link from 'next/link';
import Image from 'next/image';

// Mock product data - same as in the dynamic routes
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

const categoryInfo = {
  electronics: {
    name: 'Electronics',
    description: 'Latest gadgets and technology',
    icon: '📱'
  },
  clothing: {
    name: 'Clothing',
    description: 'Fashion and apparel',
    icon: '👕'
  }
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Products</h1>
        <p className="text-xl text-gray-600">Browse our categories</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(products).map(([categoryKey, categoryProducts]) => {
          const category = categoryInfo[categoryKey as keyof typeof categoryInfo];
          const productCount = Object.keys(categoryProducts).length;
          const featuredProduct = Object.values(categoryProducts)[0];
          
          return (
            <Link key={categoryKey} href={`/products/${categoryKey}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{category.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">{productCount} products available</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Starting from ${Math.min(...Object.values(categoryProducts).map(p => p.price)).toFixed(2)}
                    </div>
                    <span className="text-blue-500 font-semibold">Browse →</span>
                  </div>
                </div>
                
                {featuredProduct && (
                  <div className="relative h-48 bg-gray-100">
                    <Image 
                      src={featuredProduct.image} 
                      alt={featuredProduct.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-white text-sm font-medium">{featuredProduct.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}