import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import NotificationsActiveIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { config } from "../../../config";
import Box from "@material-ui/core/Box";
import ThumbNails from "../ThumbNails";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";




export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handleClick = event => {
    
    handleNotifications();
    setAnchorEl(event.currentTarget);
    handleMarkReadNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
	};


	React.useEffect(() => {
    handleNotificationsCount();
		const clearInter = setInterval(() => {
      handleNotificationsCount();
    }, 200000);
    return () => {
      clearInterval(clearInter);
    };
	}, [])
  

	const handleNotifications = async () => {
		try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const notify = await axios.get(config.notification, {
        headers: { "x-auth-token": token }
      });

      console.log("notify", notify);

      setNotify(notify.data);
      setLoading(false);
		} catch (error) {
			console.log("error", error);
      console.log("error", error.response);
      setLoading(false)
      
		}
  } 


  const handleMarkReadNotifications = async () => {
    try {
      
      const token = localStorage.getItem("token");
      await axios.get(config.notificationRead, {
        headers: { "x-auth-token": token }
      });
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
      setLoading(false);
    }
  }; 

  const handleNotificationsCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const notify = await axios.get(config.notificationCount, {
        headers: { "x-auth-token": token }
      });

      console.log("notify", notify);

      setCount(notify.data.count);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
    }
  }; 
  
  const displayGiftNotification = (data) => {
    return (
      <Box
        key={data._id}
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
        style={{ textDecoration: "none" }}
        component="a"
        href={"/topics/" + data.topicId._id + "/" + data.topicId.title}
      >
        <ThumbNails
          name={data.initiatorId.username}
          size="xs"
          url={data.initiatorId.img}
        />
        <Typography variant="overline" className={classes.msg}>
          You have been gifted {data.transactionId.amount} of&nbsp;
          {data.transactionId.walletType} by&nbsp;
          <Typography
            color="primary"
            component="a"
            style={{ fontSize: 12 }}
            href={"/p/" + data.initiatorId.username}
          >
            &nbsp;@{data.initiatorId.username}
          </Typography>
        </Typography>
      </Box>
    );
  }

  const displayFollowersNotification = data => {
    return (
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
      >
        <ThumbNails
          name={data.initiatorId.username}
          size="xs"
          url={data.initiatorId.img}
        />
        <Typography variant="overline" className={classes.msg}>
          <Typography
            color="primary"
            component="a"
            style={{ fontSize: 12 }}
            href={"/p/" + data.initiatorId.username}
          >
            {"  "}@{data.initiatorId.username}
          </Typography>
          &nbsp;has started following you.
        </Typography>
      </Box>
    );
  };


  const displayCommentNotification = data => {
    return (
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
        component="a"
        style={{ textDecoration: "none" }}
        href={"/topics/" + data.topicId._id + "/" + data.topicId.title}
      >
        <ThumbNails
          name={data.initiatorId ? data.initiatorId.username : "Anonymous"}
          size="xs"
          url={data.initiatorId ? data.initiatorId.img : null}
        />
        <Typography variant="overline" className={classes.msg}>
          {data.initiatorId ? (
            <Typography
              color="primary"
              component="a"
              style={{ fontSize: 12 }}
              href={"/p/" + data.initiatorId.username}
            >
              {"  "}@{data.initiatorId.username}
            </Typography>
          ) : (
            "Someone"
          )}
          &nbsp;{" "}
          {data.type === "comment"
            ? "commented on your post"
            : "replied your comment"}
        </Typography>
      </Box>
    );
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge style={{ color: "red" }} max={9} badgeContent={count}>
          <NotificationsActiveIcon style={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={0} className={classes.paper}>
            {notify.length === 0 ? (
              <Typography>You currently don't have any notification</Typography>
            ) : (
              notify.map(noty => (
                <React.Fragment key={noty._id}>
                  {noty.type === "gift" && displayGiftNotification(noty)}
                  {noty.type === "follower" &&
                    displayFollowersNotification(noty)}
                  {noty.type === "comment" ||
                    (noty.type === "reply" && displayCommentNotification(noty))}
                </React.Fragment>
              ))
            )}
          </Paper>
        )}
      </Popover>
    </div>
  );
}


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