import { Box, Typography } from '@mui/material'
import type { TypographyProps } from '@mui/material'
import { motion } from 'framer-motion'
import { GradientText } from './GradientText'
import { fadeUp, viewportOnce } from '../animations/variants'

interface AnimatedHeadingProps extends Omit<TypographyProps, 'children'> {
  overline?: string
  title: string
  /** Portion of the title to render with the brand gradient. */
  highlight?: string
  center?: boolean
}

/** Section heading: animated overline + title with an optional gradient accent. */
export const AnimatedHeading = ({
  overline,
  title,
  highlight,
  center,
  variant = 'h2',
  ...rest
}: AnimatedHeadingProps) => {
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) return title
    const [before, after] = title.split(highlight)
    return (
      <>
        {before}
        <GradientText variant={variant} animate>
          {highlight}
        </GradientText>
        {after}
      </>
    )
  }

  return (
    <Box
      sx={{ textAlign: center ? 'center' : 'left', mb: { xs: 5, md: 7 } }}
    >
      {overline && (
        <Box
          component={motion.div}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Typography variant="subtitle2" color="secondary" sx={{ mb: 1.5 }}>
            {overline}
          </Typography>
        </Box>
      )}
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ delay: 0.08 }}
      >
        <Typography variant={variant} {...rest}>
          {renderTitle()}
        </Typography>
      </Box>
    </Box>
  )
}
