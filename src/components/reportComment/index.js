import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { openReportComment } from "../../store/actions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import { config } from "../../../config";
import TextField from "@material-ui/core/TextField";

let reportedUser;
let initialuser = "";
let reportedUsername = "";

const mapStateToProps = (state) => ({
    user: state.user,
    comment: state.comment.comments,
    topicId: state.topics.singleTopic ? state.topics.singleTopic._id: undefined,
    topicTitle: state.topics.singleTopic ? state.topics.singleTopic.title: undefined
});

const mapDispatchToProps = {
  openReportComment,
};

const ReportComment = ({
  user: { reportComment, token, reportTopicId },
  openReportComment,
  comment,
  topicId,
  topicTitle,
  user: { user },
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("violent");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  let commentId = reportTopicId;
  const handleReportComment = async () => {
    try {
      setLoading(true);

      const report = await axios.post(
        config.reportComment,
        {
          reason: value,
          message,
          topicId,
          topicTitle,
          commentId,
          username: user.username,
          userId: user._id,
          reportType: "comment",
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      openReportComment();
      // setValue("violent");
      // setMessage("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  return (
    <Dialog
      onClose={() => openReportComment()}
      maxWidth="sm"
      aria-labelledby="customized-dialog-titles"
      open={reportComment}
      style={{ minWidth: 320 }}
    >
      <DialogTitle
        id="customized-dialog-titles"
        onClose={() => openReportComment()}
      >
        Report this comment
      </DialogTitle>
      <DialogContent dividers>
        <Typography>Why are you reporting this comment?</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="report"
            name="report-name"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="violent"
              control={<Radio color="primary" />}
              label="It's Violent"
            />
            <FormControlLabel
              value="abusive"
              control={<Radio color="primary" />}
              label=" It's Abusive"
            />
            <FormControlLabel
              value="inappropriate"
              control={<Radio color="primary" />}
              label=" It's Inappropriate"
            />
            <FormControlLabel
              value="spam"
              control={<Radio color="primary" />}
              label=" It's Spam"
            />
            <FormControlLabel
              value="other"
              control={<Radio color="primary" />}
              label="Others"
            />
          </RadioGroup>
        </FormControl>
        {value === "other" && (
          <TextField
            id="outlined-basic"
            label="Additional Comment"
            variant="outlined"
            multiline
            rows={3}
            rowsMax={4}
            value={message}
            onChange={handleMessage}
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={() => openReportComment()}
          style={{ color: "red" }}
        >
          Cancel
        </Button>
        <Button
          mautoFocus
          size="small"
          disabled={loading}
          variant="contained"
          onClick={handleReportComment}
          color="primary"
        >
          Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default connect(mapStateToProps, mapDispatchToProps)(ReportComment);
