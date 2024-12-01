'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { Pagination } from '@/components/ui/pagination'
import { Product } from '@/types/product'

const ITEMS_PER_PAGE = 15;

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)
    setCurrentPage(page)
    fetchProducts(page)
  }, [searchParams, slug])

  const fetchProducts = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/herrajes/categoria/${slug}?page=${page}&limit=${ITEMS_PER_PAGE}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data.products)
      setTotalPages(Math.ceil(data.totalCount / ITEMS_PER_PAGE))
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setIsLoading(false)
  }

  const handlePageChange = (page: number) => {
    router.push(`/herrajes/categoria/${slug}?page=${page}`)
  }

  const formatTitle = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-orange-800">{formatTitle(slug as string)}</h1>
        {isLoading ? (
          <div className="text-center">Cargando productos...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.length > 0 ? (
                products.map((product) => <ProductCard key={product._id} product={product} />)
              ) : (
                <div className="col-span-full text-center text-lg text-gray-600">No se encontraron productos en esta categoría.</div>
              )}
            </div>
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}