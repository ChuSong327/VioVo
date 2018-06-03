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
        paddingBottom: 0
    },
    videoChannel: {
        marginTop: 0,
        paddingTop: theme.spacing.unit * 0.5,
        paddingLeft: theme.spacing.unit * 0.5,
    }
});

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: [1,2,3,4,5,6,7,8,9,10]
        }
    }

    render() {
        const { classes } = this.props;
        const { video } = this.state;

        return (
            <div className={ classes.root }>
                {video.map((video, index) => {
                    return(
                        <Card className={ classes.card } key={index}>
                            <CardMedia 
                                className={ classes.media }
                                image= "https://images.crazygames.com/gustaaf-party.png" 
                                // image="linkedin-box.png"
                                title="hello"/>
                            <CardContent className={ classes.videoTitle }>
                                <Typography component="h3"> 
                                    Hello
                                </Typography>
                            </CardContent>
                            <CardContent className={ classes.videoChannel } >
                                <Typography component="h4"> 
                                    Chanel Info <br/>
                                </Typography>
                            </CardContent>
                        </Card> )      
                })}
            </div>
        )
    }
};

export default withStyles(styles)(Gallery);