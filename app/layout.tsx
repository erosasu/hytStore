
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { CartProvider } from '@/contexts/cartContext'
import { Phone, MapPin } from "lucide-react";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Herrajes y Templados - Tienda en línea",
  description: "Encuentra los mejores herrajes y productos de vidrio templado para tu hogar o negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Add favicon link */}
       
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Analytics/>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-orange-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Herrajes y Templados</h3>
              <p className="text-orange-200">Entregas express al mejor precio!.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Contacto</h3>
              <p className="flex items-center mb-2 text-orange-200">
                <Phone className="mr-2 h-4 w-4" /> 3324461689
              </p>
              <p className="flex items-center text-orange-200">
                <MapPin className="mr-2 h-4 w-4" />Av valdepeñas 2565 esq. Tolosa, lomas de zapopan, Zapopan, 45130
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Horario</h3>
              <p className="text-orange-200">Lunes a Viernes: 8:30 am a 6:30pm</p>
              <p className="text-orange-200">Sábado: 9am a 1pm</p>
            </div>
          </div>
        </div>
      </footer>
          <p style={{textAlign:'center'}}>&copy; 2024 Herrajes y Templados. Todos los derechos reservados.</p>
        </CartProvider>
      </body>
    </html>
  );
}