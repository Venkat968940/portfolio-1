import type { ReactNode } from 'react'
import { Box, Container } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  /** Render full-bleed (no Container). */
  fluid?: boolean
  sx?: SxProps<Theme>
  containerSx?: SxProps<Theme>
}

/**
 * Standard scroll-target section: consistent vertical rhythm, an anchor id for
 * nav scrolling, and a max-width container.
 */
export const SectionWrapper = ({
  id,
  children,
  fluid,
  sx,
  containerSx,
}: SectionWrapperProps) => (
  <Box
    component="section"
    id={id}
    sx={{
      position: 'relative',
      scrollMarginTop: '80px',
      py: { xs: 10, md: 16 },
      ...sx,
    }}
  >
    {fluid ? (
      children
    ) : (
      <Container sx={{ position: 'relative', zIndex: 1, ...containerSx }}>
        {children}
      </Container>
    )}
  </Box>
)
