import { createFileRoute } from '@tanstack/react-router'

import { HotelsHomePage } from '@/features/hotels/pages/HotelsHomePage'

export const Route = createFileRoute('/')({
  component: HotelsHomePage,
})
