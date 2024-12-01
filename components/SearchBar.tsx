'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/contexts/cartContext'
import { debounce } from 'lodash'
import { Product } from '@/types/product'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { addToCart } = useCart()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = async (term: string) => {
    if (term.trim() === '') {
      setSearchResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.get<{ results: Product[] }>(
        `http://localhost:3002/search_material_un?query=${encodeURIComponent(term)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: document.cookie,
          },
        }
      )
      setSearchResults(response.data.results)
      setIsOpen(true)
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = debounce(handleSearch, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    debouncedSearch(term)
  }

  const handleProductClick = (productId: string) => {
    router.push(`/herrajes/${productId}`)
    setIsOpen(false)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-64 pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-orange-500 focus:outline-none"
        />
       
      </div>
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product._id}
              className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <Image
                src={product.url}
                alt={product.name}
                width={50}
                height={50}
                className="mr-4 rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.type_material}</p>
                <p className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</p>
              </div>
              <Button
                onClick={(e) => handleAddToCart(e, product)}
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}