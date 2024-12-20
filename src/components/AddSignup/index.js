import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { toggleGift } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Post from "./components/Post";
import RegisterRoot from "../../../src/containers/Register/RegisterHeader";
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


const AddSignup = ({ group, gift, toggleGift, user, open, handleClose, t }) => {
  const classes = useStyles();
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: ""
  });

  return (
    <Dialog 
      open={open} 
      style={{ WebkitOverflowScrolling: "touch" }}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">Signup {group && "for Group"} </DialogTitle>
        <RegisterRoot />
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
)(withTranslation()(AddSignup));
