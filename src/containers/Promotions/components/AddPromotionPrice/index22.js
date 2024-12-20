import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  setPromotionCharge,
  togglePromotionPriceModal,
} from "../../../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { config } from "../../../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "../../../../../i18n";
import { responsiveFontSizes } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPromotionPrice = ({ t }) => {
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

  const [localState, setLocalState] = React.useState({
    price: broadcast.promotionCharge.price,
    currency: broadcast.promotionCharge.currency,
  });
  

  React.useEffect(() => {
    // getPromotionCharge();
  }, []);

  const getPromotionCharge = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(config.promotionCharge, {
        headers: { "x-auth-token": token },
      });

      dispatch(setPromotionCharge(response.data.payload));
      setLocalState({
        price: response.data.payload.price,
        currency: response.data.payload.currency,
      });
    } catch (error) {
      console.log(error);
    }
    // }
  };
  const handleForm = async () => {
    // return;
    setLoading(true);
    const data = {
      price: localState.price,
      currency: localState.currency,
    };
    try {
      const response = await axios.post(config.promotionCharge, data, {
        headers: { "x-auth-token": token },
      });

      setRes({
        err: false,
        msg: "price updated successfully",
        status: "success",
      });

      dispatch(setPromotionCharge());
    } catch (error) {
      console.log(error.response.data);
      setRes({
        msg: error.response.data.message,
        err: !error.response.data.success,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    // setDays(event.target.value);
    setLocalState({
      ...localState,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    dispatch(togglePromotionPriceModal());
  };

  return (
    <Dialog
      open={broadcast.openPromotionPrice}
      maxWidth="md"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Update Promotion Price
      </DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        {res.status == "success" && (
          <Alert severity="success" className={classes.alert}>
            {res.msg}
          </Alert>
        )}
        <TextField
          variant="outlined"
          error={res.err}
          value={localState.price}
          name="price"
          placeholder="enter price"
          fullWidth
          type="number"
          onChange={handleChange}
          className={classes.TextField}
        />
        <TextField
          variant="outlined"
          error={res.err}
          value={localState.currency}
          name="currency"
          placeholder="enter currency type"
          fullWidth
          type="text"
          onChange={handleChange}
          className={classes.TextField}
        />
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

export default withTranslation(AddPromotionPrice);

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
    marginTop: ".5rem",
  },
  alert: {
    align: "left",
    width: "100%",
    marginBottom: "1rem",
  },
}));
