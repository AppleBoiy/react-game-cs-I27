import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#362706"
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: "#49413b"
        }
      }
    }
  }
});

export default theme;
