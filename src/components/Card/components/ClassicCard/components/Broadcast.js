import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import {
  setElementId,
  toggleBroadcast,
  setBroadcastTopicId,
} from "../../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import { connect } from "react-redux";

const mapDispatchToProps = {
  toggleBroadcast,
  setBroadcastTopicId,
  //   setTopicId,
};

const Broadcast = (props) => {
  const classes = useStyles();
  const { toggleBroadcast, topicId } = props;
  const dispatch = useDispatch();

  const handleBroadcast = () => {
    toggleBroadcast();

    dispatch(setBroadcastTopicId(topicId));
  };

  return (
    <>
      {/* <IconButton aria-label="broadcast a post" onClick={handleBroadcast}>
        <img
          src="/static/icons/broadcast.png"
          alt="broadcast"
          width="25"
          height="25"
          style={{ color: "#1F7BD8", opacity: 0.55 }}
        />
      </IconButton> */}
      <Typography style={{ cursor: "pointer", color: "gray", fontSize: 12 }} onClick={handleBroadcast}>&emsp;promote</Typography>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
}));

export default connect(null, mapDispatchToProps)(Broadcast);
