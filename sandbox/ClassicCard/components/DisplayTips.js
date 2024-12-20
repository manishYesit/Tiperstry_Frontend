import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
// import { toggleRefresh } from "../../../store/actions";

const mapStateToProps = (state) => ({
  gift: state.gift
});

// const mapDispatchToProps = {
//   toggleRefresh
// };

class DisplayTips extends Component {
	// const [tips, setTips] = useState(null);

  // componentDidUpdate(prevProps, prevState) {
  //   const { topicId, gift, handleSetTips } = this.props;
 
  //   if (prevProps.gift.refresh !== gift.refresh) {
  //     if (topicId === gift.topicId) {
  //       console.log("errtopicId", topicId);
  //       this.handleFetchTips();
  //     }
  //   }
  // }


  // handleFetchTips = async () => {
  //   const { topicId, gift, handleSetTips, toggleRefresh } = this.props;

  //   try {
  //     const tip = await axios.get(config.topicTip + "/" + topicId);

  //     console.log("tiptip", tip);
  //     handleSetTips(tip.data);
  //     toggleRefresh();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  

	renderImage = (type) => {
    const { classes } = this.props;

		switch (type) {
      case "dogecoin":
        return <img src="/static/tipcoins/doge.svg" className={classes.img} />;
      case "bitcoin":
        return <img src="/static/tipcoins/bit.svg" className={classes.img} />;
      case "ethcoin":
        return <img src="/static/tipcoins/eth.svg" className={classes.img} />;
      case "ethxrtcoin":
        return <img src="/static/tipcoins/xrt-small.png" className={classes.img} />
      case "ethtipc":
        return <img src="/static/tipcoins/tipc-small.png" className={classes.img} />;
      case "ethtipcoin":
        return <img src="/static/tipcoins/tip-small.png" className={classes.img} />;
      case "ye":
        return <img src="/static/tipcoins/ye.png" className={classes.img} />;
      case "joe":
        return <img src="/static/tipcoins/joe.png" className={classes.img} />;
      case "pres":
        return <img src="/static/tipcoins/pres.png" className={classes.img} />;
      case "dogecoincash":
        return <a target="_blank" href="https://www.dogecoincash.org/"><img src="/static/tipcoins/dogecoincash-small.png" className={classes.img} /></a>;
      default:
        break;
    }
  }


  render() {
    const { tips, classes } = this.props;
  
    return (
      <div className={classes.root}>
        {tips.map((tip, index) => (
          <div key={index} className={classes.containwe}>
            {this.renderImage(tip.walletType)}
            <Typography variant="caption" className={classes.num}>
              {tip.amount}
            </Typography>
          </div>
        ))}
      </div>
    );
  }
}


const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  containwe: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: theme.spacing(0, 0.5)
  },
  img: {
    width: 25
  },
  num: {
		fontSize: 15
	}
});

export default connect(
  mapStateToProps
)(withStyles(styles)(DisplayTips));