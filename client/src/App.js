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
import saveStateDB from "controllers/saveStateDB";
import { setApplications, setFilters } from "state";
import defaultFilter from "models/defaultFilter";

function App() {
  const store = useStore();
  const dispatch = useDispatch();
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


  /* Solution to: Cached data can leave redux objects as null */
  if (!filter) { // filter in redux state does not exist
    dispatch(setFilters({filter: defaultFilter})); // set to default value
  }
  if (!applications) {  // Applications in redux state does not exist
    dispatch(setApplications({ applications: [] }));  // set to default value
  }

  /* This function saves the user's filter state into mongodb*/
  useEffect(() => {
    console.log("New State:", store.getState());
    if (isAuth && user && filter && applications){ saveStateDB(filter, user, applications); } // If logged in, save State to MongoDB
  }, [filter, applications]);


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
