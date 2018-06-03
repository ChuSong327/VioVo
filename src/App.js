import React, { Component, Fragment } from 'react';
import Navbar from "./components/navbar/Navbar";
import Gallery from "./components/gallery/Gallery";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { YOUTUBE_API_KEY } from "./config/secret";
import { fetchYoutube } from "./utils/ytUtil";

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
    constructor(props) {
        super(props);
        this.state = {
            videos: ""
        }   
    }

    componentWillMount(){
        fetchYoutube().then( res => {
            this.setState({
                videos: res.items
            });
        });
    }

    render() {
        const { videos } = this.state;

        return(
            <Fragment >
                <MuiThemeProvider theme={ theme }>
                    <Navbar />
                    <Gallery videos={ videos }/>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

export default App;