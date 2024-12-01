'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const storeImages = [
  { src: "/placeholder.svg", alt: "Store front" },
  { src: "/placeholder.svg", alt: "Interior view" },
  { src: "/placeholder.svg", alt: "Product display" },
]

const values = [
  { title: "Calidad", description: "Ofrecemos productos de la más alta calidad para garantizar la satisfacción de nuestros clientes." },
  { title: "Servicio", description: "Nuestro equipo está comprometido a brindar un servicio excepcional y personalizado." },
  { title: "Innovación", description: "Constantemente buscamos nuevas soluciones y productos para mantenernos a la vanguardia." },
  { title: "Integridad", description: "Actuamos con honestidad y transparencia en todas nuestras operaciones." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center">Sobre Nosotros</h1>

        {/* Store Images */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">Nuestra Tienda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storeImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <Card className="mb-12 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-700">Nuestra Historia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Herrajes y Templados comenzó su viaje en 1990 como una pequeña tienda familiar en el corazón de nuestra ciudad. 
              Fundada por Juan y María Pérez, nuestra empresa nació de la pasión por ofrecer soluciones de alta calidad en herrajes y vidrios templados. 
              A lo largo de los años, hemos crecido de manera constante, expandiendo nuestra gama de productos y construyendo relaciones sólidas con nuestros clientes y proveedores.
            </p>
            <p className="mt-4 text-gray-700">
              Hoy, tres décadas después, seguimos siendo una empresa familiar, pero hemos evolucionado para convertirnos en líderes del mercado, 
              sirviendo a clientes en todo el país y ofreciendo una amplia gama de productos innovadores y servicios personalizados.
            </p>
          </CardContent>
        </Card>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-orange-700">Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Nuestra misión es proporcionar soluciones de herrajes y vidrios templados de la más alta calidad, 
                superando las expectativas de nuestros clientes a través de un servicio excepcional, productos innovadores 
                y un compromiso inquebrantable con la excelencia.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-orange-700">Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Aspiramos a ser reconocidos como el líder indiscutible en la industria de herrajes y vidrios templados, 
                estableciendo nuevos estándares de calidad, innovación y servicio al cliente. 
                Buscamos expandir nuestra presencia a nivel nacional e internacional, manteniendo siempre nuestros valores fundamentales 
                y contribuyendo al desarrollo sostenible de las comunidades en las que operamos.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">Valores del Equipo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-orange-600">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}