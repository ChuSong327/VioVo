import React, { Component, Fragment } from 'react';
import Navbar from "./components/navbar/Navbar";
import Gallery from "./components/gallery/Gallery";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { YOUTUBE_API_KEY } from "./config/secret";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff6f60",
      main: "#e53935",
      dark: "#ab000d",
      contrastText: "#fafafa",
    },
    secondary: {
      light: "#ffffff",
      main: "#fbe9e7",
      dark: "#c8b7b5",
      contrastText: "#fafafa",
    }
  }
});

class App extends Component {
    render() {
        
        return(
            <Fragment >
                <MuiThemeProvider theme={ theme }>
                    <Navbar />
                    <Gallery />
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

export default App;