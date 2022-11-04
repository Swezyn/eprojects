import React, {useState} from "react";
import MyNavbar from "./Components/MyNavbar";
import Background from "./Background";
import Views from "./Views";
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider,createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      color: "var(--text-color)"
    },
  },
  palette: {
    text: {
      primary: "#FFFFFF"
    },
    primary:{
      main: "#A20A08", // Button color
      primary: "#FFFFFF"
    },
    secondary:{
      main: "#2C2C33", // Button color
    },
    info:{
      main: "#dadce1", // Button color
    },
    background: {
      paper: "#484a4d"
    }
    
  },
})

function App() {

  return (
   <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Background>
          <MyNavbar />
          <Views />
        </Background>
      </ThemeProvider>
   </BrowserRouter>
  );
}

export default App;