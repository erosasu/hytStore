'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/cartContext'
import { SearchBar } from '@/components/SearchBar'

const DEFAULT_IMAGE_URL = '/default_product.jpg'

const herrajesCategories = [
  "Canceles Corredizos de Baño",
  "Pasamanos y Barandales",
  "Bisagras y Clips para Templados",
  "Herrajes para el Aluminio",
  "Jaladeras",
  "Bisagras Hidráulicas",
  "Silicones y Selladores",
  "Tornillería"
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity, cartTotal, cartItemCount } = useCart()
  const router = useRouter()

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push('/checkout')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white text-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/favicon.png"
            alt="Herrajes y Templados Logo"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-800 hover:text-orange-600 transition-colors duration-200 font-semibold text-lg">Inicio</Link>
          <div className="relative group">
            <Link href="/herrajes" className="text-gray-800 hover:text-orange-600 transition-colors duration-200 font-semibold text-lg flex items-center">
              Herrajes
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {herrajesCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/herrajes/categorias/${category.replace(/ /g, '-')}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/templados" className="text-gray-800 hover:text-orange-600 transition-colors duration-200 font-semibold text-lg">Templados</Link>
          <Link href="/about" className="text-gray-800 hover:text-orange-600 transition-colors duration-200 font-semibold text-lg">Sobre Nosotros</Link>
          <Link href="/contact" className="text-gray-800 hover:text-orange-600 transition-colors duration-200 font-semibold text-lg">Contacto</Link>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-800 hover:text-orange-600 relative">
                <ShoppingCart className="h-6 w-6" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="sr-only">Open cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Carrito de Compras</SheetTitle>
              </SheetHeader>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">Tu carrito está vacío</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.url || DEFAULT_IMAGE_URL}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = DEFAULT_IMAGE_URL;
                          }}
                        />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveFromCart(item._id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-lg font-bold">Total: ${cartTotal.toFixed(2)}</p>
                    <Button className="w-full mt-4" onClick={handleCheckout}>
                      Proceder al pago
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" className="md:hidden text-gray-800 hover:text-orange-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Inicio</Link>
          <Link href="/herrajes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Herrajes</Link>
          <div className="ml-4">
            {herrajesCategories.map((category, index) => (
              <Link
                key={index}
                href={`/herrajes/${category.toLowerCase().replace(/ /g, '-')}`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
          <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sobre Nosotros</Link>
          <Link href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contacto</Link>
        </div>
      )}
    </nav>
  )
}