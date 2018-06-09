import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getVideoCategory } from "../../utils/ytUtil";
import { convertNumbers } from "../../utils/numConverter";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        marginTop: "5px"
    },
    card: {
        boxShadow: "none",
        marginBottom: "5px",
        marginLeft: "5px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "100px"
    },
    image: {
        height: "100px",
        width: "180px"
    },
    main: {
        paddingLeft: theme.spacing.unit * 0.5,
        paddingTop: 0,
        paddingBottom: 0,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    info:{
        paddingLeft: theme.spacing.unit * 0.5,
        paddingTop: 0,
        paddingBottom: 0,
    },
    title: {
        width: "200px",
        height: "auto",
        whiteSpace: "normal",
        fontWeight: 500,
        fontSize: "14px",
    },
    channelTitle:{
        fontSize: "13px",
        color: "#757575",
        letterSpacing: "0.5px"
    },
    viewCount:{
        fontSize: "13px",
        color: "#757575"
    }
});

class VideoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            videos: []
        }
    };
    componentWillMount(){
        const categoryId = this.props.categoryId;
        getVideoCategory(categoryId).then(res => {
            this.setState({
                videos: res.items
            }) 
        })
    };
    render(){
        const { videos } = this.state;
        const { classes } = this.props;

        if(videos.length === 0 ) {
            return(
                   <div>
                       <Typography>
                            No Video in this category are available.
                        </Typography>
                   </div>
            )
        }
        else {
            return(
                <div className={ classes.root }>
                    {videos.map((video, index) => {
                        const { title } = video.snippet;
                        const { viewCount } = video.statistics;
                        const { channelTitle } = video.snippet; 
                        const { url } = video.snippet.thumbnails.medium;

                        return(
                            <Card key={ index } className={ classes.card }>
                                <CardMedia
                                    className={ classes.image }
                                    image={ url }/>
                                <div>
                                    <CardContent className={ classes.main } >
                                        <Typography className={ classes.title }>
                                            { title }
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.main }>
                                        <Typography className={ classes.channelTitle }>
                                            { channelTitle }
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.main }>
                                        <Typography className={ classes.viewCount }>
                                            { convertNumbers(viewCount) } views
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
};

export default withStyles(styles)(VideoList);