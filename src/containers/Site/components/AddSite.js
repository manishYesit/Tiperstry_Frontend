import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SitePost from "../../../components/AddPost/components/SitePost";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import { withTranslation } from "../../../../i18n";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddSite = ({ t }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let url = "";
  if (router) {
    url =
      router.route === "/sites" ? router.query.s : "https://" + router.query.s;
  }

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
      <Button color="primary" variant="contained" onClick={handleOpen}>
        {t("Add Post")}
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

const useStyles = makeStyles((theme) => ({
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

export default withTranslation()(AddSite);
