
import { Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider, Navbar} from '@diamondlightsource/sci-react-ui'
import { DataProvider } from './context/DataProvider'

import { LinkDrawer } from './components/RouterComponent'


function App() {

  return (
 
  <DataProvider>
  <ThemeProvider theme={DiamondDSTheme}>

  <Stack sx={{height:"100vh", width:"100vw"}} >
    <Navbar>A title
   
    </Navbar>
     <LinkDrawer/>

  </Stack>
  </ThemeProvider>
</DataProvider>

  )
}
export default App
