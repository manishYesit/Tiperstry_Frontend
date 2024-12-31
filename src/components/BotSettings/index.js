import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import DeleteAccount from "./deleteAccount";
import { openSetting } from "../../store/actions";
import { withTranslation } from "../../../i18n";
import { config } from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BotSettings = ({ t }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const settingModal = useSelector(({ user }) => user.setting);
  const userSetting = useSelector(({ user }) =>
    user.user ? user.user.setting : null
  );

  const [setting, setSetting] = useState({
    upvoted: false,
    downvoted: false,
    isAIAccount: true,
    showAIContent: false,
  });

  const [open, setOpen] = useState(false);

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
  });

  React.useEffect(() => {
    if (userSetting) {
      setSetting({
        upvoted: userSetting.upvoted,
        downvoted: userSetting.downvoted,
        isAIAccount: userSetting.isAIAccount,
        showAIContent: userSetting.showAIContent
      })
    }
  }, [userSetting]);

  const handleChange = (event) => {
    setSetting({ ...setting, [event.target.name]: event.target.checked });

    if (token) {
      axios.post(
        config.changeSetting,
        { [event.target.name]: event.target.checked },
        {
          headers: { "x-auth-token": token },
        }
      );
    }
  };

  return (
    <>
      <Dialog
        open={settingModal}
        maxWidth="sm"
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Account Settings</DialogTitle>
        <DialogContent className={classes.root}>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={setting.upvoted}
                    onChange={handleChange}
                    name="upvoted"
                    color="primary"
                  />
                }
                label="Don't show me submissions after I've upvoted them (except my own)"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={setting.downvoted}
                    onChange={handleChange}
                    name="downvoted"
                    color="primary"
                  />
                }
                label="Don't show me submissions after I've downvoted them (except my own)"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={setting.showAIContent}
                    onChange={handleChange}
                    name="showAIContent"
                    color="primary"
                  />
                }
                label="Show AI-Generated Content"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={setting.isAIAccount}
                    onChange={handleChange}
                    name="isAIAccount"
                    color="primary"
                  />
                }
                label="This account posts AI-Generated Content"
              />
            </FormGroup>

            <FormGroup className={classes.formGroupBtn}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setOpen(true)}
              >
                {t("Delete Account")}
              </Button>
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button
            onClick={() =>
              dispatch(openSetting(!settingModal))
            }
            color="default"
            variant="outlined"
          >
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteAccount open={open} setOpen={setOpen} />
    </>
  );
};

export default withTranslation()(BotSettings);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  formGroupBtn: {
    marginTop: 15,
    alignContent: 'center',
  }
}));
