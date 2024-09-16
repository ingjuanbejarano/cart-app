import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import theme from "./config/theme.ts";
import { ProductsProvider } from "./config/productsProvider.tsx";
import { AuthProvider } from "./config/authProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </ThemeProvider>
  </AuthProvider>
);
