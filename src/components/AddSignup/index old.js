import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { toggleGift } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { config } from "../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ItemStyles, Styles } from "./components/tab";
import ImagePost from "./components/ImagePost";
import SitePost from "./components/SitePost";
import { withTranslation } from "../../../i18n";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = state => {
  return {
    user: state.user,
    gift: state.gift
  };
};

const mapDispatchToProps = {
  toggleGift
};


const AddPost = ({ gift, toggleGift, user, open, handleClose, t }) => {
  const classes = useStyles();
  const tabItemStyles = ItemStyles();
  const tabsStyles = Styles();
	const [loading, setLoading] = useState(false);
	const [tabIndex, setTabIndex] = React.useState(0);
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: ""
  });

  const handleGift = async () => {
    try {
      setLoading(true);
      const trans = await axios.post(
        config.tipPost,
        { amount, coin, topicId: gift.topicId },
        { headers: { "x-auth-token": user.token } }
      );

      // // console.log("trans", trans);

      setLoading(false);
      setAmount(0);

      Router.reload();

      toggleGift();
      // toggleRefresh();
    } catch (error) {
      setLoading(false);
      // // console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      });
    }
  };


	const renderTab = () => {
		return (
      <Tabs
        classes={tabsStyles}
        value={tabIndex}
        onChange={(e, index) => setTabIndex(index)}
      >
        <Tab classes={tabItemStyles} disableRipple label={t("Site")} />
        <Tab classes={tabItemStyles} disableRipple label={t("Regular")} />
      </Tabs>
    );
	}

  return (
    <Dialog
      open={open}
      style={{
        WebkitOverflowScrolling: "touch"
      }}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}

        {renderTab()}
      </DialogContent>
      {tabIndex === 0 && <SitePost handleClose={handleClose} />}
      {tabIndex === 1 && <ImagePost handleClose={handleClose} />}
      
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  iconRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  img: {
    border: "1px solid darkgray",
    width: 35,
    height: 35,
    margin: 5,
    borderRadius: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#50557b"
    }
  },
  selected: {
    backgroundColor: "#50557b"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  balance: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  balanceImg: {
    width: 15
  }
}));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(AddPost));



      {
        /* <DialogContent className={classes.root}></DialogContent> */
      }
      {
        /* <DialogActions>
        <Button
          // onClick={() => }
          color="default"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleGift}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : "Save Post"}
        </Button>
      </DialogActions> */
      }