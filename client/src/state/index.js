// Import packages
import { createSlice } from "@reduxjs/toolkit";
import defaultFilter from "models/defaultFilter";

const initialState = {
    mode: "light",
    user: null,                // if logged in, User contains MongoDB copies of filter & applications.
    token: null,
    filter: defaultFilter,     // local copy of filter
    applications: [],          // local copy of applications
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {  // Define the functions that can modify the state
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; // Toggle between light and dark mode
        },

        setLogin: (state, action) => {
            state.user = action.payload.user; // Set the user parameter to the user object
            state.token = action.payload.token; // Set the token parameter to the token object
            state.filter = action.payload.user.filter || defaultFilter; // Set the user.filter parameter to the filter object
            state.applications = action.payload.user.applications || []; // Set the user.applications parameter to the applications object
        },

        setLogout: (state) => {
            state.user = null; // Set the user parameter to null when logging out
            state.token = null; // Set the token parameter to null when logging out
            state.filter = defaultFilter; // Set the filter parameter to default values when logging out
            state.applications = [] // Set the filter parameter to default values when logging out
        },

        setFilters: (state, action) => {
            state.filter = action.payload.filter;
        },

        setApplications: (state, action) => {
            state.applications = action.payload.applications;
        }
    }
});

export const { setMode, setLogin, setLogout, setFilters, setApplications } = authSlice.actions;
export default authSlice.reducer;