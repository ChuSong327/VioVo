import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    card : {
        width: 260,
        height: 230,
        marginTop: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 2
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    videoTitle: {
        paddingTop: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 0.5, 
        paddingBottom: 0,
        height: theme.spacing.unit * 3,
    },
    title: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap", 
        overflow:"hidden",
        fontWeight: 500,
        fontSize: "1rem"
    },
    channelInfo: {
        marginTop: 0,
        paddingTop: theme.spacing.unit * 0.5,
        paddingLeft: theme.spacing.unit * 0.5,
    },
    channelTitle: {
        fontWeight: 400,
        color: "grey"
    }
});

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { classes } = this.props;
        const { video } = this.state;
        const { videos } = this.props;
       

        if(!videos) {
            return (
                <div> "Loading"</div>
            )
        } else if(videos) {
            return (
                <div className={ classes.root }>
                    {videos.map((video, index) => {
                        const { url } = video.snippet.thumbnails.medium;
                        const { title} = video.snippet;
                        const { channelTitle } = video.snippet;
                        
                        return(
                            <Card className={ classes.card } key={index}>
                                <CardMedia 
                                    className={ classes.media }
                                    image={ url } 
                                    title={ title } />
                                <CardContent className={ classes.videoTitle }>
                                    <Typography component="h3" className={ classes.title }> 
                                        { title }
                                    </Typography>
                                </CardContent>
                                <CardContent className={ classes.channelInfo } >
                                    <Typography component="h4" className={ classes.channelTitle }> 
                                        { channelTitle } <br/>
                                    </Typography>
                                </CardContent>
                            </Card> )      
                    })}
                </div>
            )
        }
    }
};

export default withStyles(styles)(Gallery);