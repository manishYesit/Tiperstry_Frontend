import React from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { config } from "../config";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import EmailMarket from "../src/containers/Admin/components/emailMarketing";
import EmailMarketing from "../src/containers/Admin/components/EmailTemplate";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/static/images/login.png)",
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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  htmlPage: {
    background: "rgb(225, 229, 234)",
    width: "100%",
    height: "100vh",
    overflow: "auto",
    scrollbarWidth: "none",
  },
  formArea: { width: "100%", height: "100vh", overflow: "auto" },
}));

export const handleGetUser = async () => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const user = await axios.get(config.me, {
        headers: { "x-auth-token": token },
      });

      if (!user.data.isAdmin) Router.push("/");
      //dispatch(setUserData(user.data));
      //sessionStorage.setItem("userData", JSON.stringify(user.data));
    } else {
      Router.push("/");
    }
    //dispatch(setToken(token));
    //setToken(token);
  } catch (error) {
    console.log("error", error);
    Router.push("/");
  }
};

function SendEmailPage({ t }) {
  const classes = useStyles();

  React.useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        elevation={6}
        square
        className={classes.formArea}
      >
        <div className={classes.paper}>
          <Avatar src="/static/tipcoin.png" className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            {"Newsletter"}
          </Typography>
          <EmailMarket />
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={6} className={classes.htmlPage}>
        <div className={classes.htmlPage} id="html"></div>
      </Grid>
    </Grid>
  );
}

SendEmailPage.getInitialProps = async (context) => {
  const { query, res } = context;
  try {
    // const token = await axios.post(config.verify, { token: query.t });

    if (res) {
      // res.writeHead(302, {
      //   Location: "/login",
      // });
      // res.end();
    } else {
      // Router.push("/login");
    }

    return {};
  } catch (error) {
    console.log(error);
    console.log("error", error.response && error.response.data);
    return {};
  }
};

export default SendEmailPage;
