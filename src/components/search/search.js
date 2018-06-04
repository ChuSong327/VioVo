import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: theme.spacing.unit *  5
    },
    card: {
        height: theme.spacing.unit * 15,
        marginTop: theme.spacing.unit * 3,
        marginLeft: "20%",
        marginRight: "20%",
        display: "flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems: "flex-start"
    },
    media: {
        height: theme.spacing.unit * 15,
        width: "20%",
        paddingTop: 0
    },
    cardContent: {
        paddingTop: 3,
        paddingBottom: 1,
        paddingLeft: 3
    },
    videoTitle: {
        fontWeight: 500,
        fontSize: "1.1rem"
    },
    videoInfo:{
        fontWegith: 300,
        fontSize: "0.8rem",
        color: "grey",
        paddingTop: theme.spacing.unit * 0
    }
})

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render(){
        const { classes } = this.props;
        const { searchResult } = this.props;
        console.log("in search", this.props)

        return(
            <div className={ classes.root }>
                {searchResult.map((video, index) => {
                    const { url } = video.snippet.thumbnails.medium;
                    const { title } = video.snippet;
                    const { channelTitle } = video.snippet;
                    const { description } = video.snippet;
                    const { publishedAt } = video.snippet;
                    console.log(video.snippet.thumbnails)
                    return(
                        <Card className={ classes.card } key={ index }>
                            <CardMedia 
                                className={ classes.media }
                                image={ url }
                                title={ title }/>
                            <div>
                                <CardContent className={ classes.cardContent }>
                                    <Typography className={ classes.videoTitle } component="h1">
                                        { title }
                                    </Typography>
                                    <Typography className={ classes.videoInfo } component="h1">
                                        {channelTitle}
                                    </Typography>
                                </CardContent>
                                <CardContent className={ classes.cardContent }>
                                    <Typography className={ classes.videoInfo } component="p">
                                        { description }
                                    </Typography>
                                </CardContent>
                            </div>
                            
                        </Card>
                    )
                })}
            </div>
        )
    }
};

export default withStyles(styles)(Search);
