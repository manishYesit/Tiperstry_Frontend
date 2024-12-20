import React from "react";
import { makeStyles, theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import moment from "moment";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import LadderBoard from "../LadderBoard";

const DialogTitle = (props) => {
  const classes = useStyles();
  const { onClose, ...other } = props;
  console.log(onClose);
  return (
    <MuiDialogTitle disableTypography className={classes.titleRoot} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const LadderBoardModel = React.memo((props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const nextDisplayDate = localStorage.getItem("nextDisplayDateIEO1");

    if (!nextDisplayDate || nextDisplayDate > new Date()) {
      console.log("banner nextDisplayDate: " + nextDisplayDate);
      setTimeout(function () {
        localStorage.setItem(
          "nextDisplayDateIEO1",
          moment(new Date()).add(7, "days")
        );
        setOpen(true);
      }, 11000);
    }
    //  else {
    //   setOpen(false);
    // }
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle onClose={handleClose} />
      <DialogContent className={classes.contentRoot}>
        <LadderBoard item="2" single />
      </DialogContent>
    </Dialog>
  );
});

LadderBoardModel.defaultProps = {
  visible: false,
};

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    padding: "0 !important",
  },
  titleRoot: {
    position: "absolute",
    margin: 0,
    width: "100%",
    padding: theme.spacing(2),
    zIndex: 99999,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default LadderBoardModel;
