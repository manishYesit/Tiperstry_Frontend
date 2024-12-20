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
import {
  toggleAddDomainModal,
  toggleVerifyDomainModal,
  setUserDomainData,
} from "../../store/actions";
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

const VerifyDomain = ({ t }) => {
  const domain = useSelector(({ domain }) => domain);
  const userDomainData = useSelector(({ user }) =>
    user.user ? user.user.website || {} : {}
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
  });

  const toggleAddDomain = (event) => {
    event.preventDefault();
    dispatch(toggleAddDomainModal(!domain.openAddDomain));
  };

  const handleChange = (name) => (event) => {
    setVal({
      ...val,
      [name]: event.target.value.trim(),
    });
  };

  const verifyNow = async () => {
    setLoading(true);
    if (token) {
      await axios
        .post(
          config.verifyWebsite,
          {},
          {
            headers: { "x-auth-token": token },
          }
        )
        .then((response) => {
          setLoading(false);
          dispatch(setUserDomainData(response.data));
        })
        .catch((error) => {
          setLoading(false);
          dispatch(setError(error.response.data));
        });
    }
  };

  return (
    <Dialog
      open={domain.openVerifyDomain}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">DNS Verification</DialogTitle>
      <DialogContent className={classes.root}>
        <div>
          <p>
            Add a DNS TXT record to your domain to prove that you own this
            domain, most domain host allows this and below are the specific
            steps you need
          </p>
          <h3>DNS TXT Record</h3>
          {userDomainData && userDomainData.verified ? (
            <Alert severity="success">
              Domain has been verified succesfully
            </Alert>
          ) : null}
          {userDomainData && !userDomainData.verified ? (
            <Alert severity="warning">
              Unable to verify domain{" "}
              <strong>review the domain records!</strong>
            </Alert>
          ) : null}
          {error ? <Alert severity="error">{error}</Alert> : null}
          <h4>Here are the basic steps</h4>
          <ol className={classes.ol}>
            <li className={classes.li}>
              {" "}
              Login to your domain registrar and visit the DNS records section
            </li>
            <li className={classes.li}>
              {" "}
              Add this TXT record in your DNS configuration{" "}
              <a
                href="#"
                onClick={toggleAddDomain}
                style={{ float: "right", marginRight: 10 }}
              >
                {userDomainData.txt ? userDomainData.txt : "Add domain now"}
              </a>
            </li>
            <li className={classes.li}>
              {" "}
              Add @ in the HOST field (if your doamin host requires it)
            </li>
            <li className={classes.li}>
              {" "}
              Wait until the DNS change is propagated, (this takes about
              72hours)
            </li>
          </ol>
        </div>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button
          onClick={() =>
            dispatch(toggleVerifyDomainModal(!domain.openVerifyDomain))
          }
          color="default"
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
        <Button
          onClick={verifyNow}
          disabled={
            !userDomainData.domain || userDomainData.verified || loading
          }
          color="secondary"
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={25} />
          ) : (
            t(userDomainData.verified ? "Verified" : "Verify domain")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(VerifyDomain);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  ol: {
    backgroundColor: "inherit",
    padding: 0,
  },
  li: {
    padding: "13px 12px",
    backgroundColor: "#e8e8e8",
    margin: "10px 0",
    borderRadius: "4px",
  },
}));
