import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { config } from "../../../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import Router from "next/router";
import { setUserData } from "../../../store/actions";
import { withTranslation } from "../../../../i18n";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserData,
};

const ChangePassword = ({ user, setUserData, t }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    severity: "",
  });

  const handleValue = (name) => (event) => {
    setValue({
      ...value,
      [name]: event.target.value,
    });
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    setLoading(true);
    setRes({
      err: false,
      msg: "",
      severity: "",
    });
    try {
      const valid = await axios.post(config.changePassword, value, {
        headers: { "x-auth-token": user.token },
      });

      setRes({
        msg: valid.data,
        severity: "success",
        err: true,
      });
      setLoading(false);

      setUserData(null);
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      Router.push("/");
    } catch (error) {
      setLoading(false);

      setRes({
        msg: error.response.data,
        err: true,
        severity: "warning",
      });
    }
  };

  return (
    <form
      className={classes.bottomRoot}
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handlePasswordChange}
      noValidate
      autoComplete="off"
    >
      <Box mt={0.5} mb={3}>
        <Typography align="center" color="primary" variant="overline">
          {t("Change your password")}
        </Typography>
      </Box>

      {res.err && <Alert severity={res.severity}>{res.msg}</Alert>}

      <TextField
        id="outlined-helperText"
        label={t("Current Password")}
        type="password"
        value={value.password}
        fullWidth
        onChange={handleValue("password")}
        variant="outlined"
      />
      <br />
      <TextField
        id="outlined-helperText"
        label={t("New Password")}
        type="password"
        value={value.newPassword}
        fullWidth
        onChange={handleValue("newPassword")}
        variant="outlined"
      />
      <br />
      <TextField
        id="outlined-helperText"
        label={t("Confirm New Password")}
        type="password"
        value={value.confirmNewPassword}
        fullWidth
        onChange={handleValue("confirmNewPassword")}
        variant="outlined"
      />
      <br />
      <Button variant="outlined" color="primary" onClick={handlePasswordChange}>
        {loading ? <CircularProgress size={25} /> : t("Change Password")}
      </Button>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  bottomRoot: {
    display: "flex",
    flexDirection: "column",
    // "& .MuiTextField-root": {
    //   margin: theme.spacing(1),
    //   width: 200
    // }
  },
}));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ChangePassword));
