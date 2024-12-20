import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Report from "@material-ui/icons/Report";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/DeleteForever";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, openReport, setEditTopic } from "../../../store/actions";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { config } from "../../../../config";
import { useRouter } from "next/router";
import { withTranslation } from "../../../../i18n";
import BlockIcon from "@material-ui/icons/Block";
import PersonPinIcon from "@material-ui/icons/PersonPin";

const Options = ({ userId, topicId, t, topic }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, user } = useSelector(({ user }) => user);

  const [blockingerror, setBlockingerror] = React.useState(false);
  const [blockingsuccess, setBlockingsuccess] = React.useState(false);

  const followStatus = user && user.topicFollowing.includes(topicId);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFollowingTopic = async () => {
    try {
      setLoading(true);
      const follow = await axios.put(
        config.topicFollow + "/" + topicId,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      const userDetails = await axios.get(config.me, {
        headers: { "x-auth-token": token },
      });

      dispatch(setUserData(userDetails.data));
      sessionStorage.setItem("userData", userDetails.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // // console.log("error", error);
    }
  };

  const handleTopicDelete = async () => {
    try {
      setLoading(true);
      const follow = await axios.delete(config.deleteFollow + "/" + topicId, {
        headers: { "x-auth-token": token },
      });

      window.location.href = '/';
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      console.log("error", error.response);
    }
  };

  const blockUser = async (post) => {
    if (post.userId._id == user._id) alert("Cannot block yourself");
    else {
      const follow = await axios.put(
        config.userblock,
        {
          userid: post.userId._id,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      location.reload();
    }
  };

  const setStickyStatus = async (post) => {
    await axios.post(
      config.setstickystatus,
      {
        topicId: topicId,
        groupId: topic.groupId,
      },
      {
        headers: { "x-auth-token": token },
      }
    );

    location.reload();
  };

  let show = false;
  if (user) {
    if (user.isAdmin) {
      show = true;
    }
    if (userId) {
      if (user._id === userId._id) {
        show = true;
      }
    }
    
    if (user && topic && topic.group) {
		  if (topic.group.moderators.includes(user._id) || topic.group.userId === user._id) {
		    show = true;
		  }
    }
  }

  let show2 = false;
  if (user && topic && topic.group) {
    if (user.isAdmin) {
      show2 = true;
    }
    if (userId) {
      if (topic.group.moderators.includes(user._id) || topic.group.userId === user._id) {
        show2 = true;
      }
    }
  }
  
  let show3 = false;
  if (user && userId) {
    if (user._id != userId._id) {
      show3 = true;
    }
  }

  const banUser = async (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        config.banusergroup,
        {
          groupId: topic.groupId,
          userId: userId,
        },
        {
          headers: { "x-auth-token": token },
        }
      );
    }
  };

  return (
    user && (
      <div className={classes.root}>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          style={{ padding: "0px", marginLeft: "5px" }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        	{show3 && (
		        <MenuItem
		          onClick={handleFollowingTopic}
		          disabled={loading}
		          style={{ fontSize: 12, padding: "5px 16px" }}
		        >
		          {followStatus ? (
		            <>
		              <Remove style={{ fontSize: 15 }} />
		              <Typography variant="overline">
		                {t("Stop Receiving Update")}
		              </Typography>
		            </>
		          ) : (
		            <>
		              <Add style={{ fontSize: 15 }} />
		              <Typography variant="overline">{t("Follow Post")}</Typography>
		            </>
		          )}
		        </MenuItem>
		     	)}  
		        
          <MenuItem
            onClick={() => dispatch(openReport(topicId))}
            style={{ fontSize: 12, padding: "5px 16px" }}
          >
            <Report style={{ fontSize: 15 }} />
            <Typography variant="overline">{t("Report Post")}</Typography>
          </MenuItem>
          
          {show3 && (
		        <MenuItem
		          onClick={() => blockUser(topic)}
		          style={{ fontSize: 12, padding: "5px 16px" }}
		        >
		          <BlockIcon style={{ fontSize: 15 }} />
		          <Typography variant="overline">{t("Block User")}</Typography>
		        </MenuItem>
		    	)}    

          {show && (
            <MenuItem
              onClick={handleTopicDelete}
              style={{ fontSize: 12, padding: "5px 16px" }}
            >
              <Delete style={{ fontSize: 15 }} />
              <Typography variant="overline">{t("Delete")}</Typography>
            </MenuItem>
          )}

          {topic && topic.groupId && topic.group && show2 &&  (
            <>
              {user && topic.userId != user._id && (
                <MenuItem
                  onClick={() => {
                    banUser(topic.userId);
                  }}
                  style={{ fontSize: 12, padding: "5px 16px" }}
                >
                  <BlockIcon style={{ fontSize: 15 }} />
                  <Typography variant="overline">{t("Ban User")}</Typography>
                </MenuItem>
              )}

              <MenuItem
                onClick={setStickyStatus}
                style={{ fontSize: 12, padding: "5px 16px" }}
              >
                <PersonPinIcon style={{ fontSize: 15 }} />
                <Typography variant="overline">
                  {topic.issticky ? t("Remove Sticky") : t("Sticky")}
                </Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default withTranslation()(Options);

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Report from '@material-ui/icons/Report';
// import Add from '@material-ui/icons/Add';
// import Remove from '@material-ui/icons/Remove';
// import IconButton from '@material-ui/core/IconButton';
// import Delete from "@material-ui/icons/DeleteForever";
// import withStyles from "@material-ui/core/styles/withStyles";

// class Options extends React.Component {
//   state = {
//     anchorEl: null,
//     userFollowing: [],
//     topicFollowing: [],
//     report: false,
//     del: false
//   };

//   handleClick = event => {
//     this.setState({ anchorEl: event.currentTarget });
//   };

//   handleClose = () => {
//     this.setState({ anchorEl: null });
//   };

//   render() {
//     const { anchorEl } = this.state
//     const { classes } = this.props;

//     return (
//       <div className={classes.root} >
//         <IconButton
//           aria-owns={anchorEl ? 'simple-menu' : undefined}
//           aria-haspopup="true"
//           onClick={this.handleClick}
//         >
//           <MoreVertIcon />
//         </IconButton>
//         <Menu
//           id="simple-menu"
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={this.handleClose}
//         >
//           <MenuItem style={{ fontSize: 12, padding: "5px 16px" }}>
//             <Remove style={{ fontSize: 15 }} />
//             &nbsp;
//             Following Post
//           </MenuItem>
//           <MenuItem style={{ fontSize: 12, padding: "5px 16px" }}>
//             <Report style={{ fontSize: 15 }} />
//             &nbsp;
//             Report post
//           </MenuItem>
//           <MenuItem style={{ fontSize: 12, padding: "5px 16px" }}>
//             <Delete style={{ fontSize: 15 }} />
//             &nbsp;
//             Delete
//           </MenuItem>
//         </Menu>
//       </div>
//     );
//   }
// }

// const styles = theme => ({
//   root: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });

// export default withStyles(styles)(Options);
