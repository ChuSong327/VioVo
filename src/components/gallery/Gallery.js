import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { getVideoInfo } from "../../utils/ytUtil";
import LinearProgress from "@material-ui/core/LinearProgress";
import Moment from "react-moment";

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
    progress: {
        marginTop: theme.spacing.unit * 0.5
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
    },
    dot: {
        height: "3px",
        width: "3px",
        backgroundColor: "grey",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: theme.spacing.unit * 0.3,
        marginRight: theme.spacing.unit * 0.3,
        marginBottom: theme.spacing.unit * 0.3
    }
});

//Slow Down the webpage loading significantly
const convertNumbers = number => {
    let newNum;
    if(number < 1000) {
        return number;
    } 
    else if (number < 10000) {
        newNum = number.toString().substr(0, 1) + "," + number.toString().substring(1);
        return newNum;
    }
    else if (10000 <= number && number < 1000000) {
        newNum = Math.round(number / 1000) + "K";
        return newNum;
    }
    else if (number >= 1000000 && number < 10000000) {
        newNum = (number / 1000000).toString().substr(0, 3) + "M";
        return newNum;
    }
    else if (number >= 10000000 && number < 100000000) {
        newNum = Math.floor(number / 1000000) + "M";
        return newNum;
    }
    else if (number >= 100000000) {
        newNum = Math.floor(number / 100000000) + "B";
        return newNum;
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        const { classes } = this.props;
        const { videos } = this.props;
        if(!videos) {
            return (
                <LinearProgress className={ classes.progress } color="secondary"/>
                
                // <LinearProgress color="primary"/>
            )
        } else if(videos) {
            return (
                <div className={ classes.root }>
                    {videos.map((video, index) => {
                        const { url } = video.snippet.thumbnails.medium;
                        const { title } = video.snippet;
                        const { channelTitle } = video.snippet;
                        const  viewCount  = convertNumbers(video.statistics.viewCount);
                        const { publishedAt } = video.snippet;

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
                                        { viewCount } views 
                                        <span classes="dot" className={ classes.dot }></span> 
                                        <Moment fromNow>{ publishedAt }</Moment>
                                    </Typography>
                                </CardContent>
                            </Card> 
                        )      
                    })}
                </div>
            )
        }
    };
};

export default withStyles(styles)(Gallery);