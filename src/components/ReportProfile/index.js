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
import { openReport } from "../../store/actions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import { config } from "../../../config";
import TextField from "@material-ui/core/TextField";

let reportedUser;

const mapStateToProps = (state) => ({
    user: state.user,
    topic: state.topics,
    profile: state.profile.topics
});

const mapDispatchToProps = {
    openReport,
};

const Report = ({
    user: { report, token, reportTopicId },
    openReport,
    topic: { topics },
    user: { user },
    profile
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
    reportedUser = profile.find((el) => el._id === reportTopicId);
   
   
    const handleReport = async () => {
       
        try {
            setLoading(true);
            let reportedUserId = reportedUser.userId._id;
            let reportedUsername = reportedUser.userId.username;
            let topicTitle = reportedUser.title;
            let topicId = reportedUser._id
            
            const follow = await axios.post(
                config.report,
                {
                    reason: value,
                    message,
                    topicId,
                    reportedUserId,
                    reportedUsername,
                    username: user.username,
                    userId: user._id,
                    topicTitle,
                    reportType: "topic"
                },
                {
                    headers: { "x-auth-token": token },
                }
            );
            openReport();
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
            onClose={() => openReport()}
            maxWidth="sm"
            aria-labelledby="customized-dialog-title"
            open={report}
            style={{ minWidth: 320 }}
        >
            <DialogTitle id="customized-dialog-title" onClose={() => openReport()}>
                Report this post
      </DialogTitle>
            <DialogContent dividers>
                <Typography>Why are you reporting this post?</Typography>
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
                    onClick={() => openReport()}
                    style={{ color: "red" }}
                >
                    Cancel
        </Button>
                <Button
                    mautoFocus
                    size="small"
                    disabled={loading}
                    variant="contained"
                    onClick={handleReport}
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

export default connect(mapStateToProps, mapDispatchToProps)(Report);
