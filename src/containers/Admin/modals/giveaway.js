import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { config } from "../../../../config";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
import { withTranslation } from "../../../../i18n";

const mapStateToProps = (state) => ({
  user: state.user,
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GiveAway = ({
  user,
  handleClose,
  data,
  disabled,
  i18n,
  t,
  open,
  title,
}) => {
  const classes = useStyles();
  const [val, setVal] = useState({
    startDate: new Date().toJSON().split("T")[0],
    commentPoolAmountDogecoin: 0,
    postPoolAmountDogecoin: 0,
    commentPoolAmountDogecoinCash: 0,
    postPoolAmountDogecoinCash: 0,
    disabled: false,
  });

  const [loading, setLoading] = useState(false);
  const [res, setRes] = React.useState({
    msg: "",
    err: false,
    status: "",
  });

  React.useEffect(() => {
    setVal(data);
  });

  const handleChange = (event) => {
    val[event.target.name] = event.target.value;
    setVal({
      startDate: new Date().toJSON().split("T")[0],
      commentPoolAmountDogecoin: 0,
      postPoolAmountDogecoin: 0,
      commentPoolAmountDogecoinCash: 0,
      postPoolAmountDogecoinCash: 0,
      disabled: false,
    });
    console.log(val);
  };

  const handleSave = async () => {
    try {
      if (val.startDate === "") {
        setRes({
          err: true,
          msg: "Start Date is required",
          status: "warning",
        });
        return;
      }
      if (!val.postPoolAmountDogecoin || val.postPoolAmountDogecoin === "") {
        setRes({
          err: true,
          msg: "Dogecoin Post Pool amount is required",
          status: "warning",
        });
        return;
      }
      if (
        !val.postPoolAmountDogecoinCash ||
        val.postPoolAmountDogecoinCash === ""
      ) {
        setRes({
          err: true,
          msg: "Dogecoin Cash Post Pool amount is required",
          status: "warning",
        });
        return;
      }
      if (
        !val.commentPoolAmountDogecoin ||
        val.commentPoolAmountDogecoin === ""
      ) {
        setRes({
          err: true,
          msg: "DogeCoin Comment Pool Amount is required",
          status: "warning",
        });
        return;
      }
      if (
        !val.commentPoolAmountDogecoinCash ||
        val.commentPoolAmountDogecoinCash === ""
      ) {
        setRes({
          err: true,
          msg: "DogeCoin Cash Comment Pool Amount is required",
          status: "warning",
        });
        return;
      }
      setLoading(true);
      const headers = user.token ? { "x-auth-token": user.token } : {};

      const res1 = axios.post(
        config.giveaway,
        {
          title: val.title,
          startDate: val.startDate,
          endDate: val.endDate,
          commentPoolAmount: parseFloat(val.commentPoolAmountDogecoin),
          postPoolAmount: parseFloat(val.postPoolAmountDogecoin),
          coinType: "dogecoin",
        },
        {
          headers,
        }
      );

      const res2 = axios.post(
        config.giveaway,
        {
          title: val.title,
          startDate: val.startDate,
          endDate: val.endDate,
          commentPoolAmount: parseFloat(val.commentPoolAmountDogecoinCash),
          postPoolAmount: parseFloat(val.postPoolAmountDogecoinCash),
          coinType: "dogecoincash",
        },
        {
          headers,
        }
      );

      const all = await Promise.all([res1, res2]);

      if (all.some((res) => res.data.success == true)) {
        setLoading(false);
        handleClose();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog
      title={title}
      open={open}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <h3
        id="alert-dialog-slide-title"
        style={{ padding: "5px 1.4rem", fontWeight: "normal" }}
      >
        {title}
      </h3>
      <DialogContent className={classes.content}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <form className={classes.root} noValidate>
          <TextField
            id="outlined-basic 1"
            value={val.commentPoolAmountDogecoin}
            fullWidth
            disabled={disabled}
            name="commentPoolAmountDogecoin"
            label="Current Comments Pool Amount (Dogecoin)"
            className={classes.textField}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            type="number"
          />
          <TextField
            id="outlined-basic 2"
            value={val.postPoolAmountDogecoin}
            fullWidth
            disabled={disabled}
            label="Current Post Pool Amount (Dogecoin)"
            className={classes.textField}
            name="postPoolAmountDogecoin"
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            type="number"
          />
          <TextField
            id="outlined-basic 3"
            value={val.commentPoolAmountDogecoinCash}
            fullWidth
            disabled={disabled}
            label="Current Comment Pool Amount (Dogecoin Cash)"
            className={classes.textField}
            name="commentPoolAmountDogecoinCash"
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            type="number"
          />
          <TextField
            id="outlined-basic 4"
            value={val.postPoolAmountDogecoinCash}
            fullWidth
            disabled={disabled}
            label="Current Post Pool Amount (Dogecoin Cash)"
            className={classes.textField}
            name="postPoolAmountDogecoinCash"
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            type="number"
          />

          <TextField
            id="date"
            label="Pool Start Date"
            type="date"
            name="startDate"
            defaultValue={val.startDate}
            className={classes.textField}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading}
          onClick={handleSave}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Update")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

GiveAway.defaultProps = {
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    minWidth: 400,
  },
  textField: {
    marginBottom: 25,
  },
}));

export default connect(mapStateToProps)(withTranslation()(GiveAway));
