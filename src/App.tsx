
import { Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider, Navbar} from '@diamondlightsource/sci-react-ui'
import { DataProvider } from './context/DataProvider'

function App() {

  return (
  <DataProvider>
  <ThemeProvider theme={DiamondDSTheme}>
  <Stack sx={{height:"100vh", width:"100vw"}} >
    <Navbar>A title</Navbar>
  </Stack>
  </ThemeProvider>
</DataProvider>
  )
}
export default App
