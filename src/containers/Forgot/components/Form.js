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
import { setToken } from "../../../store/actions"
import { withTranslation } from "../../../../i18n";


const mapDispatchToProps = {
  setToken
};

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignInSide = ({ res, setRes, email, setToken, t }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	//const [res, setRes] = useState({ err: false, msg: "", status: "" });
	//const [email, setEmail] = useState("")
  const [value, setValue] = useState({
    email,
    otp: ""
  });


	// const handleChange = (event) => {
	// 	setEmail(event.target.value);
	// }
  const handleChange = val => event => {
    setValue({
      ...value,
      [val]: event.target.value
    });
  };

	const handleLogin = async (event) => {
		event.preventDefault();

		if (!isEmail(value.email)) {
			setRes({
				err: true,
				msg: t("A valid Email is required"),
				status: "warning"
			})
			return;
		}

		try {
      setLoading(true);
      const reset = await axios.post(config.resetAccount, { email:value.email, otp:value.otp });
      
      // // console.log("reset", reset);
      
      // redirect to homepage
      // Router.push("/");
      setRes({
        err: true,
        msg: reset.data,
        status: "success"
      });
      setLoading(false);
      
		} catch (error) {
      // // console.log("error", error.response);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      });
      setLoading(false);
		}
	}

  return (
    <form className={classes.form} onSubmit={handleLogin} noValidate>
      {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("email")}
        onAnimationEnd={handleChange}
        id="email"
        label={t("Email Address")}
        name="email"
        value={email}
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("otp")}
        onAnimationEnd={handleChange}
        id="otp"
        label={t("OTP")}
        name="otp"
        autoComplete="otp"
        autoFocus
      />
      <Button
        type="submit"
        fullWidth
        disabled={loading}
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {loading ? <CircularProgress size={25} /> : t("Reset My Password")}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/login" variant="body2">
            {t("Already have an account? Log In")}
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2">
            {t("Don't have an account? Sign Up")}
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
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



export default connect(null, mapDispatchToProps)(withTranslation()(SignInSide));