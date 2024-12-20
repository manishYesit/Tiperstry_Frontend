import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { config } from "../../../../config";
import Router from "next/router";
import { connect } from "react-redux";
import { setToken } from "../../../store/actions";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import AppCaptcha from "../../../components/AppCaptcha";
import { withTranslation } from "../../../../i18n";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const mapDispatchToProps = {
  setToken,
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    '& iframe': {
      margin: 'auto !important',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = ({ setToken, t }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({ err: false, msg: "", status: "" });
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [captcha, setCaptcha] = useState(false);

  // Handle google login event
  const handleResponse = async (response) => {
    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }

    try {
      const jwt = response.credential;

      const userInfo = parseJwt(jwt);

      const googleUserId = userInfo.sub;
      const googleUserName = userInfo.name;
      const googleUserEmail = userInfo.email;

      const login = await axios.post(config.googleLogin, {
        name: googleUserName,
        email: googleUserEmail,
        socialId: googleUserId,
      });

      // save token to local storage
      localStorage.setItem("token", login.headers["x-auth-token"]);

      // set token to redux state
      setToken(login.headers["x-auth-token"]);
      
      // redirect to homepage
      Router.push("/");
    } catch (error) {
      setRes({
        err: true,
        msg: error.response.data,
        status: "error",
      });
      return;
    }
  }

  const handleLoginError = (err) => {
    setRes({
      err: true,
      msg: 'Login Failed',
      status: "error",
    });
  };

  const handleChange = (val) => (event) => {
    event.persist();
    setValue({
      ...value,
      [val]: event.target.value.trim(),
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await executeRecaptcha("login");

      if (!token) return;

      if (!isEmail(value.email.trim())) {
        setRes({
          err: true,
          msg: t("A valid Email is required"),
          status: "warning",
        });
        return;
      }

      if (!captcha) {
        setRes({
          err: true,
          msg: t("Invalid Captcha"),
          status: "warning",
        });
        return;
      }

      if (value.password === "") {
        setRes({
          err: true,
          msg: t("Password is required"),
          status: "warning",
        });
        return;
      }

      if (value.password.length < 5) {
        setRes({
          err: true,
          msg: "Password must have a minimum of 5 characters",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      const login = await axios.post(config.login, value);

      // save token to local storage
      localStorage.setItem("token", login.headers["x-auth-token"]);

      // set token to redux state
      setToken(login.headers["x-auth-token"]);
      setLoading(false);

      // redirect to homepage
      Router.push("/");
    } catch (error) {
      setLoading(false);
      setRes({
        err: true,
        msg: error.response.data,
        status: "error",
      });

      console.log("error", error);
      console.log("error", error.response);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleLogin} noValidate>
      {res.err && <Alert severity={res.status}>{t(res.msg)}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("email")}
        id="email"
        label={t("Email Address")}
        name="email"
        autoComplete="off"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        autoComplete="off"
        onChange={handleChange("password")}
        fullWidth
        name="password"
        label={t("Password")}
        type="password"
        id="password"
      />
      {/* <RECAPTCHA /> */}
      <AppCaptcha onChange={(val) => setCaptcha(val)} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        color="primary"
        className={classes.submit}
      >
        {loading ? <CircularProgress size={25} /> : t("Sign in")}
      </Button>

      <GoogleOAuthProvider clientId="407539936211-bucrvo27fbsqtmcqgsj7omrb73prjks1.apps.googleusercontent.com">
        <GoogleLogin
          shape="circle"
          theme="outline"
          size="medium"
          onSuccess={handleResponse}
          onError={handleLoginError}
        />
      </GoogleOAuthProvider>

      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs>
          <Link href="/forgot" variant="body2">
            {t("Forgot password?")}
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2">
            {t("Don't have an account? Sign Up")}
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        {/* <Copyright /> */}
        <Typography variant="body2" color="textSecondary" align="center">
          {t("Copyright")} ©
          <Link color="inherit" href="/">
            Tipestry
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(withTranslation()(SignInSide));
