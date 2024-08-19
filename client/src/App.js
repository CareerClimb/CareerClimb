// Import libraries
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "theme";
import LandingPage from "scenes/landingPage";
import MainPage from "scenes/mainPage";
import LoginPage from "scenes/loginPage";
import RegisterPage from "scenes/registerPage";
import ApplicationPage from './scenes/applicationsPage'; 

function App() {
  const store = useStore();
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const filter = useSelector((state) => state.filter);
  const applications = useSelector((state) => state.applications);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Create a theme object based on the mode
  const isAuth = Boolean(useSelector((state) => state.token)); // Determine if the user is authenticated
  /* 
      Read environment variables:
          .env is used when app is deployed from local environment. ex. using npm start
          .env.production is used when app is deployed from a static build.
  */
  const env = process.env.REACT_APP_ENV || ''; 

  /* This function saves the user's filter state into mongodb*/
  useEffect(() => {
    console.log("New State:", store.getState());
    if (isAuth && user && filter && applications){ saveStateDB(filter, user, applications); } // If logged in, save State to MongoDB
  }, [filter, applications]);

  /* Saves filter & application states into MongoDB for a User */
  const saveStateDB = (filter, user, applications) => {
    const response = fetch(env+"/savestate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userID: user._id, filter: filter, applications: applications}),
    })
  }


  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/applications" element={<ApplicationPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
}

export default App;
