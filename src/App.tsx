
import { Button, Stack } from '@mui/material'
import { DiamondDSTheme, ThemeProvider, Navbar} from '@diamondlightsource/sci-react-ui'
import PlotComponent from './components/PlotComponent'
import UserComponent from './components/UserComponent'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import {fetchInputValues} from './context/SampleContext'

const queryClient = new QueryClient()

function App() {


  return (
  <QueryClientProvider client={queryClient}>

  <ThemeProvider theme={DiamondDSTheme}>
  <Stack sx={{height:"100vh", width:"100vw"}} >
    <Navbar>A title</Navbar>
    <PlotComponent></PlotComponent>
    <UserComponent/>
    <Button variant="outlined" onClick={fetchInputValues}></Button>
  </Stack>
  </ThemeProvider>
  
  // </QueryClientProvider>)
  // )
}
export default App
