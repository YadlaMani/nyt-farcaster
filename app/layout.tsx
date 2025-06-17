import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { ThirdwebProvider } from 'thirdweb/react'
import { Appbar } from '@/components/Appbar'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/components/providers'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Not your type ',
  description: 'Getting rewarded for being yourself',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              <Appbar />
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </ThirdwebProvider>
        </Providers>
      </body>
    </html>
  )
}
