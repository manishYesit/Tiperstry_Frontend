import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import { connect } from "react-redux";
import { setToken } from "../../../store/actions";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import AppCaptcha from "../../../components/AppCaptcha";
import { withTranslation } from "../../../../i18n";

import { useRouter } from 'next/router'

const mapDispatchToProps = {
  setToken
};

const RegisterInSide = ({ setToken, username, setRoute, t }) => {
  const router = useRouter()
  const { ref } = router.query

  const { executeRecaptcha } = useGoogleReCaptcha();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [signupadllowed, setSignupallowed] = useState(false);

  const [res, setRes] = useState({ err: false, msg: "", status: "" });
  const [value, setValue] = useState({
    email: "",
    username,
    password: "",
    // confirmPassword: "",
    name: "",
    ref
  });
  const [captcha, setCaptcha] = useState(false);

  const handleChange = val => event => {
    setValue({
      ...value,
      [val]: event.target.value
    });
  };

  const handleRegister = async event => {
    event.preventDefault();

    const token = await executeRecaptcha("register");

    if (!token) return

    if (value.username === "") {
      setRes({
        err: true,
        msg: "Username is required",
        status: "warning"
      })
      return;
    }
    // additional username checks
    let additionalerror = "";
    const format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (value.username.length > 15) additionalerror = "Username cannot be longer than 15 characters";
    else if (format.test(value.username)) additionalerror = "Username can only contain alphanumeric characters";

    if (additionalerror !== "") {
      setRes({
        err: true,
        msg: additionalerror,
        status: "warning"
      })
      return;
    }

    if (!isEmail(value.email)) {
      setRes({
        err: true,
        msg: t("A valid Email is required"),
        status: "warning"
      });
      return;
    }

    if (value.username.search(/\W/g) != -1) {
      setRes({
        err: true,
        msg: "A valid username is required",
        status: "warning"
      });
      return;
    }

    if (!captcha) {
      setRes({
        err: true,
        msg: t('Invalid Captcha'),
        status: "warning"
      });
      return;
    }

    if (value.name === "") {
      setRes({
        err: true,
        msg: "Name is required",
        status: "warning"
      });
      return;
    }

    if (value.password === "") {
      setRes({
        err: true,
        msg: "Password is required",
        status: "warning"
      });
      return;
    }

    if (value.password.length < 5) {
      setRes({
        err: true,
        msg: "Password must have a minimum of 5 characters",
        status: "warning"
      });
      return;
    }

    // if (value.confirmPassword === "") {
    //   setRes({
    //     err: true,
    //     msg: "Confirm Password is required",
    //     status: "warning"
    //   });
    //   return;
    // }

    // if (value.password !== value.confirmPassword) {
    //   setRes({
    //     err: true,
    //     msg: "Password didn't match confirm password",
    //     status: "warning"
    //   });
    //   return;
    // }
    try {
      setLoading(true);
      const user = await axios.get(config.username + "/" + value.username);
      //setLoading(false);
      //setRoute("form");

      try {
        //setLoading(true);
        const register = await axios.post(config.me, value);
        // // console.log("register", register);

        // // save token to local storage
        // localStorage.setItem("token", register.headers["x-auth-token"]);

        // // set token to redux state
        // setToken(register.headers["x-auth-token"]);

        setLoading(false);
        setRes({ err: true, msg: register.data, status: "success" });

        // redirect to homepage
        // Router.push("/");
      } catch (error) {
        setRes({ err: true, msg: error.response.data, status: "warning" });
        setLoading(false);
        // // console.log("error", error);
      }
    } catch (error) {
      console.log("user", error);
      setLoading(false);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      })
      // // console.log("error", error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleRegister} noValidate>
      {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        //value={username}
        //disabled={loading || signupadllowed}
        onChange={handleChange("username")}
        placeholder="raymon_59"
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        id="username"
        label={t("Username")}
        name="username"
        helperText={t("Enter a unique username. Your username cannot be longer than 15 characters and can only contain alphanumeric characters (letters A-Z, numbers 0-9) and underscores")}
        autoComplete="off"
        autoFocus
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("name")}
        id="name"
        label={t("Name")}
        name="username"
        autoComplete="name"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("email")}
        id="email"
        label={t("Email Address")}
        name="email"
        autoComplete="email"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        onChange={handleChange("password")}
        fullWidth
        name="password"
        label={t("Password")}
        type="password"
        id="password"
        autoComplete="current-password"
      />

      {/* <TextField
        variant="outlined"
        margin="normal"
        required
        onChange={handleChange("confirmPassword")}
        fullWidth
        name="password"
        label={t("Confirm Password")}
        type="password"
        id="password"
        autoComplete="current-password"
      /> */}

      <FormControlLabel
        value="end"
        control={<Checkbox onClick={() => { setSignupallowed(!signupadllowed) }} color="primary" />}
        label={
          <div>
            I agree to the &nbsp;
            <a target='_blank' href='https://new.tipestry.com/terms'>Terms of Service</a>
          </div>
        }
        labelPlacement="end"
      />
      {/* <RECAPTCHA /> */}

      <AppCaptcha onChange={(val) => setCaptcha(val)} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button
            type="submit"
            fullWidth
            onClick={() => setRoute("username")}
            variant="contained"
            className={classes.submit}
          >
            {t("Back")}
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !signupadllowed || !captcha}
            className={classes.submit}
          >
            {loading ? <CircularProgress size={25} /> : t("Sign Up")}
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
          <Link href="/forgot" variant="body2">
            {t("Forgot password?")}
          </Link>
        </Grid>
        <Grid item>
          <Link href="/login" variant="body2">
            {t("Already have an account? Log In")}
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



export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(RegisterInSide));


const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Tipestry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
