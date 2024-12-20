import React, { useState } from "react";
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
import EmailForm from "./components/EmailForm";
import Form from "./components/Form";
import { withTranslation } from "../../../i18n";


const ForgotRoot = ({ t }) => {
  const [email, setEmail] = React.useState("");
  const [route, setRoute] = React.useState("email");
  const classes = useStyles();
  const [res, setRes] = useState({ err: false, msg: "", status: "" });

  const handleEmail = (email)=>{
    setEmail(email)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar
            src="/static/tipcoins/tipc-small.png"
            className={classes.avatar}
          ></Avatar>
          <Typography component="h1" variant="h5">
            {t("Forgot My Password")}
          </Typography>
          {route === "email" ? (
            <EmailForm
              res={res}
              setRes={setRes}
              handleEmail={handleEmail}
              email={email}
              setRoute={setRoute} />
          ) : (
            <Form 
              res={res}
              setRes={setRes}  
              email={email} 
              setRoute={setRoute} />
          )}
        </div>
      </Grid>
    </Grid>
  );
}


export default withTranslation()(ForgotRoot);



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/static/images/forget.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
