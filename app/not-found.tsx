'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { HardHat, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex flex-col items-center justify-center text-center px-4">
      <HardHat className="w-24 h-24 text-orange-500 mb-8" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Página en Construcción</h1>
      <p className="text-xl text-gray-600 mb-8">
        Lo sentimos, esta página aún está en desarrollo. Estamos trabajando duro para completarla pronto.
      </p>
      <p className="text-gray-500 mb-8">
        Serás redirigido a la página principal en 5 segundos...
      </p>
      <Link href="/" passHref>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Página Principal
        </Button>
      </Link>
    </div>
  )
}