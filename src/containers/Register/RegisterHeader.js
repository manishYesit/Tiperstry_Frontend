import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Form from "./components/Form";
import UsernameForm from "./components/Username";
import { withTranslation } from "../../../i18n"

const RegisterRoot = ({ t }) => {

  const classes = useStyles();
	const [username, setUsername] = React.useState("");
	const [route, setRoute] = React.useState("form");

  const handleUsername = (username)=>{
    setUsername(username)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Link href="/">
            <Avatar
              src="/static/tipcoin.png"
              className={classes.avatar}
            ></Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            {t("Join Us")}
          </Typography>

          {route === "username" ? (
            <UsernameForm
              handleUsername={handleUsername}
              username={username}
              setRoute={setRoute}
            />
          ) : (
            <Form username={username} setRoute={setRoute} />
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default withTranslation()(RegisterRoot);


const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(/static/images/login.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.primary.main,
    width: "85px",
    height: "85px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));