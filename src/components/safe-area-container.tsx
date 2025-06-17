import type { SafeAreaInsets } from '@/types'

interface SafeAreaContainerProps {
  children: React.ReactNode
  insets?: SafeAreaInsets
}

export const SafeAreaContainer = ({
  children,
  insets,
}: SafeAreaContainerProps) => (
  <main
    
  >
    {children}
  </main>
)
