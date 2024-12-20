import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import NotificationsActiveIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';

import axios from "axios";
import { config } from "../../../config";
import Box from "@material-ui/core/Box";
import ThumbNails from "../ThumbNails";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setNotificationData, toggleNotification } from "../../store/actions";
import { connect } from "react-redux";


const mapDispatchToProps = {
  toggleNotification,
};

const NotificationsIcon = ({ toggleNotification }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handleClick = (event) => {
    // handleNotifications();
    // setAnchorEl(event.currentTarget);
    // handleMarkReadNotifications();
  };

  React.useEffect(() => {
    handleNotificationsCount();
    const clearInter = setInterval(() => {
      handleNotificationsCount();
    }, 200000);
    return () => {
      clearInterval(clearInter);
    };
  }, []);

  const handleNotificationsCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const notify = await axios.get(config.notificationCount, {
        headers: { "x-auth-token": token },
      });

      setCount(notify.data.count);
    } catch (error) {
    }
  };

  const handleMarkReadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(config.notificationRead, {
        headers: { "x-auth-token": token },
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Tooltip title="Notifications">
    <IconButton onClick={() => {toggleNotification();handleMarkReadNotifications();setCount(0);}}>
      <Badge color="error" max={9} badgeContent={count}>
        <NotificationsActiveIcon style={{ color: "white" }} />
      </Badge>
    </IconButton>
    </Tooltip>
  );
};

export default connect(null, mapDispatchToProps)(NotificationsIcon);


const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    height: 200,
    minWidth: 250,
    maxWidth: 450,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  msg: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    textTransform: "initial"
  }
}));