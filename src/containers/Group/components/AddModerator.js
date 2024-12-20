import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import ThumbNails from "../../../components/ThumbNails";

import { toggleVerifyChannelModal } from "../../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "../../../../i18n";
import TextField from "@material-ui/core/TextField";

import { config } from "../../../../config";
import { openModeratorModal } from "../../../store/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddModerator = ({ t, disabled, groupId, loadSideBarData }) => {
  const group = useSelector(({ group }) => group);

  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState({
    username: "",
    moderatorId: "",
    percentage: 0,
    groupId,
  });

  const [info, setInfo] = useState(null);
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
  });

  const handleChange = (event) => {
    setVal({ 
      ...val,
      [event.target.name]: event.target.value.trim() 
    });
  };

  const verifyUser = async () => {
    if (val.username == "") {
      return;
    }
    setLoading(true);
    if (token) {
      await axios
        .get(config.profile + `/${val.username}`)
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

  const addModerator = async () => {
    const token = localStorage.getItem("token");
    if ((info && !info._id) || info == null) {
      setRes({
        msg: "invalid user",
        err: true,
        status: "error",
      });
      return;
    }

    if (val.percentage < 0) {
      setRes({
        msg: "percentage must be greater than 0",
        err: true,
        status: "error",
      });
      return;
    }

    if (token) {
      await axios
        .post(
          config.addremovemoderator,
          {
            userId: info._id,
            percentage: val.percentage,
            groupId: groupId,
          },
          { headers: { "x-auth-token": token } }
        )
        .then((response) => {
          setLoading(false);
          setRes({
            msg: response.data.message,
            err: false,
            status: response.data.status,
          });
          loadSideBarData();
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          if (error.response.status == 500) {
            return setRes({
              msg: "server error",
              err: true,
              status: "error",
            });
          }
          console.log(error.response);
          setRes({
            msg: error.response.data.message,
            err: !error.response.data.success,
            status: "error",
          });
          setError(error.response.data.message);
        });
    }
  };

  return (
    <Dialog
      open={group.openModerator}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Add Moderator </DialogTitle>
      <DialogContent className={classes.root}>
        <div>
          <p>
            To add a moderator, input the username of the moderator in the field
            below
          </p>

          {res.err && (
            <Alert severity={res.status} className={classes.alert}>
              {res.msg}
            </Alert>
          )}
          {res.status == "success" && (
            <Alert severity="success" className={classes.alert}>
              {res.msg}
            </Alert>
          )}
          {/* the input form */}
          <form className={classes.root} noValidate>
            <TextField
              id="outlined-basic"
              value={val.username}
              fullWidth
              label="username"
              className={classes.textField}
              name="username"
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              type="text"
            />
            <Button
              onClick={verifyUser}
              disabled={loading}
              color="secondary"
              variant="contained"
              className={classes.formButton}
            >
              {loading ? <CircularProgress size={25} /> : t("Get User")}
            </Button>
          </form>
          {/* end of input form */}
          <h4>Moderator</h4>
          {info != null && info.username != undefined ? (
            <div className={classes.channel}>
              <div className={classes.thumbnail}>
                <ThumbNails
                  name={info.username}
                  size="sm"
                  url={config.getImage + info.img}
                  className={classes.picture}
                />
                <div className={classes.texts}>
                  <Typography variant="button" className={classes.text}>
                    @{info.username}
                  </Typography>
                </div>
              </div>
            </div>
          ) : (
            <ul className={classes.ol}>
              <li className={classes.li}> No User Found </li>
            </ul>
          )}
          <TextField
            id="outlined-basic"
            value={val.percentage}
            fullWidth
            label="percentage  %"
            className={classes.textField}
            name="percentage"
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            type="number"
          />
        </div>
      </DialogContent>
      <DialogActions style={{ padding: "20px" }}>
        <Button
          onClick={() => {
            return dispatch(openModeratorModal());
          }}
          color="default"
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
        <Button
          onClick={addModerator}
          disabled={loading}
          color="secondary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Make Moderator")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddModerator.defaultProps = {
  disabled: false,
};
export default withTranslation()(AddModerator);

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
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
    // marginBottom: 25,
    marginRight: "1rem",
    // alignSelf: "flex-start",
    flex: 3,
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
  formButton: {
    flex: 1,
    // alignSelf: "flex-start",
  },
}));
