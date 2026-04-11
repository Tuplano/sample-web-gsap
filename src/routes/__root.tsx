import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import type { QueryClient } from '@tanstack/react-query'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useAuthInit } from '@/hooks/useAuthInit'
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'

import appCss from '@/styles.css?url'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Hotel Booking Template',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  const router = useRouter()
  const queryClient = router.options.context.queryClient

  useAuthInit()

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <Footer />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
