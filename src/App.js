import React, { Component, Fragment } from 'react';
import Navbar from "./components/navbar/Navbar";
import Gallery from "./components/gallery/Gallery";
import Search from "./components/search/Search";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { YOUTUBE_API_KEY } from "./config/secret";
import { fetchYoutube, getVideoInfo, getMostPopularVideos } from "./utils/ytUtil";


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
            videos: "",
            searhResult: "",
            searchClick: null
        } 

        this.handleSearchClick = this.handleSearchClick.bind(this);
    };

    componentWillMount(){
        getMostPopularVideos().then(res => {
            this.setState({
                videos: res.items
            })
        })
    };  

    handleSearchClick(event){
        // const keyword = event.target;
        // console.log(event)
        fetchYoutube("cat").then(res => {
            console.log("GET HERE")
            this.setState({
                searchResult: res.items,
                searchClick: true
            })
        })
        
    }

    render() {
        const { videos } = this.state;
        const { searchResult } = this.state;
        const { searchClick } = this.state;
        // console.log(this.state.searhResult)
        return(
            <Fragment >
                <MuiThemeProvider theme={ theme }>
                    <Navbar searchClick={ this.handleSearchClick }/>
                    {searchClick ? <Search searchResult={ searchResult }/> : <Gallery videos={ videos }/>}
                </MuiThemeProvider>
            </Fragment>
        )
    }
};

export default App;