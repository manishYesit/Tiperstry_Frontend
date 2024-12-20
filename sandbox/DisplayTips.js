import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from '../../../../config';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';


export default function DisplayTips(props) {
	const { topicId, tips } = props;
	// const [tips, setTips] = useState(null);
	const classes = useStyles();

	// const handleFetchTips = async () => {
	// 	try {
	// 		const tip = await axios.get(config.topicTip + "/" + topicId);

	// 		console.log("tiptip", tip);
	// 		setTips(tip.data);
	// 	} catch (error) {
	// 		console.log("error", error);
	// 	}
	// }

	// useEffect(() => {
	// 	const tips = setTimeout(() => {
	// 		handleFetchTips();
	// 	}, 2000);
	// 	return () => {
	// 		clearTimeout(tips)
	// 	};
	// }, []);

	const renderImage = (type) => {
		switch (type) {
      case "dogecoin":
        return <img src="/static/tipcoins/doge.svg" className={classes.img} />;
      case "bitcoin":
        return <img src="/static/tipcoins/bit.svg" className={classes.img} />;
      case "ethcoin":
        return <img src="/static/tipcoins/eth.svg" className={classes.img} />;
      case "ethxrtcoin":
        return (
          <img src="/static/tipcoins/xrt-small.png" className={classes.img} />
        );
      case "ethtipc":
        return <img src="/static/tipcoins/tipc-small.png" className={classes.img} />;
      case "ethtipcoin":
        return <img src="/static/tipcoins/tip-small.png" className={classes.img} />;
      default:
        break;
    }
	}

	return (
    <div className={classes.root}>
      {tips.map(tip => (
        <div className={classes.containwe}>
          {renderImage(tip.walletType)}
          <Typography variant="caption" className={classes.num}>
            {tip.amount}
          </Typography>
        </div>
      ))}
    </div>
  );
}


const useStyles = makeStyles(theme => ({
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
    width: 15
  },
  num: {
		fontSize: 15
	}
}));