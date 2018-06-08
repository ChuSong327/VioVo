import React, { Component } from "react";
import VideoList from "../videolist/VideoList";
import Comment from "../comment/Comment";
import { getVideoInfo } from "../../utils/ytUtil";
import { convertNumbers } from "../../utils/numConverter";
import { formatNumbers } from "../../utils/numConverter";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1
    },
    progress: {
        marginTop: theme.spacing.unit * 0.5
    },
    media: {
        width: "100%",
        height: " 40vw",
    },
    videoInfo: {
        marginTop: "-16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    videoTitle: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        fontWeight: 500,
        fontSize: "1.3vw"
    },
    viewStyle: {
        fontSize: "1.1vw",
        color: "grey",
    },
    videoStats: {
        marginRight: theme.spacing.unit * 6,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    statBar: {
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 1.5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconStyle:{
        fontSize: "1.5vw",
        color:"#9E9E9E",
        display: "inline-block",
        marginRight: theme.spacing.unit * 1.2,
        "&:hover": {
            color: "#757575"
        }
    },
    likeStyle: {
        color: "#9E9E9E",
        fontSize: "1vw"
    }
});

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            video: "",
        }
    };

    componentDidMount(){
        const videoId = this.props.videoId;
        getVideoInfo(videoId).then(res => {
            this.setState({
                video: res.items
            })
        });
    };

    render(){
        const { classes } = this.props;
        if(!this.state.video) {
            return(
                <LinearProgress className={ classes.progress } color="secondary"/>
            )
        } 
        else if(this.state.video) {
            const { id } = this.state.video[0];
            const url = "https://www.youtube.com/embed/" + id;
            const { title } = this.state.video[0].snippet;
            const { viewCount } = this.state.video[0].statistics;
            const { likeCount } = this.state.video[0].statistics;
            const { dislikeCount } = this.state.video[0].statistics;
            const { commentCount } = this.state.video[0].statistics;

            return(
                <div className={ classes.root }>
                    <iframe 
                        className={ classes.media }
                        src={ url } 
                        allow="autoplay; encrypted-media" 
                        frameBorder="0"
                        allowFullScreen>
                    </iframe>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={ classes.videoTitle }>
                                { title }
                             </Typography>
                             <div className={ classes.videoInfo }>
                                <CardContent>
                                    <Typography className={ classes.viewStyle }>
                                        { formatNumbers(viewCount) } views
                                    </Typography>
                                 </CardContent>
                                <CardContent className={ classes.videoStats }>
                                    <div className={ classes.statBar }>
                                        <ThumbUp className={ classes.iconStyle }/>
                                        <Typography className={ classes.likeStyle }>
                                             { convertNumbers(likeCount) }
                                        </Typography>
                                    </div>
                                    <div className={ classes.statBar }>
                                        <ThumbDown className={ classes.iconStyle }/>    
                                        <Typography className={ classes.likeStyle }>
                                             { convertNumbers(dislikeCount) }
                                        </Typography>
                                    </div>
                                </CardContent>
                            </div>
                            <hr color="#EEEEEE" style={{ marginLeft: 23, marginTop: -5, marginRight: 60, borderBottomWidth: 0.1 }}/>
                            <div>
                                <Comment videoId={ id } commentCount={ commentCount }/>
                             </div>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList/>
                        </Grid>
                    </Grid>
                </div>
                
            )
        }
    }
};

export default withStyles(styles)(VideoPlayer);