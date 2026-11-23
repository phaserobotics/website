import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const SITE_URL = 'https://phaserobotics.cc'
const DESCRIPTION =
  'Phase Robotics builds small precision actuators for robot hands and dexterous manipulators, and the machines that make them, in the United States.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Phase Robotics | Precision Actuators for Robot Hands',
    template: '%s | Phase Robotics',
  },
  description: DESCRIPTION,
  keywords: [
    'Phase Robotics',
    'robotics',
    'robotic actuators',
    'precision actuators',
    'brushless motors',
    'servo drive',
    'robot hand',
    'dexterous manipulation',
    'humanoid robot actuators',
    'US motor manufacturing',
    'Lunar Drive',
    'Phalanx Drive',
    'Winder-1',
  ],
  authors: [{ name: 'Phase Robotics' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/glider.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Phase Robotics',
    url: '/',
    title: 'Phase Robotics | Precision Actuators for Robot Hands',
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Phase Robotics glider logo' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phase Robotics | Precision Actuators for Robot Hands',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f3ee' },
    { media: '(prefers-color-scheme: dark)', color: '#08090a' },
  ],
  viewportFit: 'cover',
}

// Tells search engines who we are. No Product entries until products have offers.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Phase Robotics',
      alternateName: 'Phase',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/og-image.png`,
      email: 'founders@phaserobotics.cc',
      description: DESCRIPTION,
      knowsAbout: ['Robotics', 'Robotic actuators', 'Brushless DC motors', 'Servo motors', 'Robot hands', 'Dexterous manipulation', 'Motor manufacturing'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Phase Robotics',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      </body>
    </html>
  )
}
