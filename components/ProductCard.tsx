import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/cartContext'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product page
    addToCart({ ...product })
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl bg-white w-full">
      <Link href={`/herrajes/${encodeURIComponent(product._id)}`} className="flex flex-col h-full">
        <div className="relative aspect-square w-full">
          <Image
            src={product.url || '/default_product.jpg'}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-2 sm:p-3">
          <CardTitle className="text-sm sm:text-base text-orange-700 line-clamp-2">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-2 sm:p-3">
          <p className="text-lg sm:text-xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
          {product.type_material && <p className="text-xs text-gray-500 truncate">{product.type_material}</p>}
          {product.color && <p className="text-xs text-gray-500 truncate">Color: {product.color}</p>}
        </CardContent>
        <CardFooter className="p-2 sm:p-3">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300 text-xs py-1 sm:py-2"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Agregar al Carrito
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}