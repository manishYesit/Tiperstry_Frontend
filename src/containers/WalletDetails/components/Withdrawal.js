import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { toggleGift, setUserData, getCryptos } from "../../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { config } from "../../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withTranslation } from "../../../../i18n";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gift: state.gift,
    cryptos: state.cryptos.cryptos.filter((a) => a.status == "approved"),
  };
};

const mapDispatchToProps = {
  toggleGift,
  setUserData,
  getCryptos,
};

const nameIcon = {
  dogecoin: "/static/tipcoins/doge.svg",
  superdog: "/static/tipcoins/superdog.png",
  bitcoin: "/static/tipcoins/bit.svg",
  ethcoin: "/static/tipcoins/eth.svg",
  ethtipcoin: "/static/tipcoins/tip-small.png",
  ethtipc: "/static/tipcoins/tipc-small.png",
  ethxrtcoin: "/static/tipcoins/xrt-small.png",
  ye: "/static/tipcoins/ye.png",
  joe: "/static/tipcoins/joe.png",
  pres: "/static/tipcoins/pres.png",
  dogecoincash: "/static/tipcoins/dogecoincash-small.png",
};

const GiftModal = ({ open, handleClose, user, setUserData, t, cryptos }) => {
  const classes = useStyles();
  const [coin, setCoin] = useState("bitcoin");
  const [otherCoin, setOtherCoin] = useState(null);
  const [showGroupCrypto, setShowGroupCrypto] = useState(false);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    amount: 0,
    address: "",
  });
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });
  let clearT = null;

  useEffect(() => {
    getCryptos();
    return () => {
      clearTimeout(clearT);
    };
  }, []);

  const isAGroupToken = (ticker) => {
    return cryptos.find((a) => a.ticker == ticker);
  };

  const handleWithdrawal = async () => {
    try {
      if (value.amount <= 0) {
        setRes({
          err: true,
          msg: "Amount must be greater than zero",
          status: "warning",
        });
        return;
      }

      if (!Number.isInteger(Number.parseFloat(value.amount))) {
        setRes({
          err: true,
          msg: "Fractions are not allowed ",
          status: "warning",
        });
        return;
      }

      const minAmount = {
        dogecoin: 100,
        ethtipc: 200,
        ethxrtcoin: 200,
        ethcoin: 200,
        ye: 200,
        joe: 200,
        pres: 200,
        pom: 1000000,
        dogecoincash: 100,
      };

      if (minAmount[coin]) {
        if (value.amount < minAmount[coin]) {
          setRes({
            err: true,
            msg: "The Minimum withdrawable amount is " + minAmount[coin],
            status: "warning",
          });
          return;
        }
      } else if (isAGroupToken(coin)) {
        if (value.amount < isAGroupToken(coin).minWithdrawalAmount) {
          setRes({
            err: true,
            msg:
              "The Minimum withdrawable amount is " +
              isAGroupToken(coin).minWithdrawalAmount,
            status: "warning",
          });
          return;
        }
      }

      if (value.address === "") {
        setRes({
          err: true,
          msg: "Address is required.",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      let trans = "";

      if (isAGroupToken(coin)) {
        trans = await axios.post(
          config.withdrawal,
          {
            ...value,
            coin: "others",
            groupWalletType: isAGroupToken(coin)._id,
          },
          { headers: { "x-auth-token": user.token } }
        );
      } else {
        trans = await axios.post(
          config.withdrawal,
          { ...value, coin },
          { headers: { "x-auth-token": user.token } }
        );
      }

      // console.log("trans", trans);

      const userDeatils = await axios.get(config.me, {
        headers: { "x-auth-token": user.token },
      });

      setUserData(userDeatils.data);
      sessionStorage.setItem("userData", userDeatils.data);

      setLoading(false);

      clearT = setTimeout(() => {
        handleClose();
      }, 5000);

      setRes({
        err: true,
        msg: trans.data,
        status: "success",
      });
      // Router.reload();
    } catch (error) {
      setLoading(false);
      // console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const renderBalance = () => {
    switch (coin) {
      case "dogecoin":
        return user.user.doge.balance;
      case "superdog":
        return (user.user.pom && user.user.pom.balance) || 0;
      case "bitcoin":
        return user.user.btc.balance;
      case "ethcoin":
        return user.user.eth.ethApiBalance;
      case "ethtipcoin":
        return user.user.eth.tipcoinApiBalance;
      case "ethxrtcoin":
        return user.user.eth.xrtApiBalance;
      case "ethtipc":
        return user.user.eth.tipccoinApiBalance;
      case "dogecoincash":
        return user.user.eth.dogecoincashApiBalance;
      case "ye":
        return user.user.ye.balance;
      case "joe":
        return user.user.joe.balance;
      case "pres":
        return user.user.pres.balance;
      default:
        const balance = user.user.groupWallets.find((a) => a.tokenName == coin);
        return balance ? balance.balance : 0;
    }
  };

  const handleValue = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value.trim() });
  };

  const displayAlert = () => {
    return (
      <div>
        {coin === "bitcoin" && value.amount >= 0.099 && (
          <Typography
            style={{
              color: "red",
              fontSize: 12,
              padding: "10px 0px",
            }}
          >
            {t("Withdraw of")}{" "}
            <strong style={{ textTransform: "uppercase" }}>&nbsp;{coin}</strong>{" "}
            {t("greater than")}{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {coin === "bitcoin" ? 0.099 : 500}
            </strong>{" "}
            {t("would be subject to review and approval of admin")}
          </Typography>
        )}

        {coin === "dogecoin" && value.amount >= 500 && (
          <Typography
            style={{
              color: "red",
              fontSize: 12,
              padding: "10px 0px",
            }}
          >
            {t("Withdraw of")}{" "}
            <strong style={{ textTransform: "uppercase" }}>&nbsp;{coin}</strong>{" "}
            {t("greater than")}{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {coin === "bitcoin" ? 0.099 : 500}
            </strong>{" "}
            {t("would be subject to review and approval of admin")}
          </Typography>
        )}

        {coin === "ethtipc" && value.amount >= 500 && (
          <Typography
            style={{
              color: "red",
              fontSize: 12,
              padding: "10px 0px",
            }}
          >
            {t("Withdraw of")}{" "}
            <strong style={{ textTransform: "uppercase" }}>
              &nbsp; tipcoin
            </strong>{" "}
            {t("greater than")}{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {coin === "ethtipc" ? 100 : 500}
            </strong>{" "}
            {t("would be subject to review and approval of admin")}
          </Typography>
        )}
        {(coin === "pres" || coin === "joe" || coin === "ye") &&
          value.amount >= 100 && (
            <Typography
              style={{
                color: "red",
                fontSize: 12,
                padding: "10px 0px",
              }}
            >
              {t("Withdraw of")}{" "}
              <strong style={{ textTransform: "uppercase" }}>
                &nbsp; tipcoin
              </strong>{" "}
              {t("greater than")}{" "}
              <strong style={{ textTransform: "uppercase" }}>100</strong>{" "}
              {t("would be subject to review and approval of admin")}
            </Typography>
          )}
      </div>
    );
  };

  const displayWarning = () => {
    return (
      <div>
        <Typography
          style={{
            color: "red",
            fontSize: 12,
            padding: "10px 0px",
          }}
        >
          {coin === "dogecoincash" || coin === "superdog"
            ? t(
              "Enter a BNB Smart Chain (BEP-20) address to withdraw Dogecoin Cash. "
            )
            : null}
          <br />
          {t("Cannot withdraw funds without")}
          <strong>
            &nbsp;{t("Network fee of")} &nbsp;
            {coin === "bitcoin"
              ? 0.0005
              : coin === "superdog"
                ? 100000
                : isAGroupToken(coin)
                  ? 10
                  : 10}
            <strong style={{ textTransform: "uppercase" }}>
              &nbsp;{isAGroupToken(coin) ? "DOG" : coin}.
            </strong>
          </strong>{" "}
          <br />
          {isAGroupToken(coin) && otherCoin.networkId
            ? t("Enter a " + (otherCoin.networkId ? otherCoin.networkId : 'BNB Smart Chain (BEP-20)') + " address.")
            : null}
          <br />
          {isAGroupToken(coin)
            ? t("A 5% token fee and 10 DOG is charged on each withdrawal.")
            : null}{" "}
          <br />
          &nbsp;{t("Maximum withdrawable balance is")}{" "}
          {coin === "bitcoin"
            ? renderBalance() - 0.0005
            : coin === "dogecoin"
              ? renderBalance() - 2
              : coin === "superdog"
                ? renderBalance() - 100000
                : isAGroupToken(coin)
                  ? renderBalance() - isAGroupToken(coin).minWithdrawalAmount
                  : renderBalance() - 2}
          <strong style={{ textTransform: "uppercase" }}>&nbsp;{coin}</strong>
          <br />
          {t(". Withdrawals must be made within 6 months of receiving a tip.")}
        </Typography>
        {/* <Typography
          style={{
            color: "red",
            fontSize: 12,
            padding: "10px 0px",
          }}
        ></Typography> */}
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{t("Withdrawal")}</DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <Grid container spacing={4} justify="space-between" alignItems="center">
          <Grid item sm={7}>
            <div>
              <div className={classes.header}>
                <Typography>{t("Choose Currency")}</Typography>

                <div className={classes.balance}>
                  <img
                    src={
                      nameIcon[coin]
                        ? nameIcon[coin]
                        : config.getImage + otherCoin.icon
                    }
                    className={classes.balanceImg}
                  />
                  <Typography>{renderBalance()}</Typography>
                </div>
              </div>
              <div className={classes.iconRoot}>
                {(showGroupCrypto || user.user.btc.balance > 0) && (
                  <img
                    src="/static/tipcoins/bit.svg"
                    alt="btc"
                    onClick={() => setCoin("bitcoin")}
                    className={clsx(
                      classes.img,
                      coin === "bitcoin" && classes.selected
                    )}
                  />
                )}

                {(showGroupCrypto || user.user.doge.balance > 0) && (
                  <img
                    src="/static/tipcoins/doge.svg"
                    alt="doge"
                    onClick={() => setCoin("dogecoin")}
                    className={clsx(
                      classes.img,
                      coin === "dogecoin" && classes.selected
                    )}
                  />
                )}
                {(showGroupCrypto || user.user.pom.balance > 0) && (
                  <img
                    src="/static/tipcoins/superdog.png"
                    alt="superdog"
                    onClick={() => setCoin("superdog")}
                    className={clsx(
                      classes.img,
                      coin === "superdog" && classes.selected
                    )}
                  />
                )}

                {(showGroupCrypto || user.user.eth.ethApiBalance > 0) && (
                  <img
                    src="/static/tipcoins/eth.svg"
                    onClick={() => setCoin("ethcoin")}
                    alt="tipcoin"
                    className={clsx(
                      classes.img,
                      coin === "ethcoin" && classes.selected
                    )}
                  />
                )}

                {(showGroupCrypto ||
                  user.user.eth.dogecoincashApiBalance > 0) && (
                    <img
                      src="/static/tipcoins/dogecoincash-small.png"
                      alt="dogecoincash"
                      onClick={() => setCoin("dogecoincash")}
                      className={clsx(
                        classes.img,
                        coin === "dogecoincash" && classes.selected
                      )}
                    />
                  )}

                {(showGroupCrypto || user.user.pres.balance > 0) && (
                  <img
                    src="/static/tipcoins/pres.png"
                    onClick={() => setCoin("pres")}
                    alt="pres"
                    className={clsx(
                      classes.img,
                      coin === "pres" && classes.selected
                    )}
                  />
                )}

                {(showGroupCrypto || user.user.ye.balance > 0) && (
                  <img
                    src="/static/tipcoins/ye.png"
                    onClick={() => setCoin("ye")}
                    alt="ye"
                    className={clsx(
                      classes.img,
                      coin === "ye" && classes.selected
                    )}
                  />
                )}
                {(showGroupCrypto || user.user.joe.balance > 0) && (
                  <img
                    src="/static/tipcoins/joe.png"
                    onClick={() => setCoin("joe")}
                    alt="joe"
                    className={clsx(
                      classes.img,
                      coin === "joe" && classes.selected
                    )}
                  />
                )}
                {/* <img
                  src="/static/tipcoins/tip-small.png"
                  alt="tipcoin"
                  onClick={() => setCoin("ethtipcoin")}
                  className={clsx(
                    classes.img,
                    coin === "ethtipcoin" && classes.selected
                  )}
                /> */}
                {(showGroupCrypto || user.user.joe.balance > 0) && (
                  <img
                    src="/static/tipcoins/tipc-small.png"
                    alt="tipcoin"
                    onClick={() => setCoin("ethtipc")}
                    className={clsx(
                      classes.img,
                      coin === "ethtipc" && classes.selected
                    )}
                  />
                )}
                {cryptos &&
                  cryptos.length > 0 &&
                  // showGroupCrypto &&
                  cryptos.map((crypto) => {
                    const balance = user.user.groupWallets.find(
                      (a) => a.tokenName == crypto.ticker
                    );
                    if (!balance || (balance && balance.balance == 0)) {
                      if (showGroupCrypto) {
                        return (
                          <img
                            src={config.getImage + crypto.icon}
                            alt="tipcoin"
                            onClick={() => {
                              setCoin(crypto.ticker);
                              setOtherCoin(crypto);
                            }}
                            className={clsx(
                              classes.img,
                              coin === "ethtipc" && classes.selected
                            )}
                          />
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return (
                        <img
                          src={config.getImage + crypto.icon}
                          alt="tipcoin"
                          onClick={() => {
                            setCoin(crypto.ticker);
                            setOtherCoin(crypto);
                          }}
                          className={clsx(
                            classes.img,
                            coin === "ethtipc" && classes.selected
                          )}
                        />
                      );
                    }
                  })}
                <Button
                  onClick={() => setShowGroupCrypto(!showGroupCrypto)}
                  color="default"
                  variant="outlined"
                  style={{ padding: 0 }}
                >
                  {!showGroupCrypto ? t("More") : t("Hide")}
                </Button>
              </div>
            </div>
            <Divider />

            {displayAlert()}

            {displayWarning()}

            <TextField
              label={t("Amount")}
              fullWidth
              className={classes.margin}
              autoFocus={true}
              onChange={handleValue("amount")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={
                        nameIcon[coin]
                          ? nameIcon[coin]
                          : config.getImage + otherCoin.icon
                      }
                      alt="doge"
                      style={{ width: 15, height: 15 }}
                    />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              label={
                coin === "bitcoin"
                  ? t("Bitcoin Wallet Address")
                  : coin === "ethcoin"
                    ? t("Ethereum Wallet Address")
                    : coin === "dogecoin"
                      ? t("Dogecoin Wallet Address")
                      : coin === "dogecoincash"
                        ? t("Binance Smart Chain Address")
                        : coin === "pres" ||
                          coin === "joe" ||
                          coin === "ye" ||
                          coin === "superdog"
                          ? t("Omni Wallet Address")
                          : t("Wallet Address")
              }
              className={classes.margin}
              fullWidth
              onChange={handleValue("address")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">xyz</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={5}>
            <img
              src="/static/icons/colormoneybag.svg"
              className={classes.icon}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          color="default"
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading}
          onClick={handleWithdrawal}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("CASH OUT")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  iconRoot: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
  },
  img: {
    border: "1px solid darkgray",
    width: 35,
    height: 35,
    margin: 5,
    borderRadius: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#50557b",
    },
  },
  selected: {
    backgroundColor: "#50557b",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balance: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  balanceImg: {
    width: 15,
  },
  icon: {
    width: 150,
    height: 150,
    marginTop: "20%",
  },
  margin: {
    margin: spacing(1, 0),
  },
}));

const AmountInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 30,
    height: 50,
    width: 120,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(GiftModal));
