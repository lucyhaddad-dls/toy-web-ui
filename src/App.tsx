
import { Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider } from '@diamondlightsource/sci-react-ui'
import { SampleDataProvider } from './context/SampleDataProvider'

import { LinkBar } from './new/pages/Router'

function App() {

  return (
  <SampleDataProvider>
  <ThemeProvider theme={DiamondDSTheme}>
  <Stack sx={{height:"100vh", 
      width:"100vw", justifyContent:"flex-top",
      alignContent:"space-around"}}>
    <LinkBar/>
    </Stack>
  </ThemeProvider>
</SampleDataProvider>

  )
}

export default App
