
import { Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider } from '@diamondlightsource/sci-react-ui'
import { DataProvider } from './context/DataProvider'

import { LinkDrawer } from './components/RouterComponent'


function App() {

  return (
 
  <DataProvider>
  <ThemeProvider theme={DiamondDSTheme}>

  <Stack sx={{height:"100vh", width:"100vw"}} >

     <LinkDrawer/>

  </Stack>
  </ThemeProvider>
</DataProvider>

  )
}
export default App
