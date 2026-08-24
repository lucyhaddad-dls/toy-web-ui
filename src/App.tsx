
import { Button, Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider, Navbar} from '@diamondlightsource/sci-react-ui'
import PlotComponent from './components/PlotComponent'
import { DataProvider } from './context/SampleContext'
import { MakeTextInput } from './components/TextFields'


function App() {

  return (
  <DataProvider>
  <ThemeProvider theme={DiamondDSTheme}>
  <Stack sx={{height:"100vh", width:"100vw"}} >
    <Navbar>A title</Navbar>
    <PlotComponent></PlotComponent>
    {/* <Button variant="outlined" onClick={fetchInputValues}></Button>
     */}
     <MakeTextInput/>
  </Stack>
  </ThemeProvider>
</DataProvider>
  )
}
export default App
