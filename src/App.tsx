import { Stack, Box } from "@mui/material";
import {
  DiamondDSTheme,
  ThemeProvider,
  Navbar,
} from "@diamondlightsource/sci-react-ui";

import { SampleProvider } from "./context/SampleContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MakeTextInput } from "./components/TextFields";
import { AbsorptionPlotComponent } from "./components/PlotAbsComponent";


const queryClient = new QueryClient();


function App() {

  return (
  
    <QueryClientProvider client={queryClient}>
      
    <SampleProvider>
      <ThemeProvider theme={DiamondDSTheme}>

        <Box sx={{width:"100vw", height:"100vh"}}>
          <Navbar>A title</Navbar>
        
        <Stack>
        <MakeTextInput/>
   
        <AbsorptionPlotComponent/>

        </Stack>
      </Box>

      </ThemeProvider>
    </SampleProvider>

    </QueryClientProvider>
  );
}
export default App;
