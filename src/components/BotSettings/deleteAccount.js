import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

import { setUserData } from "../../store/actions";
import { withTranslation } from "../../../i18n";
import { config } from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteAccount = ({ t, open, setOpen }) => {
  const router = useRouter();
  const classes = useStyles();

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
  });

  const confirmDelete = async () => {
    try {
      if (token) {
        await axios.get(config.deleteAccount, { headers: { "x-auth-token": token } });

        setOpen(false);

        localStorage.removeItem("token");
        setUserData(null);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Delete Account</DialogTitle>
      <DialogContent className={classes.root}>
        <div>
          <Typography style={{ color: '#ff0000' }}>
            Are you sure? want to delete your account.
          </Typography>

          <FormGroup className={classes.formGroupBtn}>
            <Button
              color="primary"
              variant="outlined"
              onClick={confirmDelete}
            >
              {t("Confirm")}
            </Button>

            <Button
              color="default"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              {t("Cancel")}
            </Button>
          </FormGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(DeleteAccount);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  formGroupBtn: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '10px'
  }
}));
