import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { config, url } from "../../../../config";
import { connect } from "react-redux";
// import { toggleRefresh } from "../../../store/actions";

const mapStateToProps = (state) => ({
  gift: state.gift,
});

class DisplayTips extends Component {
  renderImage = (type) => {
    const { classes } = this.props;

    switch (type) {
      case "dogecoin":
        return <img src="/static/tipcoins/doge.svg" className={classes.img} />;
      case "superdog":
        return (
          <a target="_blank" href="https://superdog.farm/">
            <img src="/static/tipcoins/superdog.png" className={classes.img} />
          </a>
        );
      case "bitcoin":
        return <img src="/static/tipcoins/bit.svg" className={classes.img} />;
      case "ethcoin":
        return <img src="/static/tipcoins/eth.svg" className={classes.img} />;
      case "ethxrtcoin":
        return (
          <img src="/static/tipcoins/xrt-small.png" className={classes.img} />
        );
      case "ethtipc":
        return (
          <img src="/static/tipcoins/tipc-small.png" className={classes.img} />
        );
      case "ethtipcoin":
        return (
          <img src="/static/tipcoins/tip-small.png" className={classes.img} />
        );
      case "ye":
        return <img src="/static/tipcoins/ye.png" className={classes.img} />;
      case "joe":
        return <img src="/static/tipcoins/joe.png" className={classes.img} />;
      case "pres":
        return <img src="/static/tipcoins/pres.png" className={classes.img} />;
      case "dogecoincash":
        return (
          <a target="_blank" href="https://www.dogecoincash.org/">
            <img
              src="/static/tipcoins/dogecoincash-small.png"
              className={classes.img}
            />
          </a>
        );
      default:
        break;
    }
  };

  render() {
    const { tips, classes } = this.props;

    return (
      <div className={classes.root}>
        {tips.map((tip, index) => {
          if (tip.walletType == "others") {
            return (
              <div key={index} className={classes.containwe}>
                {tip.groupDetails && (
                  <a
                    target="_blank"
                    href={
                      tip.groupDetails &&
                      `/group/${tip.groupDetails.name.replace(" ", "-")}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={config.getImage + tip.token.icon}
                      className={classes.img}
                    />
                  </a>
                )}
                <Typography variant="caption" className={classes.num}>
                  {tip.amount.toFixed(1)}
                </Typography>
              </div>
            );
          } else {
            return (
              <div key={index} className={classes.containwe}>
                {this.renderImage(tip.walletType)}
                <Typography variant="caption" className={classes.num}>
                  {tip.walletType == "bitcoin"
                    ? tip.amount
                    : tip.amount.toFixed(1)}
                </Typography>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  containwe: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: theme.spacing(0, 0.5),
  },
  img: {
    width: 20,
  },
  num: {
    fontSize: 15,
  },
});

export default connect(mapStateToProps)(withStyles(styles)(DisplayTips));
