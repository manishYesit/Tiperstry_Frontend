import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import ThumbNails from "../../components/ThumbNails";

import {
  //   toggleAddDomainModal,
  toggleVerifyChannelModal,
  setUserYoutubeInfo,
} from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "../../../i18n";
import TextField from "@material-ui/core/TextField";

import { config } from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const YoutubeVerification = ({ t, disabled }) => {
  const youtube = useSelector(({ youtube }) => youtube);
  const userYoutubeInfo = useSelector(({ user }) =>
    user.user ? user.user.youtube || {} : {}
  );
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState({
    email: "",
  });

  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  let token;
  React.useEffect(() => {
    // dispatch(setUserYoutubeInfo(response.data));
    token = localStorage.getItem("token");
  });

  // {
  //   userYoutubeInfo && !userYoutubeInfo.verified ? (
  //     <Alert severity="warning">
  //       Channel not verified
  //       {/* <strong>review the domain records!</strong> */}
  //     </Alert>
  //   ) : null;
  // }

  const handleChange = (event) => {
    setVal({ [event.target.name]: event.target.value.trim() });
  };

  const verifyNow = async () => {
    setLoading(true);
    if (token) {
      await axios
        .post(
          config.verifyChannel,
          { email: val.email },
          {
            headers: { "x-auth-token": token },
          }
        )
        .then((response) => {
          setLoading(false);
          setInfo(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          dispatch(setError(error.response.data));
        });
    }
  };

  return (
    <Dialog
      open={youtube.openVerifyChannel}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Youtube Channel Verification
      </DialogTitle>
      <DialogContent className={classes.root}>
        <div>
          <p>
            To verify your channel, input the email for your youtube channel and
            wait for an email
          </p>
          {/* <h3>DNS TXT Record</h3> */}
          {userYoutubeInfo && userYoutubeInfo.verified ? (
            <Alert severity="success">
              Channel has been verified succesfully
            </Alert>
          ) : null}

          {error ? <Alert severity="error">{error}</Alert> : null}
          {info ? <Alert severity="success">{info}</Alert> : null}
          {/* the input form */}
          {userYoutubeInfo && !userYoutubeInfo.verified ? (
            <form className={classes.root} noValidate>
              <TextField
                id="outlined-basic"
                value={val.email}
                fullWidth
                disabled={disabled}
                label="email"
                className={classes.textField}
                name="email"
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                type="text"
              />
            </form>
          ) : null}
          {/* end of input form */}
          <h4>Channel</h4>
          {userYoutubeInfo && userYoutubeInfo.verified ? (
            <div className={classes.channel}>
              <div className={classes.thumbnail}>
                <ThumbNails
                  name={userYoutubeInfo.channelName}
                  size="sm"
                  url={userYoutubeInfo.thumbnail}
                  className={classes.picture}
                />
                <div className={classes.texts}>
                  <Typography variant="button" className={classes.text}>
                    @{userYoutubeInfo.channelName}
                  </Typography>
                  <Typography variant="b" className={classes.text}>
                    {userYoutubeInfo.email}
                  </Typography>
                </div>
              </div>
            </div>
          ) : (
            <ul className={classes.ol}>
              <li className={classes.li}> No Channel linked yet </li>
            </ul>
          )}
        </div>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button
          onClick={() =>
            dispatch(toggleVerifyChannelModal(!youtube.openVerifyChannel))
          }
          color="default"
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
        <Button
          onClick={verifyNow}
          disabled={userYoutubeInfo.verified || loading}
          color="secondary"
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={25} />
          ) : (
            t(userYoutubeInfo.verified ? "Verified" : "Verify Channel")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

YoutubeVerification.defaultProps = {
  disabled: false,
};
export default withTranslation()(YoutubeVerification);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  ol: {
    backgroundColor: "inherit",
    padding: 0,
  },
  li: {
    padding: "13px 12px",
    backgroundColor: "#e8e8e8",
    margin: "10px 0",
    borderRadius: "4px",
  },
  textField: {
    marginBottom: 25,
  },
  thumbnail: {
    display: "flex",

    flexDirection: "row",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  channel: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: "1rem",
    borderRadius: "10px",
    justifyContent: "flex-start",
  },
  text: {
    marginLeft: "2rem",
  },
  texts: {
    display: "flex",
    flexDirection: "column",
  },
}));
