// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  green: {
    50: "#E6F7E6",
    100: "#CCEFCC",
    200: "#99DF99",
    300: "#66D066",
    400: "#33C033",
    500: "#00B000",
    600: "#009000",
    700: "#007000",
    800: "#005000",
    900: "#003000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

  
// Material UI theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.green[300],
              main: colorTokens.green[500],
              light: colorTokens.green[700],
            },
            neutral: {
              dark: colorTokens.grey[200],
              main: colorTokens.grey[300],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[500],
              light: colorTokens.grey[600],
            },
            background: {
              default: "#121212",
              alt: "#1E1E1E",
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.green[700],
              main: colorTokens.green[500],
              light: colorTokens.green[50],
            },
            neutral: {
              dark: colorTokens.grey[600],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[0],
              alt: colorTokens.grey[10],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
