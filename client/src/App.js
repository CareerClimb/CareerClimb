// Import libraries
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "theme";
import LandingPage from "scenes/landingPage";
import MainPage from "scenes/mainPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Create a theme object based on the mode
  const isAuth = Boolean(useSelector((state) => state.token)); // Determine if the user is authenticated

  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
}

export default App;
