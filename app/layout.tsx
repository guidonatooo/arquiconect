import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BebêBet 🍼 — Aposte no sexo do bebê!',
  description:
    'Bolão do chá revelação! Aposte se é menino ou menina e torça pelo seu palpite.',
  openGraph: {
    title: 'BebêBet 🍼',
    description: 'Participe do bolão do chá revelação! Aposte via PIX.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-nunito bg-cream min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
