import React from "react";
import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

import { withTranslation } from "../../../../i18n";

import axios from "axios";
import { config } from "../../../../config";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NSfwmodal = ({ opened, setNsfwYes }) => {
  return (
    <>
      <Dialog
        open={opened}
        style={{ WebkitOverflowScrolling: "touch" }}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add Rule</DialogTitle>
        <DialogContent>
          <p>I am at least 18 years old and am willing to see adult content.</p>

          <p>
            <Button
              style={{
                backgroundColor: "#0079d3",
                borderRadius: "50px",
                marginTop: 5,
                textTransform: "capitalize",
                fontWeight: "600",
              }}
              color="primary"
              variant="contained"
              onClick={() => {
                setNsfwYes(false);
              }}
            >
              Enter
            </Button>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withTranslation()(NSfwmodal);
