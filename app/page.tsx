'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Download, Star } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/product'

interface Category {
  name: string;
  image: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface Offer {
  title: string;
  description: string;
  image: string;
}

const products: Product[] = [
  // Add your product data here
]

const categories: Category[] = [
  { name: "Barandales", image: "/barandal-merida.jpg" },
  { name: "Canceles de Baño", image: "/cancelbacalar.png" },
  { name: "Aluminio", image: "/chapa.jpg" },
  { name: "Jaladeras y Chapas", image: "/jaladera.jpg" },
]

const reviews: Review[] = [
  { name: "Jaime Rodriguez", rating: 5, comment: "Excelentes productos y servicio" },
  { name: "Marco Sparsa", rating: 5, comment: "Tienen gran surtido y son rapidos para llevarte el pedido" },
  { name: "Nerida Mendoza", rating: 5, comment: "Gran calidad, buen surtido, y rapidos lo mejor de todo" },
]

const offers: Offer[] = [
  { title: "¡Super Oferta!", description: "Kit Cancel bacalar en satin o Negro con barra a 2 metros a solo $1,400", image: "/kitbaclar.png" },
  { title: "¡Super Oferta!", description: "Kit cancel cozumel con tubo de 3/4 a solo $950", image: "/cozumel.jpg" },
  { title: "¡Combo Ahorro!", description: "Compra 4 clips escuadra redondos y llevate uno de regalo, $52 c/u", image: "/basecurvo.png" },
]

export default function HardwareStore() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const router = useRouter()

  const nextOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length)
  }

  const prevOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length)
  }

  useEffect(() => {
    const timer = setInterval(nextOffer, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(timer)
  }, [])

  const handleCategoryClick = (category: string) => {
    router.push(`/herrajes/category/${category.toLowerCase().replace(/ /g, '-')}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-100 text-gray-800 font-sans">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Offers Slider */}
        <section className="mb-8 sm:mb-12 relative overflow-hidden rounded-xl shadow-2xl">
          <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-orange-500 to-amber-500">
            <Image 
              src={offers[currentOfferIndex].image} 
              alt={offers[currentOfferIndex].title} 
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center text-center p-4 sm:p-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{offers[currentOfferIndex].title}</h2>
                <p className="text-base sm:text-lg md:text-xl text-white mb-4 drop-shadow-md">{offers[currentOfferIndex].description}</p>
                <Button className="bg-white text-orange-600 hover:bg-amber-100">Ver Oferta</Button>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" onClick={prevOffer}>
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
          <Button variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white" onClick={nextOffer}>
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        </section>

        {/* Categories Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-orange-800">Categorías de Productos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                <CardContent className="p-0">
                  <div className="relative h-40 sm:h-48 md:h-60">
                    <Image src={category.image} alt={category.name} layout="fill" objectFit="cover" />
                  </div>
                  <h3 className="text-center font-semibold py-2 sm:py-3 bg-orange-600 text-white text-sm sm:text-base">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-orange-800">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        {/* Client Opinions Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-orange-800">Opiniones de Nuestros Clientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mb-3 sm:mb-4 italic text-gray-600 text-sm sm:text-base">{review.comment}</p>
                  <p className="font-semibold text-orange-700 text-sm sm:text-base">- {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Product Catalog Download */}
        <section className="mb-8 sm:mb-12 text-center bg-orange-100 py-6 sm:py-8 rounded-lg shadow-inner">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-orange-800">Descarga Nuestro Catálogo</h2>
          <a href='/catalogo.pdf' download={'catalogo-herrajes-y-templados'}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="mr-2 h-4 w-4" /> Descargar Catálogo PDF
            </Button>
          </a>
        </section>
      </main>
    </div>
  )
}