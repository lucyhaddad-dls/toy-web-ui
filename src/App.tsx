import { Stack, Box } from "@mui/material";
import {
  DiamondDSTheme,
  ThemeProvider,
  Navbar,
} from "@diamondlightsource/sci-react-ui";

import { SampleProvider } from "./context/SampleProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MakeTextInput } from "./components/TextFields";

const queryClient = new QueryClient();


function App() {

  return (
  
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={DiamondDSTheme}>
      <SampleProvider>

       <Box sx={{width:"100vw", height:"100vh"}}>
        <Navbar>A title</Navbar>
        <Stack>

          <MakeTextInput/>

        </Stack>

    </Box>

      </SampleProvider>
      </ThemeProvider>
    
    </QueryClientProvider>
  );
}
export default App;
