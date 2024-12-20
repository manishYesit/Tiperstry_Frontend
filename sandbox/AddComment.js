import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { setToggleComment, setComment } from "../../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { config } from "../../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { withTranslation } from "../i18n";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    topic: state.topics,
    comment: state.comment,
  };
};

const mapDispatchToProps = {
  setToggleComment,
  setComment,
};

const AddComment = ({
  comment,
  setToggleComment,
  user,
  topic,
  setComment,
  t,
}) => {
  const classes = useStyles();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });

  const handleReply = async () => {
    const token = await executeRecaptcha("topic");

    if (!token) return;

    try {
      setLoading(true);

      const headers = user.token ? { "x-auth-token": user.token } : {};
      const trans = await axios.post(
        config.reply,
        {
          content,
          topicId: topic.singleTopic._id,
          commentId: comment.commentId,
        },
        { headers }
      );

      // Router.reload();
      setComment([]);

      // Router.reload();
      const comments = await axios.get(
        config.comment + "/" + topic.singleTopic._id
      );

      setComment(comments.data);
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleComment = async () => {
    const token = await executeRecaptcha("topic");

    if (!token) return;
    try {
      setLoading(true);
      const headers = user.token ? { "x-auth-token": user.token } : {};
      const trans = await axios.post(
        config.comment,
        { content, topicId: topic.singleTopic._id },
        { headers: headers }
      );

      setComment([]);

      // Router.reload();
      const comments = await axios.get(
        config.comment + "/" + topic.singleTopic._id
      );

      setComment(comments.data);
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleForm = async () => {
    if (comment.type === "reply") {
      handleReply();
    } else {
      handleComment();
    }
  };

  const handleChange = async (event) => {
    setContent(event.target.value.trim());
  };

  const handleClose = () => {
    setToggleComment({ openComment: false, commentId: null, type: null });
  };

  return (
    <Dialog
      open={comment.openComment}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      onClose={() =>
        setToggleComment({
          openComment: false,
          commentId: null,
          type: null,
        })
      }
      // onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {comment.type === "reply" ? (
          <Box display={"flex"} flexDirection={"row"}>
            <Typography>Replying @</Typography>
            <Typography component="a" color="primary">
              {comment.username}
            </Typography>
          </Box>
        ) : (
          <Typography>{t("Comment")}</Typography>
        )}
      </DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <TextField
          variant="outlined"
          error={res.err}
          value={content}
          multiline
          rows={3}
          rowsMax={4}
          onChange={handleChange}
          className={classes.TextField}
        />
      </DialogContent>
      <Box pl={3} pr={3}>
        {user.user ? (
          <Typography variant="caption">
            You are currently Logged In. Any comment made would be done using
            your account details
          </Typography>
        ) : (
          <Typography variant="caption">
            You are currently not <a href="/login">Logged In</a>. Any comment
            made would be done Anonymously
          </Typography>
        )}
      </Box>

      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleForm}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  TextField: {
    width: "100%",
  },
}));

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddComment)
);
