
import { Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider } from '@diamondlightsource/sci-react-ui'
import { LinkDrawer } from './components/RouterComponent'
import { SampleProvider } from './context/SampleProvider'
import { MultiSampleProvider } from './context/MultiSampleProvider'

function App() {

  return (
  <MultiSampleProvider>
  <SampleProvider>
  <ThemeProvider theme={DiamondDSTheme}>
  <Stack sx={{height:"100vh", width:"100vw"}} >
     <LinkDrawer/>
  </Stack>
  </ThemeProvider>
</SampleProvider>
</MultiSampleProvider>

  )
}
export default App
