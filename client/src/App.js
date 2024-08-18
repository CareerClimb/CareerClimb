// Import libraries
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "theme";
import LandingPage from "scenes/landingPage";
import MainPage from "scenes/mainPage";
import LoginPage from "scenes/loginPage";
import RegisterPage from "scenes/registerPage";
import ApplicationPage from './scenes/applicationsPage'; 
import FilterModel from './models/FilterModel';

function App() {
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Create a theme object based on the mode
  const isAuth = Boolean(useSelector((state) => state.token)); // Determine if the user is authenticated
  const [filters, setFilters] = useState(new FilterModel());
  /* 
      Read environment variables:
          .env is used when app is deployed from local environment. ex. using npm start
          .env.production is used when app is deployed from a static build.
  */
  const env = process.env.REACT_APP_ENV || ''; 

  /* This function saves the user's filter state */
  const handleFilterChange = (filter) => {
      setFilters(filter); // Save filters locally
      if (isAuth && user){ saveFiltersDB(filter, user); } // Save filters to MongoDB
  };

  /* Recieves a FilterModel Class, and saves it into mongodb for a logged in User */
  const saveFiltersDB = (filter, user) => {
    const response = fetch(env+"/savestate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userID: user._id, filter: filter}),
    })
  }


  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<MainPage filters={filters} handleFilterChange={handleFilterChange} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/applications" element={<ApplicationPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
}

export default App;
