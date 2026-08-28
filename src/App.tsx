
import { Stack, Box } from '@mui/material'
import { DiamondDSTheme, ThemeProvider, Navbar} from '@diamondlightsource/sci-react-ui'
import { DataProvider } from './context/DataProvider'
import { MakeTextInput } from './components/TextFields'
import { MakeUnitInput } from './components/UnitFields'
import { PlotComponent } from './components/PlotComponent'


function App() {

  return (
  <DataProvider>
  <ThemeProvider theme={DiamondDSTheme}>


  <Stack sx={{height:"100vh", width:"100vw"}} >
    <Navbar>A title</Navbar>

  <Box sx = {{ p:2 }}></Box> 
  <Stack direction="row" spacing={4} >

    <Box sx = {{ p:2 }}/>
    <MakeTextInput/>
    <MakeUnitInput/>

     <PlotComponent/>
  </Stack>
  

  </Stack>
  
  </ThemeProvider>
</DataProvider>
  )
}
export default App
