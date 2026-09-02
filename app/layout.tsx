import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mausam — India Meteorological Department',
  description:
    "Mausam is India's official weather app by IMD, delivering personalized weather intelligence, severe weather alerts, and air quality data tailored to how you live.",
  generator: 'v0.app',
  applicationName: 'Mausam',
  keywords: ['IMD', 'weather', 'India', 'Mausam', 'AQI', 'monsoon', 'forecast'],
}

export const viewport: Viewport = {
  themeColor: '#1a73e8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`} style={{ fontFamily: 'var(--font-roboto), system-ui, sans-serif' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
