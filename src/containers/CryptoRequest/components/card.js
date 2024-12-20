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

const Card = ({ cryptorequest, t, i18n }) => {
  const classes = useStyles();
  const [contractaddress, setcontractaddress] = React.useState("");
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    severity: "",
  });

  const token = localStorage.getItem("token");

  const handleContractAddress = (event) => {
    setcontractaddress(event.target.value);
  };

  const handleApproval = async () => {
    try {
      if (contractaddress === "" || !contractaddress) {
        setRes({
          err: true,
          msg: "Contract address is required.",
          severity: "warning",
        });
        return;
      }

      const request = await axios.post(
        config.approvecrypto,
        {
          tokenId: cryptorequest._id,
          contractAddress: contractaddress,
          // withdrawalFee: withdrawalFee,
          approvalStatus: "approved",
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      Router.reload();
    } catch (error) {
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response && error.response.data.message,
        severity: "warning",
      });
      // // console.log("error", error.response);
    }
  };

  const handleDeniedTransaction = async () => {
    try {
      const request = await axios.post(
        config.approvecrypto,
        {
          tokenId: cryptorequest._id,
          contractAddress: contractaddress,
          // withdrawalFee: withdrawalFee,
          approvalStatus: "inactive",
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      Router.reload();
    } catch (error) {
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response && error.response.data.message,
        severity: "warning",
      });
      // // console.log("error", error.response);
    }
  };

  return (
    <Grid item xs={12} sm={12} md={4}>
      <Paper
        className={classes.root}
        // style={{ backgroundColor: colorTags[withdraw.walletType] }}
      >
        <div className={classes.list}>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1">{cryptorequest.tokenName}</Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Ticker:</Typography>
          <Typography
            variant="body1"
            color="primary"
            component="a"
            // href={"/p/" + withdraw.userId.}
            target="_blank"
          >
            {cryptorequest.ticker}
          </Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Owner:</Typography>
          <Typography variant="body1">
            {cryptorequest.owner.username}
          </Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Group:</Typography>
          <Typography variant="body1">{cryptorequest.groupId.name}</Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Network:</Typography>
          <Typography variant="body1">{cryptorequest.networkId ? cryptorequest.networkId : 'NA'}</Typography>
        </div>
        <div className={classes.list}>
          <Typography variant="h6">Token Supply:</Typography>
          <Typography variant="body1">{cryptorequest.tokenSupply}</Typography>
        </div>

        <div className={classes.list}>
          <Typography variant="h6">Date:</Typography>
          <Typography variant="body1">
            {moment(cryptorequest.createdAt)
              .locale(
                typeof i18n.language !== "undefined" ? i18n.language : "en"
              )
              .format("DD MMM YYYY")}
          </Typography>
        </div>

        {/* <Button
          color="primary"
          target="_blank"
          href={"/transactions/" + withdraw.userId.username}
        >
          View @{withdraw.userId.username} Transaction History
        </Button> */}

        {res.err && <Alert severity={res.severity}>{res.msg}</Alert>}

        <TextField
          id="outlined-basic"
          fullWidth
          onChange={handleContractAddress}
          label="Contract Address"
          variant="outlined"
          className={classes.textField}
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
  textField: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));
