import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";


export default function Leaderboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption">Leaderboard</Typography>
      <Paper className={classes.paper}>
        <Box className={classes.box}>
          <Typography variant="caption">@simone</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>20,303.34</Typography>
          </div>
        </Box>
        <Divider />
        <Box className={classes.box}>
          <Typography variant="caption">@arge</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>17,444.34</Typography>
          </div>
        </Box>
        <Divider />

        <Box className={classes.box}>
          <Typography variant="caption">@wema</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>12,224.09</Typography>
          </div>
        </Box>
        <Divider />

        <Box className={classes.box}>
          <Typography variant="caption">@singer</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>10,093.00</Typography>
          </div>
        </Box>
        <Divider />

        <Box className={classes.box}>
          <Typography variant="caption">@simone</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>3,345.00</Typography>
          </div>
        </Box>
        <Divider />

        <Box className={classes.box}>
          <Typography variant="caption">@simone</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>2,455.03</Typography>
          </div>
        </Box>
        <Divider />

        <Box className={classes.box}>
          <Typography variant="caption">@simone</Typography>
          <div className={classes.amount}>
            <img src="/static/tipcoins/doge.svg" width="15" height="15" />
            <Typography>2,123.60</Typography>
          </div>
        </Box>

      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20
  },
  paper: {
    padding: "10px"
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2
  },
  amount: {
    display: "flex",
		flexDirection: "row",
		alignItems: "center"
  }
}));
