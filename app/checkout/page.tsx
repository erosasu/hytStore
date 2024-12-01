'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/contexts/cartContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import AutocompleInput from '../../components/autoCompleteAddress'

const stripePromise = loadStripe('pk_live_51NXpYxDZcYb8lf7uJPImpzDOXPUPjDcaES9zePyLMKsrAq8ONBBvKKgTJfCzcLCMrzHgIBQCLnTW1vHWb3vcBw0300g5qJigpa')

interface DeliveryInfo {
  name: string
  email: string
  address: string
  city: string
  postalCode: string
  pickup:boolean
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const [address, setAdress]= useState()
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    pickup:false
  })

  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDeliveryInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send quotation to API
      const quotationResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quotations`, {
        cart,
        deliveryInfo,
        total: cartTotal
      })

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      // Create Stripe session
      const sessionResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-stripe-session`, {
        quotationId: quotationResponse.data.quotationId,
        total: cartTotal
      })

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionResponse.data.sessionId
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Lista de productos</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.map((item) => (
                <div key={item._id} className="flex items-center mb-4">
                  <Image
                    src={item.url || '/default-product-image.jpg'}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <p className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={deliveryInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={deliveryInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="email"
                    placeholder="Calle y numero"
                    value={deliveryInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={deliveryInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Código postal"
                    value={deliveryInfo.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Código postal"
                    value={deliveryInfo.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}