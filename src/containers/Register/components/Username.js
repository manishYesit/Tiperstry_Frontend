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
import InputAdornment from "@material-ui/core/InputAdornment";
import RECAPTCHA from "../../../components/Recaptcha";
import { withTranslation } from "../../../../i18n";

const mapDispatchToProps = {
  setToken
};

const UsernameInSide = ({ username, setRoute, handleUsername, t }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({ err: false, msg: "", status: "" });

  const handleChange = val => (event) => {
    handleUsername(event.target.value);
  }

  const handleCheckUsername = async (event) => {
    event.preventDefault();

    if (username === "") {
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

    if (username.length > 15) additionalerror = "Username cannot be longer than 15 characters";
    else if (format.test(username)) additionalerror = "Username can only contain alphanumeric characters";

    if (additionalerror !== "") {
      setRes({
        err: true,
        msg: additionalerror,
        status: "warning"
      })
      return;
    }

    try {
      setLoading(true);
      const user = await axios.get(config.username + "/" + username);

      setLoading(false);

      setRoute("form");
    } catch (error) {
      setLoading(false);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      })
    }
  }

  return (
    <form className={classes.form} onSubmit={handleCheckUsername} noValidate>
      {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={username}
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
      <RECAPTCHA />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        className={classes.submit}
      >
        {loading ? <CircularProgress size={25} /> : t("Next")}
      </Button>
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
}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(UsernameInSide));

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
