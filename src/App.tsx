import { Stack } from "@mui/material";
import {
  DiamondDSTheme,
  ThemeProvider,
  Navbar,
} from "@diamondlightsource/sci-react-ui";

import { SampleProvider } from "./context/SampleContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MakeTextInput } from "./components/TextFields";



const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <SampleProvider>
      <ThemeProvider theme={DiamondDSTheme}>
        <Stack sx={{ height: "100vh", width: "100vw" }}>
          
          <Navbar>A title</Navbar>
          
        <MakeTextInput/>
        </Stack>
      </ThemeProvider>

    </SampleProvider>
    </QueryClientProvider>
  );
}
export default App;
