import { Stack } from "@mui/material";
import {
  DiamondDSTheme,
  ThemeProvider,
} from "@diamondlightsource/sci-react-ui";

import { LinkBar } from "./pages/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "./context/DataProvider";
import { MathJaxContext } from "better-react-mathjax";

const mathConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <DataProvider>
        <ThemeProvider theme={DiamondDSTheme}>
          <MathJaxContext config={mathConfig}>
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
          </MathJaxContext>
        </ThemeProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
