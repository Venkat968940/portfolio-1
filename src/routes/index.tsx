import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

const Home = lazy(() => import('@/pages/Home/Home'))

const PageFallback = () => (
  <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
    <CircularProgress color="secondary" />
  </Box>
)

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<PageFallback />}>{node}</Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<Home />),
  },
  {
    path: '*',
    element: withSuspense(<Home />),
  },
])

export const AppRoutes = () => <RouterProvider router={router} />
