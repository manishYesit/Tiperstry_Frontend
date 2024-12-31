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
import { openBotSetting } from "../../store/actions";
import { withTranslation } from "../../../i18n";
import { config } from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BotSettings = ({ t }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const settingModal = useSelector(({ bot }) => bot.setting);
  const botSetting = useSelector(({ bot }) =>
    bot.bot ? bot.bot.setting : null
  );

  const [setting, setSetting] = useState({
    isBotEnabled: true
  });

  const [open, setOpen] = useState(false);

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
  });

  React.useEffect(() => {
    if (botSetting) {
      setSetting({
        isBotEnabled: botSetting.isBotEnabled
      })
    }
  }, [botSetting]);

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
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-slide-title">Bot Settings</DialogTitle>
        <DialogContent className={classes.root}>
          <div>
            <FormGroup>

              <FormControlLabel
                control={
                  <Switch
                    checked={setting.isBotEnabled}
                    onChange={handleChange}
                    name="isBotEnabled"
                    color="primary"
                  />
                }
                label = {
                  setting.isBotEnabled
                    ? "Disable the bot"
                    : "Enable the bot"
                }
              />

            </FormGroup>

            <FormGroup className={classes.formGroupBtn}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setOpen(true)}
              >
                {t("Delete Bot")}
              </Button>
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button
            onClick={() =>
              dispatch(openBotSetting(!settingModal))
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
  },
  dialogPaper: {
    minWidth: '300px',
  },
}));
