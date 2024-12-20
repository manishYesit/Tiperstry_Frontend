import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Withdrawal from "./Withdrawal";
import { withTranslation } from "../../../../i18n";
import { connect, useDispatch } from "react-redux";
import { getCryptos } from "../../../store/actions";
import { config } from "../../../../config";
import { useRadioGroup } from "@material-ui/core";

const CoinCard = ({ pom, btc, doge, eth, ye, pres, joe, t, user, cryptos }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showCoin, setshowCoin] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpenWithdrawal = () => {
    setOpen(true);
  };

  console.log(cryptos);

  useEffect(() => {
    dispatch(getCryptos());
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h6">{t("Coin Details")}</Typography>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setshowCoin(!showCoin)}
        >
          {!showCoin ? t("Show Zero Balance") : t("Hide Zero Balance")}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenWithdrawal}
        >
          {t("Make A Withdrawal")}
        </Button>
      </div>

      <Grid container spacing={2}>
        {showCoin || btc.balance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <img src="/static/tipcoins/bit.svg" className={classes.img} />
              <Typography className={classes.balance} variant="overline">
                {btc.balance.toFixed(2)}
              </Typography>
            </div>
            {user.user.isAdmin && (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{btc.address}</i>
              </div>
            )}
          </Grid>
        ) : null}
        {showCoin || doge.balance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <img src="/static/tipcoins/doge.svg" className={classes.img} />
              <Typography className={classes.balance} variant="overline">
                {doge.balance}
              </Typography>
            </div>
            {user.user.isAdmin && (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{doge.address}</i>
              </div>
            )}
          </Grid>
        ) : null}
        {showCoin || joe.balance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <img src="/static/tipcoins/joe.png" className={classes.img} />
              <Typography className={classes.balance} variant="overline">
                {joe.balance}
              </Typography>
            </div>
            {user.user.isAdmin ? (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{joe.address}</i>
              </div>
            ) : null}
          </Grid>
        ) : null}

        {showCoin || pres.balance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <img src="/static/tipcoins/pres.png" className={classes.img} />
              <Typography className={classes.balance} variant="overline">
                {pres.balance}
              </Typography>
            </div>
            {user.user.isAdmin ? (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{pres.address}</i>
              </div>
            ) : null}
          </Grid>
        ) : null}

        {showCoin || ye.balance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <img src="/static/tipcoins/ye.png" className={classes.img} />
              <Typography className={classes.balance} variant="overline">
                {ye.balance}
              </Typography>
            </div>
            {user.user.isAdmin ? (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{ye.address}</i>
              </div>
            ) : null}
          </Grid>
        ) : null}

        {showCoin || eth.dogecoincashApiBalance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <a target="_blank" href="https://www.dogecoincash.org/">
                <img
                  src="/static/tipcoins/dogecoincash-small.png"
                  className={classes.img}
                />
              </a>
              <Typography className={classes.balance} variant="overline">
                {eth.dogecoincashApiBalance.toFixed(2)}
              </Typography>
            </div>
            {user.user.isAdmin ? (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{eth.address}</i>
              </div>
            ) : null}
          </Grid>
        ) : null}

        {showCoin || pom.balance > 0 ? (
          <Grid item xs={6} sm={4} component={Paper}>
            <div className={classes.split}>
              <a target="_blank" href="https://superdog.farm/">
                <img
                  src="/static/tipcoins/superdog.png"
                  className={classes.img}
                />
              </a>
              <Typography className={classes.balance} variant="overline">
                {pom.balance}
              </Typography>
            </div>
            {user.user.isAdmin ? (
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{pom.address}</i>
              </div>
            ) : null}
          </Grid>
        ) : null}

        {user.user.isAdmin &&
          (showCoin || eth.ethApiBalance > 0 ? (
            <Grid item xs={6} sm={4} component={Paper}>
              <div className={classes.split}>
                <img
                  src="/static/tipcoins/eth.svg"
                  className={classes.imgEth}
                />
                <Typography className={classes.balance} variant="overline">
                  {eth.ethApiBalance}
                </Typography>
              </div>
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{eth.address}</i>
              </div>
            </Grid>
          ) : null)}
        {user.user.isAdmin &&
          (showCoin || eth.tipccoinApiBalance > 0 ? (
            <Grid item xs={6} sm={4} component={Paper}>
              <div className={classes.split}>
                <img
                  src="/static/tipcoins/tipc-small.png"
                  className={classes.img}
                />
                <Typography className={classes.balance} variant="overline">
                  {eth.tipccoinApiBalance}
                </Typography>
              </div>
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{eth.address}</i>
              </div>
            </Grid>
          ) : null)}
        {user.user.isAdmin &&
          (showCoin || eth.xrtApiBalance.balance > 0 ? (
            <Grid item xs={6} sm={4} component={Paper}>
              <div className={classes.split}>
                <img
                  src="/static/tipcoins/xrt-small.png"
                  className={classes.img}
                />
                <Typography className={classes.balance} variant="overline">
                  {eth.xrtApiBalance}
                </Typography>
              </div>
              <div className={classes.addressContainer}>
                <span>Address:</span>
                <i className={classes.address}>{eth.address}</i>
              </div>
            </Grid>
          ) : null)}

        {/* <Grid item xs={6} sm={4} component={Paper}>
          <div className={classes.split}>
            <img
              src="/static/tipcoins/tipc-small.png"
              className={classes.img}
            />
            <Typography variant="overline">{eth.tipcoinApiBalance}</Typography>
          </div>
        </Grid> */}
        {cryptos.map((crypto) => {
          const balance = user.user.groupWallets.find(
            (a) => a.tokenName == crypto.ticker
          );
          if (!balance || (balance && balance.balance == 0)) {
            if (showCoin) {
              //  return balance ? balance.balance : 0;
              return (
                <Grid item xs={6} sm={4} component={Paper}>
                  <div className={classes.split}>
                    <img
                      src={config.getImage + crypto.icon}
                      className={classes.img}
                    />

                    <Typography className={classes.balance} variant="overline">
                      {balance && balance.balance
                        ? balance.balance.toFixed(2)
                        : 0}
                    </Typography>
                  </div>
                  {user.user.isAdmin ? (
                    <div className={classes.addressContainer}>
                      <span>Address:</span>
                      <i className={classes.address}>
                        {balance && balance.address}
                      </i>
                    </div>
                  ) : null}
                </Grid>
              );
            } else {
              return null;
            }
          } else {
            // balance is not zero
            return (
              <Grid item xs={6} sm={4} component={Paper}>
                <div className={classes.split}>
                  <img
                    src={config.getImage + crypto.icon}
                    className={classes.img}
                  />

                  <Typography className={classes.balance} variant="overline">
                    {balance ? balance.balance.toFixed(2) : 0}
                  </Typography>
                </div>
                {user.user.isAdmin ? (
                  <div className={classes.addressContainer}>
                    <span>Address:</span>
                    <i className={classes.address}>{balance.address}</i>
                  </div>
                ) : null}
              </Grid>
            );
          }
        })}
      </Grid>

      <Withdrawal open={open} handleClose={setOpen} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cryptos: state.cryptos.cryptos.filter(
      (token) => token.status == "approved"
    ),
    user: state.user,
  };
};
export default connect(mapStateToProps)(withTranslation()(CoinCard));

const useStyles = makeStyles(({ spacing }) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: spacing(1, 0, 2),
  },
  split: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    alignItems: "flex-start",
  },
  address: {
    fontSize: ".7em",
    display: "block",
    textAlign: "right",
    wordWrap: "wrap",
  },
  balance: {
    fontSize: 20,
  },
  img: {
    width: 45,
  },
  imgEth: {
    width: 25,
  },
}));
