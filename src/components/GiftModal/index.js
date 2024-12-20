import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { toggleGift, setUserData } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { config } from "../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";
import { withTranslation } from "../../../i18n";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gift: state.gift,
  };
};

const mapDispatchToProps = {
  toggleGift,
  setUserData,
};

const nameIcon = {
  dogecoin: "/static/tipcoins/doge.svg",
  superdog: "/static/tipcoins/superdog.png",
  bitcoin: "/static/tipcoins/bit.svg",
  ethcoin: "/static/tipcoins/eth.svg",
  // ethtipcoin: "/static/tipcoins/tip-small.png",
  ethtipc: "/static/tipcoins/tipc-small.png",
  ethxrtcoin: "/static/tipcoins/xrt-small.png",
  ye: "/static/tipcoins/ye.png",
  pres: "/static/tipcoins/pres.png",
  joe: "/static/tipcoins/joe.png",
  dogecoincash: "/static/tipcoins/dogecoincash-small.png",
};

const GiftModal = ({ gift, toggleGift, user, setUserData, t }) => {
  const classes = useStyles();
  const [coin, setCoin] = useState("bitcoin");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showGroupCrypto, setShowGroupCrypto] = useState(0);
  const [otherCoin, setOtherCoin] = useState(null);
  const [cryptos, setCryptos] = useState(null);

  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });

  const getCryptos = async () => {
    try {
      const lcryptos = await axios.get(config.crypto + "?status=approved");
      const activeCryptos = lcryptos.data.data.filter(
        (a) => a.status == "approved"
      );

      setCryptos(activeCryptos);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSiteGift = async () => {
    try {
      if (amount <= 0) {
        setRes({
          err: true,
          msg: "amount must be greater than zero",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      if (!nameIcon[coin]) {
        const trans = await axios.post(
          config.tipSite,
          {
            amount,
            coin: "others",
            siteId: gift.elementId,
            tokenId: otherCoin._id,
          },
          { headers: { "x-auth-token": user.token } }
        );
      } else {
        const trans = await axios.post(
          config.tipSite,
          { amount, coin, siteId: gift.elementId },
          { headers: { "x-auth-token": user.token } }
        );
      }

      const userDeatils = await axios.get(config.me, {
        headers: { "x-auth-token": user.token },
      });

      setUserData(userDeatils.data);
      sessionStorage.setItem("userData", userDeatils.data);

      setLoading(false);
      setAmount(0);

      toggleGift();

      Router.reload();
    } catch (error) {
      setLoading(false);
      
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleTopicGift = async () => {
    try {
      if (amount <= 0) {
        setRes({
          err: true,
          msg: "amount must be greater than zero",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      if (!nameIcon[coin]) {
        const trans = await axios.post(
          config.tipPost,
          {
            amount,
            coin: "others",
            topicId: gift.elementId,
            tokenId: otherCoin._id,
          },
          { headers: { "x-auth-token": user.token } }
        );
      } else {
        const trans = await axios.post(
          config.tipPost,
          { amount, coin, topicId: gift.elementId },
          { headers: { "x-auth-token": user.token } }
        );
      }

      const userDeatils = await axios.get(config.me, {
        headers: { "x-auth-token": user.token },
      });

      setUserData(userDeatils.data);
      sessionStorage.setItem("userData", userDeatils.data);

      setLoading(false);
      setAmount(0);

      toggleGift();

      Router.reload();
    } catch (error) {
      setLoading(false);
      
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleCommentGift = async () => {
    try {
      if (amount <= 0) {
        setRes({
          err: true,
          msg: "amount must be greater than zero",
          status: "warning",
        });
        return;
      }

      if (!nameIcon[coin]) {
        const trans = await axios.post(
          config.tipComment,
          {
            amount,
            coin: "others",
            commentId: gift.elementId,
            tokenId: otherCoin._id,
          },
          { headers: { "x-auth-token": user.token } }
        );
      } else {
        const trans = await axios.post(
          config.tipComment,
          { amount, coin, commentId: gift.elementId },
          { headers: { "x-auth-token": user.token } }
        );
      }

      setLoading(true);

      const userDeatils = await axios.get(config.me, {
        headers: { "x-auth-token": user.token },
      });

      setUserData(userDeatils.data);
      sessionStorage.setItem("userData", userDeatils.data);

      setLoading(false);
      setAmount(0);

      toggleGift();

      Router.reload();
    } catch (error) {
      setLoading(false);
      
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleGift = async () => {
    if (gift.type === "topic") {
      handleTopicGift();
    } else if (gift.type == "site") {
      handleSiteGift();
    } else {
      handleCommentGift();
    }
  };

  useEffect(() => {
    getCryptos();

    return () => {};
  }, []);

  const renderBalance = () => {
    switch (coin) {
      case "dogecoin":
        return user.user.doge.balance;
      case "superdog":
        return user.user.pom.balance;
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
      case "pres":
        return user.user.pres.balance;
      case "joe":
        return user.user.joe.balance;
      default:
        // return user.user[coin] != null ? user.user[coin].balance : 0;
        const balance = user.user.groupWallets.find((a) => a.tokenName == coin);
        return balance ? balance.balance : 0;
    }
  };

  const handleAmount = (event) => {
    setAmount(event.target.value.trim());
  };

  return (
    <Dialog
      open={gift.open}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => toggleGift()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{t("Gift")}</DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <div>
          <div className={classes.header}>
            <div>
              <Typography>{t("Choose Currency")}</Typography>
              {amount > 0 && (
                <Typography variant="small" className={classes.error}>
                  {t("Fee of 5% will be deducted from the tip.")}
                  <br /> User will get{" "}
                  <b>{`${amount - amount * (5 / 100)} ${coin}`}</b>
                </Typography>
              )}
            </div>
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
            <img
              src="/static/tipcoins/bit.svg"
              alt="btc"
              onClick={() => setCoin("bitcoin")}
              className={clsx(
                classes.img,
                coin === "bitcoin" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/doge.svg"
              alt="doge"
              onClick={() => setCoin("dogecoin")}
              className={clsx(
                classes.img,
                coin === "dogecoin" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/superdog.png"
              alt="superdog"
              onClick={() => setCoin("superdog")}
              className={clsx(
                classes.img,
                coin === "superdog" && classes.selected
              )}
            />

            <img
              src="/static/tipcoins/pres.png"
              alt="pres"
              onClick={() => setCoin("pres")}
              className={clsx(classes.img, coin === "pres" && classes.selected)}
            />

            <img
              src="/static/tipcoins/joe.png"
              alt="joe"
              onClick={() => setCoin("joe")}
              className={clsx(classes.img, coin === "joe" && classes.selected)}
            />

            <img
              src="/static/tipcoins/ye.png"
              alt="ye"
              onClick={() => setCoin("ye")}
              className={clsx(classes.img, coin === "ye" && classes.selected)}
            />
            <img
              src="/static/tipcoins/dogecoincash-small.png"
              alt="dogecoincash"
              onClick={() => setCoin("dogecoincash")}
              className={clsx(
                classes.img,
                coin === "dogecoincash" && classes.selected
              )}
            />
            {user.user.isAdmin && (
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
            {user.user.isAdmin && (
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

            {/* { user.user.isAdmin && <img
                src="/static/tipcoins/tipc-small.png"
                alt="tipcoin"
                onClick={() => setCoin("ethtipcoin")}
                className={clsx(
                  classes.img,
                  coin === "ethtipcoin" && classes.selected
                )}
              />
            } */}

            {user.user.isAdmin && (
              <img
                src="/static/tipcoins/xrt-small.png"
                alt="tipcoin"
                onClick={() => setCoin("ethxrtcoin")}
                className={clsx(
                  classes.img,
                  coin === "ethxrtcoin" && classes.selected
                )}
              />
            )}
            {cryptos &&
              cryptos.length > 0 &&
              showGroupCrypto &&
              cryptos.map((crypto) => {
                return (
                  <img
                    src={config.getImage + crypto.icon}
                    onClick={() => {
                      setCoin(crypto.ticker);
                      setOtherCoin(crypto);
                    }}
                    alt={crypto.tokenName}
                    className={clsx(
                      classes.img,
                      coin === "ethcoin" && classes.selected
                    )}
                  />
                );
              })}
          </div>

          <Button
            onClick={() => setShowGroupCrypto(!showGroupCrypto)}
            color="default"
            variant="outlined"
          >
            {!showGroupCrypto ? t("More") : t("Hide")}
          </Button>
        </div>
        <Divider />

        {/* 
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> 
        */}

        <AmountInput
          className={classes.margin}
          autoFocus={true}
          onChange={handleAmount}
          value={amount}
          label="Custom CSS"
          variant="outlined"
          id="custom-css-outlined-input"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleGift()} color="default" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading}
          onClick={handleGift}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Gift")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  iconRoot: {
    display: "flex",
    justifyContent: "space-between",
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
