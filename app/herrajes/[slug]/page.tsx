'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from '@/contexts/cartContext'
import { Product } from '@/types/product'
import { ProductCard } from '@/components/ProductCard'
const DEFAULT_IMAGE_URL = '/default_product.jpg'

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`);
        
        if (response.status === 200 && response.data) {
          setProduct(response.data.product);
          setSuggestedProducts(response.data.similarProducts);
        } else {
          console.error('Product not found or invalid response');
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductAndSuggestions();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product,  });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Card>
            <CardContent className="p-4">
              <Image
                src={product.url || DEFAULT_IMAGE_URL}
                alt={product.name}
                width={200}
                height={200}
                layout="responsive"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="text-2xl font-bold text-orange-600 mb-4">${product.price.toFixed(2)}</div>
          <p className="text-gray-600 mb-6">Color: {product.color}</p>
          <p className="text-gray-600 mb-6">Type: {product.type_material}</p>
          <Button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-600 text-white">
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestedProducts.map((suggestedProduct) => (
            <ProductCard key={suggestedProduct._id} product={suggestedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}