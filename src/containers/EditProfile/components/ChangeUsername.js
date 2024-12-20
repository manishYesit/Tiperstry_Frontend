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
import { setUserData } from "../../../store/actions";
import { withTranslation } from "../../../../i18n";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserData,
};

const ChangeUsername = ({ user, setUserData, t }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    severity: "",
  });

  const handleValue = (event) => {
    setUsername(event.target.value);
  };

  const handleCheckUsername = async (event) => {
    event.preventDefault();

    if (username.length > 3) {
      setLoading(true);
      setRes({
        err: false,
        msg: "",
        severity: "",
      });
      try {
        const valid = await axios.post(
          config.username,
          { username },
          { headers: { "x-auth-token": user.token } }
        );

        setRes({
          msg: valid.data,
          severity: "success",
          err: true,
        });
        setLoading(false);

        const userData = await axios.get(config.me, {
          headers: { "x-auth-token": user.token },
        });

        setUserData(userData.data);
        sessionStorage.setItem("userData", userData.data);
      } catch (error) {
        setLoading(false);
        // console.log("error", error);
        setRes({
          msg: error.response.data,
          err: true,
          severity: "warning",
        });
      }
    } else {
      setRes({
        msg: "Username must be greater that 3 character",
        err: true,
        severity: "warning",
      });
      setLoading(false);
    }
  };

  return (
    <form
      className={classes.root}
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleCheckUsername}
      noValidate
      autoComplete="off"
    >
      <Box mt={0.5} mb={3}>
        <Typography align="center" color="primary" variant="overline">
          {t("Change your Unqiue Username now")}
        </Typography>
      </Box>

      {res.err && <Alert severity={res.severity}>{res.msg}</Alert>}

      <TextField
        id="outlined-helperText"
        label={t("Change Username")}
        value={username}
        fullWidth
        onChange={handleValue}
        variant="outlined"
      />
      <br />
      <Button variant="outlined" color="primary" onClick={handleCheckUsername}>
        {loading ? <CircularProgress size={25} /> : t("Change Username")}
      </Button>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
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
)(withTranslation()(ChangeUsername));
