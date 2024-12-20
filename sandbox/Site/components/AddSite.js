import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SitePost from "../../../components/AddPost/components/SitePost";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import Router from "next/router"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AddSite = props => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false)

	  const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  let url = "";
  if (Router.router) {
    url = Router.router.route === "/Site" ? Router.router.query.s : "https://" + Router.router.query.s;
  }

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="flex-start" >
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Add Post
      </Button>
      <Dialog
        open={open}
        maxWidth="sm"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <SitePost handleClose={handleClose} disabled={true} siteUrl={url} />
      </Dialog>
    </Box>
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

export default AddSite;