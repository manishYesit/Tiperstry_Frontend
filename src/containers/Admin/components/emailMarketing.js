import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import EmailMarketing from "./EmailTemplate";
import { withTranslation } from "../../../../i18n";

import { connect } from "react-redux";

import Axios from "axios";
import { config } from "../../../../config";

const mapStateToProps = (state) => ({
  user: state.user,
});

function EmailMarket({ data, user }) {
  const classes = useStyles();
  const [img, setImg] = useState(null);

  const [base64, setBase64] = useState(null);
  const [value, setValue] = useState({
    subject: "",
    bodyHeader: "",
    body: "",
    callToAction: "",
    caption: "",
    cryptoHeader: "",
    currentCoin: { price: 0, range: 0, coin: "" },
    coins: [],
    authotp: "",
  });

  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    status: "",
  });

  const [loading, setLoading] = React.useState(false);

  const [otp, setOtp] = React.useState(false);

  const getBase64 = (event) => {
    const file = event.target.files[0];
    if (typeof file === "undefined") return;

    setImg(event.target.files[0]);

    let self = this;

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {

    };
  };

  const handleChange = (val) => (event) => {
    event.persist();
    setValue({
      ...value,
      [val]: event.target.value.trim(),
    });
  };

  const addCoin = async () => {
    const price = document.getElementById("price").value;
    const coin = document.getElementById("coin").value;
    const range = document.getElementById("movement").value;

    if (value.coins.length > 4) return;
    if (price == 0 || coin == "" || range == 0) return;

    setValue({
      ...value,
      coins: [
        ...value.coins,
        { coin, range: parseFloat(range), price: parseFloat(price) },
      ],
    });

    document.getElementById("price").value = 0;
    document.getElementById("coin").value = "";
    document.getElementById("movement").value = 0;
  };

  const clearCoin = async () => {
    setValue({
      ...value,
      coins: [],
    });
  };

  const resetState = () => {
    setOtp(false);
    
    clearCoin();
    setValue({
      subject: "",
      bodyHeader: "",
      body: "",
      callToAction: "",
      caption: "",
      cryptoHeader: "",
      currentCoin: { price: 0, range: 0, coin: "" },
      coins: [],
      authotp: "",
    });
  };

  const sendEmailToEveryone = async () => {
    let token = user.token;
    if (user.token == null) {
      token = localStorage.getItem("token");
    }

    if (!otp) {
      const headerData = token ? { "x-auth-token": token } : {};

      const result = await Axios.post(config.sendOtp, { type: 'user' }, {
        headers: headerData,
      });

      if (result.data.status) {
        setOtp(true);
      }

      return;
    }

    setLoading(true);

    const headers = token
      ? { "x-auth-token": token, "Content-Type": "multipart/form-data" }
      : { "Content-Type": "multipart/form-data" };
    const form = new FormData();

    form.append("image", img);
    form.append("subject", value.subject);
    form.append("body", value.body);
    form.append("bodyHeader", value.bodyHeader);
    form.append("caption", value.caption);
    form.append("cryptoHeader", value.cryptoHeader);
    form.append("coins", JSON.stringify(value.coins));
    form.append("otp", value.authotp);

    try {
      const call = await Axios.post(config.sendEmail, form, {
        headers: headers,
      });

      console.log("send email", call.data);
      setRes({
        err: false,
        msg: "Email sent",
        status: "success",
      });
      resetState();
    } catch (error) {
      if (error.response) {
        if (error.response.status == 500) {
          return setRes({
            msg: "server error",
            err: true,
            status: "error",
          });
        }
        console.log(error.response);
        setRes({
          msg: error.response.data,
          err: true,
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

  const sendEmailToAdmin = async () => {
    let token = user.token;
    if (user.token == null) {
      token = localStorage.getItem("token");
    }

    if (!otp) {
      const headerData = token ? { "x-auth-token": token } : {};

      const result = await Axios.post(config.sendOtp, { type: 'admin' }, {
        headers: headerData,
      });

      if (result.data.status) {
        setOtp(true);
      }

      return;
    }

    const headers = token
      ? { "x-auth-token": token, "Content-Type": "multipart/form-data" }
      : { "Content-Type": "multipart/form-data" };
    const form = new FormData();

    form.append("image", img);
    form.append("subject", value.subject);
    form.append("body", value.body);
    form.append("bodyHeader", value.bodyHeader);
    form.append("caption", value.caption);
    form.append("cryptoHeader", value.cryptoHeader);
    form.append("coins", JSON.stringify(value.coins));
    form.append("otp", value.authotp);

    try {
      setLoading(true);

      const call = await Axios.post(config.sendEmailToAdmin, form, {
        headers: headers,
      });

      console.log("send email", call.data);
      setRes({
        err: false,
        msg: "Email sent",
        status: "success",
      });
      resetState();
    } catch (error) {
      console.error("error from send email call", error);
      if (error.response) {
        if (error.response.status == 500) {
          return setRes({
            msg: "server error",
            err: true,
            status: "error",
          });
        }
        console.log(error.response);
        setRes({
          msg: error.response.data,
          err: true,
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

  const preview = () => {
    const htmlPage = document.getElementById("html");

    const email = "the.rela.e";
    const cryptos = value.coins;
    // const cryptos = [
    //   { coin: "dog", price: 3939, range: -1 },
    //   { coin: "eth", price: 3939, range: -1 },
    //   { coin: "btc", price: 3939, range: -1 },
    //   { coin: "doge", price: 3939, range: -1 },
    // ];

    const callToAction = "ANYTHING";

    const emailTemplate = EmailMarketing(
      value.bodyHeader,
      value.body,
      callToAction,
      value.caption,
      value.cryptoHeader,
      base64,
      cryptos,
      email
    );

    htmlPage.innerHTML = emailTemplate;
  };

  return (
    <>
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
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("subject")}
        // onAnimationEnd={handleChange("email")}
        // onInput={handleChange("email")}
        id="subject"
        label={"Subject"}
        name="subject"
        autoComplete="off"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("bodyHeader")}
        // onAnimationEnd={handleChange("email")}
        // onInput={handleChange("email")}
        id="bodyHeader"
        label={"Body Header"}
        name="bodyHeader"
        autoComplete="off"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        multiline={true}
        rows={3}
        required
        fullWidth
        onChange={handleChange("body")}
        // onAnimationEnd={handleChange("body")}
        // onInput={handleChange("body")}
        id="body"
        label={"Email Body"}
        name="body"
        autoComplete="off"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        multiline={true}
        rows={2}
        required
        fullWidth
        onChange={handleChange("caption")}
        // onAnimationEnd={handleChange("body")}
        // onInput={handleChange("body")}
        id="caption"
        label={"image caption"}
        name="caption"
        autoComplete="off"
        autoFocus
      />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        onChange={getBase64}
        type="file"
      />{" "}
      <TextField
        variant="outlined"
        margin="normal"
        multiline={true}
        required
        onChange={handleChange("cryptoHeader")}
        // onAnimationEnd={handleChange("body")}
        // onInput={handleChange("body")}
        id="cryptoHeader"
        label={"crypto heading"}
        name="cryptoHeader"
        autoComplete="off"
        autoFocus
        fullWidth
      />{" "}
      <div className={classes.coins}>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            className={classes.coinItem}
            // onChange={handleCoinChange("coin")}
            // onAnimationEnd={handleChange("email")}
            // onInput={handleChange("email")}
            id="coin"
            label={"coin name"}
            fullWidth
            name="coin"
            autoComplete="off"
            autoFocus
          />
          <TextField
            fullWidth
            variant="outlined"
            className={classes.coinItem}
            margin="normal"
            required
            type="number"
            id="price"
            label={"price"}
            name="price"
            autoComplete="off"
            autoFocus
          />
          <TextField
            variant="outlined"
            className={classes.coinItem}
            fullWidth
            margin="normal"
            required
            type="number"
            // onChange={handleCoinChange("movement")}
            id="movement"
            label={"movement"}
            name="range"
            autoComplete="off"
            autoFocus
          />
        </div>
        <Button
          type="button"
          className={classes.coinItem}
          // fullWidth
          color="primary"
          variant="contained"
          disabled={false}
          onClick={() => addCoin()}
        >
          Add
        </Button>
        <Button
          type="button"
          className={classes.coinItem}
          // fullWidth
          color="outlined"
          // variant="contained"
          disabled={false}
          onClick={() => clearCoin()}
        >
          Clear
        </Button>
      </div>
      {/* Authentication Code */}
      {otp && (
        <>
          <Typography className={classes.text}>OTP sent to admin's personal email.</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="number"
            id="authotp"
            label={"OTP"}
            name="otp"
            autoComplete="off"
            autoFocus
            onChange={handleChange("authotp")}
          />
        </>
      )}
      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          className={classes.button}
          // fullWidth
          variant="contained"
          disabled={false}
          color="primary"
          onClick={() => preview()}
        >
          Preview
        </Button>
        <Button
          className={classes.button}
          type="submit"
          // fullWidth
          variant="contained"
          disabled={false}
          color="primary"
          onClick={() => sendEmailToAdmin()}
        >
          Send To Admin
        </Button>
        <Button
          className={classes.button}
          type="submit"
          // fullWidth
          variant="contained"
          disabled={false}
          color="primary"
          onClick={() => sendEmailToEveryone()}
        >
          Send To Everyone
        </Button>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: 100 / 3 - 1 + "%",
    align: "left",
    // margin: "1rem",
  },
  buttonContainer: {
    marginTop: "1rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    alignContent: "center",
  },
  input: {
    margin: "1rem",
  },
  coins: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "spcae-evenly",
    justifyContent: "space-evenly",
  },
  coinItem: {
    width: 100 / 3.5 + "%",
    margin: "0.5rem",
  },
  alert: {
    align: "left",
    width: "100%",
    margin: "1rem",
  },
  text: {
    color: "red",
    marginTop: "10px",
  },
}));
export default connect(mapStateToProps)(withTranslation()(EmailMarket));
