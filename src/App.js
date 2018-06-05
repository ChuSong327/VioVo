import React, { Component, Fragment } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { YOUTUBE_API_KEY } from "./config/secret";
import { fetchYoutube, getMostPopularVideos } from "./utils/ytUtil";
import Navbar from "./components/navbar/Navbar";
import Gallery from "./components/gallery/Gallery";
import Search from "./components/search/search";
import VideoPlayer from "./components/videoplayer/VideoPlayer";

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
            searchClick: null,
            searchInput:"",
            videoClick: null,
            videoId: ""
        } 
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
    };

    componentWillMount(){
        getMostPopularVideos().then(res => {
            this.setState({
                videos: res.items
            })
        })
    };  

    handleSearchInput(event){
        this.setState({
            searchInput: event.target.value
        })
    };

    handleSearchClick(event){
        const keyword = this.state.searchInput;
        fetchYoutube(keyword).then(res => {
            this.setState({
                searchResult: res.items,
                searchClick: true,
                videoClick: false
            })
        })
    };

    handleVideoClick(event){
        const videoId = event.currentTarget.id
        this.setState({
            videoClick: true,
            searchClick: false,
            videoId: videoId
        })
    };

    render() {
        const { videos } = this.state;
        const { searchResult } = this.state;
        const { searchClick } = this.state;
        const { searchInput } = this.state;
        const { videoClick } = this.state;
        const { videoId } = this.state;
        return(
            <Fragment >
                <MuiThemeProvider theme={ theme }>
                    <Navbar searchClick={ this.handleSearchClick } searchInput={ this.handleSearchInput }/>
                    { searchClick ? <Search searchResult={ searchResult } videoClick={ this.handleVideoClick }/> 
                                  : (videoClick ? <VideoPlayer videoId={ videoId }/> 
                                                 : <Gallery videos={ videos } videoClick = { this.handleVideoClick } />)}
                </MuiThemeProvider>
            </Fragment>
        )
    }
};

export default App;