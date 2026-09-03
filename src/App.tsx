
import { Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider } from '@diamondlightsource/sci-react-ui'
import { LinkDrawer } from './components/RouterComponent'
import { SampleProvider } from './context/SampleProvider'

function App() {

  return (

  <SampleProvider>
  <ThemeProvider theme={DiamondDSTheme}>
  <Stack sx={{height:"100vh", width:"100vw"}} >
     <LinkDrawer/>
  </Stack>
  </ThemeProvider>
</SampleProvider>

  )
}
export default App
