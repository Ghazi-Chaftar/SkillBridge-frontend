'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FC, useState } from 'react'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            //staleTime: 4 * 1000, // 4 seconds
            // refetchInterval: 4 * 1000 // 4 seconds
            staleTime: Infinity, // Prevents automatic refetches based on staleness
            refetchOnWindowFocus: false, // Doesn't refetch when window regains focus
            refetchOnReconnect: false, // Doesn't refetch when reconnecting to the internet
            refetchInterval: false
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* Optional: Control Devtools visibility */}
      {children}
    </QueryClientProvider>
  )
}

export default Providers
