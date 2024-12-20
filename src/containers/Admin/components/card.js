import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import Router from "next/router";
import axios from "axios";
import { config } from "../../../../config";
import { withTranslation } from "../../../../i18n";

const Card = ({ withdraw, t, i18n }) => {
  const classes = useStyles();
  const [hash, setHash] = React.useState("");
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    severity: "",
  });

  const colorTags = {
    dogecoin: "#e3eabf",
    superdog: "#f99e4c",
    ethtipc: "#a5b0ff",
    ethxrtcoin: "#69ff82",
    ethcoin: "mediumpurple",
    ye: "cyan",
    joe: "#ffffff",
    pres: "orange",
    dogecoincash: "#bfeabf",
  };

  const token = localStorage.getItem("token");

  const handleHash = (event) => {
    setHash(event.target.value);
  };

  const handleApproval = async () => {
    try {
      if (hash === "") {
        setRes({
          err: true,
          msg: "Transaction Hash is required.",
          severity: "warning",
        });
        return;
      }

      const request = await axios.put(
        config.approve + "/" + withdraw._id,
        { txHash: hash },
        {
          headers: { "x-auth-token": token },
        }
      );

      Router.reload();
    } catch (error) {
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  const handleDeniedTransaction = async () => {
    try {
      const request = await axios.put(
        config.denied + "/" + withdraw._id,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      Router.reload();
    } catch (error) {
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  return (
    <Grid item xs={12} sm={12} md={4}>
      <Paper
        className={classes.root}
        style={{ backgroundColor: colorTags[withdraw.walletType] }}
      >
        <div className={classes.list}>
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body1">{withdraw.userId.email}</Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Username:</Typography>
          <Typography
            variant="body1"
            color="primary"
            component="a"
            href={"/p/" + withdraw.userId.username}
            target="_blank"
          >
            @{withdraw.userId.username}
          </Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Coin:</Typography>
          <Typography variant="body1">
            {withdraw.walletType != "others"
              ? withdraw.walletType
              : withdraw.groupWalletType.tokenName}
          </Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Amount:</Typography>
          <Typography variant="body1">
            {parseFloat(withdraw.amount) - parseFloat(withdraw.networkFee)}
          </Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Address:</Typography>
          <Typography variant="body1">{withdraw.address}</Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Date:</Typography>
          <Typography variant="body1">
            {moment(withdraw.createdAt)
              .locale(
                typeof i18n.language !== "undefined" ? i18n.language : "en"
              )
              .format("DD MMM YYYY")}
          </Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">IP:</Typography>
          <Typography variant="body1">{withdraw.clientIp || "N/A"}</Typography>
        </div>
        <Button
          color="primary"
          target="_blank"
          href={"/transactions/" + withdraw.userId.username}
        >
          View @{withdraw.userId.username} Transaction History
        </Button>

        {res.err && <Alert severity={res.severity}>{res.msg}</Alert>}

        <TextField
          id="outlined-basic"
          fullWidth
          onChange={handleHash}
          label="TX HASH"
          variant="outlined"
        />

        <div className={classes.buttonRoot}>
          <Button onClick={handleDeniedTransaction}>Cancel</Button>
          <Button variant="outlined" color="primary" onClick={handleApproval}>
            Approve
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default withTranslation()(Card);

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    margin: "10px 10px 0px 0px",
    padding: "2em",
    boxSizing: "content-box",
  },
  list: {
    display: "flex",
    justifyContent: "flex-start",
    // alignItems: "center"
  },
  buttonRoot: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));
