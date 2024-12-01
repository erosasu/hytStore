'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Clock, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement form submission logic here
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contáctanos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="text-blue-500" />
                <div>
                  <p className="font-semibold">Teléfonos</p>
                  <p>33-2446-1689</p>
                  <p>33-3118-4802</p>
                  <p>33-1387-0710</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-500" />
                <div>
                  <p className="font-semibold">Horario</p>
                  <p>Lunes a Viernes 9am a 6:30pm</p>
                  <p>Sábado 9am a 1pm</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-blue-500" />
                <div>
                  <p className="font-semibold">Tienda</p>
                  <p>Av Valdepeñas 2565, esquina Tolosa, Lomas de Zapopan. Jalisco </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1865.5407014855907!2d-103.4004509429862!3d20.747494451777623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af09708063e9%3A0x313cdddaa66b707e!2sHerrajes%20y%20Templados!5e0!3m2!1sen!2smx!4v1724851369654!5m2!1sen!2smx" width="600" height="450" style={{border:0}} allowFullScreen={false} loading="lazy" ></iframe>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="message"
                  placeholder="Mensaje"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="h-32"
                />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  ENVIAR MENSAJE
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}