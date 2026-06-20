import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CustomTheme {
    glass: {
      background: string
      border: string
      blur: string
      shadow: string
      shadowHover: string
    }
    gradient: {
      brand: string
      aurora: string
      text: string
      mesh: string
    }
    glow: string
  }

  interface Theme {
    custom: CustomTheme
  }
  interface ThemeOptions {
    custom?: CustomTheme
  }
}
