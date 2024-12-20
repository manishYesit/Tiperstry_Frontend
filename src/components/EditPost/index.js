import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import { setEditTopic } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { config } from "../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";
import { withTranslation } from "../../../i18n";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditPostModal = ({ t }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const topics = useSelector(({ topics }) => topics);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });
  const [val, setVal] = useState({
    url: topics.editValue.url,
    title: topics.editValue.title,
    details: "",
    tag: "",
  });

  React.useEffect(() => {
    setVal({
      url: topics.editValue.url,
      title: topics.editValue.title,
      details: "",
      tag: "",
    });
  }, [topics]);

  const handleChange = (name) => (event) => {
    setVal({
      ...val,
      [name]: event.target.value,
    });
  };

  if (!topics.editValue) return null;

  return (
    <Dialog
      open={topics.edit}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(setEditTopic({ edit: false, editValue: null }))}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {`Update " ${topics.editValue.title} "`}
      </DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        {topics.editValue.type !== "localGif" &&
          topics.editValue.type !== "localImg" && (
            <TextField
              id="outlined-basic"
              value={val.url}
              defaultValue={topics.editValue.url}
              fullWidth
              label="URL"
              onChange={handleChange("url")}
              variant="outlined"
              margin="dense"
            />
          )}

        <TextField
          id="outlined-basic"
          value={val.title}
          fullWidth
          label={t("Title")}
          onChange={handleChange("title")}
          variant="outlined"
          margin="dense"
        />
        <TextField
          id="outlined-basic"
          fullWidth
          value={val.details}
          label={t("Details")}
          onChange={handleChange("details")}
          multiline
          rows={3}
          rowsMax={5}
          variant="outlined"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            dispatch(setEditTopic({ edit: false, editValue: null }))
          }
          color="default"
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading}
          // onClick={handleGift}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Gift")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(EditPostModal);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    [breakpoints.down("sm")]: {
      minWidth: 320,
    },
    minWidth: 450,
    // width: "100%",
    // maxWidth: 500,
  },
}));
