import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { setToggleComment, setComment } from "../../../store/actions";
import { withTranslation } from "../../../../i18n";
import TextField from "@material-ui/core/TextField";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { config } from "../../../../config";
import Box from "@material-ui/core/Box";
import AppCaptcha from "../../../../src/components/AppCaptcha";

const AddComment = ({ setToggleComment, topicId, t }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const topics = useSelector(({ topics }) => topics);

  // const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [captcha, setCaptcha] = React.useState(user.token != null);

  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    status: "",
  });

  const handleChange = async (event) => {
    setContent(event.target.value);
  };

  const editorTool = (value) => {
    var inputElement = document.getElementById('comment-box');

    if (inputElement) {
      var selectedText = inputElement.innerHTML.slice(inputElement.selectionStart, inputElement.selectionEnd);

      if (selectedText.length) {
        if (value == '```') {
          selectedText = '<>' + selectedText + '</>';
        } else {
          selectedText = value + selectedText + value;
        }
        setContent(inputElement.innerHTML.substring(0, inputElement.selectionStart) + selectedText + inputElement.innerHTML.substring(inputElement.selectionEnd));
      }
    }
  }

  const handleComment = async () => {
    // const token = await executeRecaptcha("topic");
    // if (!token) return;

    // check if user is banned from this group
    if (topics.singleTopic.groupId && topics.singleTopic.group.bannedusers.includes(user.user._id)) {
      alert("You are banned from this group.");
      return;
    }

    try {
      setLoading(true);
      const headers = user.token ? { "x-auth-token": user.token } : {};
      const trans = await axios.post(
        config.comment,
        { content, topicId: topics.singleTopic._id },
        { headers }
      );

      setContent("");
      dispatch(setComment([]));
      const comments = await axios.get(
        config.comment + "/" + topics.singleTopic._id
      );
      dispatch(setComment(comments.data));
      setLoading(false);
      setCaptcha(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      console.log("error", error.response);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  return (
    <Paper className={classes.root}>
      <Box mb={1}>
        <Typography variant="h6">{t("Comment")}</Typography>
      </Box>
      {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
      <Box className={classes.editor}>
        <Typography onClick={() => editorTool('**')} title={'Bold'} variant="h6" className={classes.editorTool} style={{ fontWeight: 600 }}>B</Typography>
        <Typography onClick={() => editorTool('__')} title={'Italic'} variant="h6" className={classes.editorTool} style={{ fontStyle: 'italic' }}>I</Typography>
        <Typography onClick={() => editorTool('~~')} title={'Strike'} variant="h6" className={classes.editorTool} style={{ textDecoration: "line-through" }}>S</Typography>
        <Typography onClick={() => editorTool('```')} title={'Code'} variant="h6" style={{ cursor: 'pointer' }}>{'</>'}</Typography>
      </Box>
      <TextField
        id="comment-box"
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
      {/* {user.user == null && !captcha && (
        <AppCaptcha onChange={(val) => setCaptcha(val)} />
      )} */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ marginTop: 5 }}>
        <Button
          disabled={loading || user.user == null}
          onClick={handleComment}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Send")}
        </Button>
      </Box>
    </Paper>
  );
};

export default withTranslation()(AddComment);

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(1, 2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  editor: {
    display: "flex",
    padding: "5px 15px",
    background: "#ececec",
    gap: "20px",
  },
  editorTool: {
    cursor: 'pointer',
    fontFamily: "'Courier New', Courier, monospace",
  }
}));
