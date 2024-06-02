// Import packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
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
        },

        setLogout: (state) => {
            state.user = null; // Set the user parameter to null when logging out
            state.token = null; // Set the token parameter to null when logging out
        },
    }
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;