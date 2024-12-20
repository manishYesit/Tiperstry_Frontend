import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import { setPromotionCharge, toggleBroadcast } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { config } from "../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "../../../i18n";
import { responsiveFontSizes } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Broadcast = ({ t }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const broadcast = useSelector(({ broadcast }) => broadcast);
  const token = useSelector(({ user: { token } }) => token);
  const [loading, setLoading] = React.useState(false);
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    status: "",
  });

  React.useEffect(() => {
    // dispatch(setPromotionCharge());
    setTimeout(() => {
      setRes({
        err: false,
        msg: "",
        status: "",
      });
    }, 5000);
    setPromotionCharge();
  }, []);
  const [days, setDays] = React.useState(null);

  const getPromotionCharge = async () => {
    // if (broadcast.promotionCharge == null) {
    try {
      const response = await axios.get(config.promotionCharge, {
        headers: { "x-auth-token": token },
      });
      console.log(response);

      if (response.data.payload != undefined) {
        dispatch(setPromotionCharge(response.data.payload));
      }
    } catch (error) {
      console.log(error.response.data);
    }
    // }
  };

  const handleForm = async () => {
    if (!token) {
      setRes({
        msg: "You must be logged in to boost a post",
        err: true,
        status: "error",
      });
      return;
    }
    if (days == null) {
      setRes({
        msg: "You must input the number of days",
        err: true,
        status: "error",
      });
      return;
    }

    if (days <= 0) {
      setRes({
        msg: "number of days must be greater than 0",
        err: true,
        status: "error",
      });
      return;
    }

    if (Number.isNaN(Number(days))) {
      setRes({
        msg: "please enter a valid number",
        err: true,
        status: "error",
      });
      return;
    }
    const data = {
      postId: broadcast.topicId,
      days,
    };
    try {
      setLoading(true);
      const response = await axios.post(config.promotedPost, data, {
        headers: { "x-auth-token": token },
      });

      setRes({
        err: false,
        msg: response.data.message,
        status: "success",
      });

      handleClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status == 500) {
          return setRes({
            msg: "server error",
            err: !error.response.data.success,
            status: "error",
          });
        }
        console.log(error.response);
        setRes({
          msg: error.response.data.message,
          err: !error.response.data.success,
          status: "error",
        });
      } else {
        setRes({
          msg: "unexpected error occured",
          err: false,
          status: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setDays(event.target.value);
  };

  const handleClose = () => {
    dispatch(toggleBroadcast());
  };

  return (
    <Dialog
      open={broadcast.open}
      maxWidth="md"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Promote Post</DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && (
          <Alert severity={res.status} className={classes.alert}>
            {res.msg}
          </Alert>
        )}
        {res.status == "success" && (
          <Alert severity="success" className={classes.alert}>
            {res.msg}
          </Alert>
        )}
        <Alert severity="info" className={classes.alert}>
          promoting posts costs{" "}
          {broadcast.promotionCharge && broadcast.promotionCharge.price}{" "}
          {broadcast.promotionCharge && broadcast.promotionCharge.currency} per
          day
        </Alert>
        <TextField
          variant="outlined"
          error={res.err}
          value={days}
          placeholder="Enter the number of days to boost this post"
          multiline
          fullWidth
          type="number"
          onChange={handleChange}
          className={classes.TextField}
        />
        {days != null && (
          <Typography className={classes.info}>
            you will be charged {days * broadcast.promotionCharge.price}{" "}
            {broadcast.promotionCharge.currency}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading}
          onClick={handleForm}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Send")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(Broadcast);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    [breakpoints.down("sm")]: {
      minWidth: 320,
    },
    minWidth: 450,
  },
  TextField: {
    width: "100%",
  },
  alert: {
    align: "left",
    width: "100%",
    marginBottom: "1rem",
  },
  info: { textAlign: "center", width: "100%", margin: "1rem" },
}));
