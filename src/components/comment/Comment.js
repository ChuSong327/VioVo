import React, { Component } from "react";
import { fetchVideoComment } from "../../utils/ytUtil";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    commentCount: {
        fontSize: "1.2vw",
        marginLeft: theme.spacing.unit * 2.2,
        marginTop: theme.spacing.unit * 2.5
    }, 
    card: {
        height: theme.spacing.unit * 13,
        boxShadow: "none",
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start"
    },
    authorImage: {
        borderRadius: "50%",
        height: theme.spacing.unit * 5.5,
        width: theme.spacing.unit * 5.5,
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2.2
    },
    authorName: {
        fontWeight: 500,
        marginRight: theme.spacing.unit * 2,
        display: "inline-blcok",
        float: "left",
        fontSize: "0.9vw"
    },
    publishedAt: {
        color:"#9E9E9E",
        display: "inline-block",
        float: "left",
        fontSize: "0.9vw"
    },
    commentBox: {
        paddingTop: theme.spacing.unit * 1,
    },
    commentText: {
        fontSize: "1vw",

    },
    commentStat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 0
    },
    likeStyle: {
        fontSize:"1vw",
        color: "#9E9E9E",
        "&:hover": {
            color: "#757575"
        },
        marginRight: theme.spacing.unit * 1
    },
    likeCount: {
        fontSize: "1vw",
        color: "#9E9E9E",
        marginRight: theme.spacing.unit * 1
    }
});

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
        };
    };

    componentWillMount(){
        const videoId = this.props.videoId;
        fetchVideoComment(videoId).then(res => {
            this.setState({
                comments: res.items
            })
        })
    };

    render(){
        const { classes } = this.props;
        const { comments } = this.state;
        const { commentCount } = this.props;
       
        if(comments.length === 0) {
            return(
                <div>
                    No Comment Yet
                </div>
            )
        } 
        else {
            return (
                <div className={ classes.root }>
                    <div>
                        <Typography className={ classes.commentCount }>
                            { commentCount } Comments 
                        </Typography>
                    </div>
                   <div>
                      {comments.map((comment, index) => {
                          const authorName = comment.snippet.topLevelComment.snippet.authorDisplayName;
                          const authorImage = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
                          const { publishedAt } = comment.snippet.topLevelComment.snippet;
                          const { likeCount } = comment.snippet.topLevelComment.snippet;
                          const { textDisplay } = comment.snippet.topLevelComment.snippet;
                          console.log(comment)

                          return(
                              <Card key={ index } className={ classes.card }>
                                <div>
                                    <CardMedia
                                        className={ classes.authorImage }
                                        image={ authorImage } />
                                </div>
                                <div>
                                    <CardContent>
                                        <Typography className={ classes.authorName }>
                                            { authorName } 
                                        </Typography>
                                        <Typography className={ classes.publishedAt }>
                                            <Moment fromNow>{ publishedAt }</Moment>
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.commentBox}> 
                                        <Typography className={ classes.commentText }>
                                            { textDisplay }
                                        </Typography>
                                    </CardContent>
                                    <CardContent className={ classes.commentStat }>
                                        <ThumbUp className={ classes.likeStyle }></ThumbUp> 
                                        <Typography className={ classes.likeCount }>
                                            { likeCount }
                                        </Typography>
                                        <ThumbDown className={ classes.likeStyle }></ThumbDown>
                                    </CardContent>
                                </div>
                              </Card>
                          )
                      })}
                   </div>
                </div>
            )
        }
    };
};

export default withStyles(styles)(Comment);
