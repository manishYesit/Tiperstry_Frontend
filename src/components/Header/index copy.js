import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import { setUserData } from "../../store/actions"
import Exit from "@material-ui/icons/ExitToApp"
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import Notification from "./Notification";
import AddPost from "../AddPost";
import Create from "@material-ui/icons/Create"


const mapStateToProps = state => ({
  user: state.user
});


const mapDispatchToProps = {
  setUserData
};


const Header = (props) => {
  const classes = useStyles();
  const { user, setUserData } = props;
  const [addPost, setAddPost] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/login");
  }

  const handleOpen = () => {
    setAddPost(true);
  };

  const handleClose = () => {
    setAddPost(false);
  };
  

  const loggedIn = () => {
    return (
      <>
        <Notification />
        <div className={classes.user}>
          <Typography variant="overline" className={classes.username}>
            @
          </Typography>
          <Typography
            variant="overline"
            className={classes.username}
            component="a"
            href={"/p/" + user.user.username}
          >
            {user.user.username}
          </Typography>
        </div>
        {user.user.isAdmin && (
          <Button href="/admin" color="inherit" size="small">
            Admin
          </Button>
        )}

        <IconButton onClick={handleLogOut}>
          <Exit style={{ color: "white" }} />
        </IconButton>
      </>
    );
  }


  const notLoggedIn = () => {
    return (
      <>
        <Button href="/login" color="inherit" size="small">
          Login
        </Button>
        <Fab
          variant="extended"
          size="small"
          href="/register"
          color="secondary"
          aria-label="add"
          className={classes.margin}
        >
          Join Us
        </Fab>
      </>
    );
  }


  return (
    <AppBar position="fixed" elevation={1} className={classes.root}>
      <Container maxWidth="md">
        <Toolbar>
          <a href="/">
            <img
              src="/static/tipcoin.png"
              className={classes.logo}
            />
          </a>
          <div className={classes.title} />
          <IconButton
            // variant="contained"
            color="secondary"
            onClick={handleOpen}
            size="small"
          >
            <Create />
          </IconButton>

          {user.user ? loggedIn() : notLoggedIn()}
        </Toolbar>
      </Container>
      <AddPost open={addPost} handleClose={handleClose} />
    </AppBar>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1
    // backgroundColor: "transparent"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    width: "auto",
    height: 60
  },
  margin: {
    margin: theme.spacing(1),
    width: "90px !important"
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  username: { color: "white", fontSize: 14 }
}));
