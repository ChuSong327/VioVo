import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import white from "@material-ui/core/colors";

const styles = theme => ({
    
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexGrow: 1,
    },
    title: {
        marginRight: "auto",
        marginLeft: theme.spacing.unit * 2,
        color: "inherit",
        fontSize: "1.6rem",
        letterSpacing:1
    },
    form: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "40%",
        marginRight: "auto",
    },
    search: {
        fontSize: "1.5rem"
    },
    textField: {
        width: "100%",
        alignSelf: "center",
        fontSize: "5rem"
    },
    author: {
        fontSize: "2rem",
        color: "inherit"
   },
   input: {
       fontSize: "1rem",
       color: "white",
       letterSpacing:1,
       paddingLeft: 5
   }
})

class Navbar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <AppBar position="static" color="primary" >
                
                    <Toolbar>
                        <Typography variant="title" className={ classes.title }>
                            VioVo
                        </Typography>
                        <form className={ classes.form }>
                            <TextField 
                                id="search-input" 
                                placeholder="Search"
                                className={ classes.textField }
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}>
                            </TextField>
                            <IconButton>
                                <Search className={ classes.search }/>
                            </IconButton>
                        </form>
                        <IconButton className={ classes.author } >
                            <AccountCircle style={{ fontSize: "2rem" }} />
                        </IconButton>
                    </Toolbar>  
                </AppBar>
            </div>
        )
    }
};

export default withStyles(styles)(Navbar);