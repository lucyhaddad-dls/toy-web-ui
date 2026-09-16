import { Stack } from "@mui/material";
import {
  DiamondDSTheme,
  ThemeProvider,
} from "@diamondlightsource/sci-react-ui";
import { SampleDataProvider } from "./context/SampleDataProvider";

import { LinkBar } from "./pages/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SampleDataProvider>
        <ThemeProvider theme={DiamondDSTheme}>
          <Stack
            sx={{
              height: "100vh",
              width: "100vw",
              justifyContent: "flex-top",
              alignContent: "space-around",
            }}
          >
            <LinkBar />
          </Stack>
        </ThemeProvider>
      </SampleDataProvider>
    </QueryClientProvider>
  );
}

export default App;
