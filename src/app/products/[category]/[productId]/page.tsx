import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

// Mock product data - in a real app, this would come from a database
const products = {
  electronics: {
    'laptop-001': {
      id: 'laptop-001',
      name: 'MacBook Pro 16"',
      category: 'electronics',
      price: 2499,
      description: 'The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip — the first of a new generation of Apple silicon for pro users — you get groundbreaking performance and amazing battery life.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      specs: {
        processor: 'M2 Pro',
        memory: '16GB',
        storage: '512GB SSD',
        display: '16-inch Retina'
      }
    },
    'phone-001': {
      id: 'phone-001',
      name: 'iPhone 15 Pro',
      category: 'electronics',
      price: 999,
      description: 'iPhone 15 Pro. Titanium. So strong. So light. So Pro. A17 Pro chip. 3x camera. Action button.',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      specs: {
        processor: 'A17 Pro',
        memory: '8GB',
        storage: '128GB',
        display: '6.1-inch Super Retina XDR'
      }
    }
  },
  clothing: {
    'shirt-001': {
      id: 'shirt-001',
      name: 'Premium Cotton T-Shirt',
      category: 'clothing',
      price: 29.99,
      description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      specs: {
        material: '100% Organic Cotton',
        fit: 'Regular',
        sizes: 'XS, S, M, L, XL',
        care: 'Machine wash cold'
      }
    },
    'jeans-001': {
      id: 'jeans-001',
      name: 'Slim Fit Jeans',
      category: 'clothing',
      price: 79.99,
      description: 'Classic slim fit jeans with a modern twist. Comfortable stretch denim that looks great and feels even better.',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
      specs: {
        material: '98% Cotton, 2% Elastane',
        fit: 'Slim',
        sizes: '28-36',
        care: 'Machine wash cold'
      }
    }
  }
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, productId } = await params;
  const categoryProducts = products[category as keyof typeof products];
  const product = categoryProducts?.[productId as keyof typeof categoryProducts];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            Product &quot;{productId}&quot; in category &quot;{category}&quot; doesn&apos;t exist.
          </p>
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

  // Type assertion to ensure product is properly typed
  const typedProduct = product as {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    specs: Record<string, string>;
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <nav className="mb-8">
        <Link href="/products" className="text-blue-500 hover:text-blue-700">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/products/${category}`} className="text-blue-500 hover:text-blue-700 capitalize">
          {category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{typedProduct.name}</span>
      </nav>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img 
            src={typedProduct.image} 
            alt={typedProduct.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{typedProduct.name}</h1>
          <div className="text-3xl font-bold text-green-600 mb-6">
            ${typedProduct.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            {typedProduct.description}
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(typedProduct.specs).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium capitalize">{key}:</span>
                  <span className="ml-2 text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

