import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddDomainModal, setUserDomainData } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "../../../i18n";
import TextField from "@material-ui/core/TextField";

import { config } from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddDomain = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const domain = useSelector(({ domain }) => domain);
  const userDomainData = useSelector(({ user }) =>
    user.user ? user.user.website || {} : {}
  );

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
  });

  const toggleAddDomain = (event) => {
    event && event.preventDefault();
    dispatch(toggleAddDomainModal(!domain.openAddDomain));
  };

  const [val, setVal] = useState({
    domain: userDomainData ? userDomainData.domain : "",
  });

  const addDomain = async () => {
    if (
      !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(
        val.domain
      )
    ) {
      setError(
        "Invalid domain found, use example.com instead of www.example.com or https://example.com"
      );
      return false;
    }
    setLoading(true);
    setError("");
    if (token) {
      axios
        .post(config.website, val, {
          headers: { "x-auth-token": token },
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          toggleAddDomain();
          dispatch(setUserDomainData(response.data));
        })
        .catch((err) => setError(err.response.data));
    }
  };
  const handleChange = (name) => (event) => {
    setVal({
      ...val,
      [name]: event.target.value.trim(),
    });
  };
  return (
    <Dialog
      open={domain.openAddDomain}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Add Domain</DialogTitle>
      <DialogContent className={classes.root}>
        <div>
          {error && <Alert severity="warning">{error}</Alert>}
          <p>Enter the domain you want to associate to this account</p>
          <TextField
            id="outlined-basic"
            value={val.domain}
            disabled={userDomainData.verified}
            fullWidth
            label={t("mywebsite.org")}
            onChange={handleChange("domain")}
            variant="outlined"
            margin="dense"
          />
        </div>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button onClick={toggleAddDomain} color="default" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          onClick={addDomain}
          disabled={userDomainData.verified | loading}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Add Domain")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(AddDomain);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
