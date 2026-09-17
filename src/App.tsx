import { Stack } from "@mui/material";
import {
  DiamondDSTheme,
  ThemeProvider,
} from "@diamondlightsource/sci-react-ui";

import { LinkBar } from "./pages/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "./context/DataProvider";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <DataProvider>
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
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
