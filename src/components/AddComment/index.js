import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import { setToggleComment, setComment } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { config } from "../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import RECAPTCHA from "../Recaptcha";
import { withTranslation } from "../../../i18n";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddComment = ({ t }) => {
  const classes = useStyles();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const dispatch = useDispatch();
  const comment = useSelector(({ comment }) => comment);
  const token = useSelector(({ user: { token } }) => token);
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState(comment.content);
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    status: ""
  });

  React.useEffect(() => {
    if (comment.content) {
      setContent(comment.content);
    }
  }, [comment.content])


  const handleReply = async () => {
    const RCtoken = await executeRecaptcha("topic");

    if (!RCtoken) return;

    try {
      setLoading(true);

      const headers = token ? { "x-auth-token": token } : {};
      const trans = await axios.post(
        config.reply,
        {
          content,
          topicId: comment.topicId,
          commentId: comment.commentId
        },
        { headers }
      );

      dispatch(setComment([]));

      const comments = await axios.get(config.comment + "/" + comment.topicId);

      dispatch(setComment(comments.data));
      setLoading(false);
      handleClose();
      setContent("");
    } catch (error) {
      setLoading(false);
      
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      });
    }
  };

  const handleComment = async () => {
    const RCtoken = await executeRecaptcha("topic");

    if (!RCtoken) return;
    try {
      setLoading(true);
      const headers = token ? { "x-auth-token": token } : {};
      const trans = await axios.post(
        config.comment,
        { content, topicId: comment.topicId },
        { headers: headers }
      );

      dispatch(setComment([]));

      const comments = await axios.get(config.comment + "/" + comment.topicId);

      dispatch(setComment(comments.data));
      setLoading(false);
      handleClose();
      setContent("");
    } catch (error) {
      setLoading(false);
      
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      });
    }
  };

  const handleEditComment = async () => {
    const RCtoken = await executeRecaptcha("topic");

    if (!RCtoken) return;

    try {
      setLoading(true);
      const trans = await axios.put(
        config.comment + "/" + comment.commentId,
        { content },
        { headers: { "x-auth-token": token } }
      );

      dispatch(setComment([]));

      const comments = await axios.get(config.comment + "/" + comment.topicId);

      dispatch(setComment(comments.data));
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      
      console.log("error", error.response);
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
      return
    }
    if (comment.type === "comment") {
      handleComment();
      return;
    }
    if (comment.type === "edit") {
      handleEditComment();
      return;
    }
  };

  const handleChange = async event => {
    setContent(event.target.value);
  };

  const handleClose = () => {
    dispatch(setToggleComment({ openComment: false, commentId: null, type: null }));
  };

  return (
    <Dialog
      open={comment.openComment}
      maxWidth="md"
      TransitionComponent={Transition}
      keepMounted
      onClose={() =>
        dispatch(
          setToggleComment({
            openComment: false,
            commentId: null,
            type: null,
          })
        )
      }
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {comment.type === "reply" && (
          <Box display={"flex"} flexDirection={"row"}>
            <Typography>{t("Replying")} @</Typography>
            <Typography component="a" color="primary">
              {comment.username}
            </Typography>
          </Box>
        )}
        {comment.type === "comment" && <Typography>{t("Comment")}</Typography>}
        {comment.type === "edit" && <Typography>{t("Edit")}</Typography>}
      </DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <TextField
          variant="outlined"
          error={res.err}
          value={content}
          multiline
          rows={3}
          fullWidth
          rowsMax={4}
          onChange={handleChange}
          className={classes.TextField}
        />
        <RECAPTCHA />
      </DialogContent>
      {/* <Box pl={3} pr={3}>
        {user.user ? (
          <Typography variant="caption">{t("loggedIN")}</Typography>
        ) : (
          <Typography variant="caption">
            {t("You are currently not")} <a href="/login">{t("Logged In")}</a>.{" "}
            {t("Any comment made would be done Anonymously")}
          </Typography>
        )}
      </Box> */}

      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading || !token}
          onClick={handleForm}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Send")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default withTranslation()(AddComment);



const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    [breakpoints.down("sm")]: {
      minWidth: 320,
    },
    minWidth: 450,
  },
  TextField: {
    width: "100%",
  },
}));
