import React, { Component, useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import { config } from "../../../../../../config";

import { isMobile } from "react-device-detect";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const Voting = ({
  user,
  classes,
  upVotes,
  downVotes,
  topicId,
  topictitle,
  id,
}) => {
  const [initloaded, setInitLoaded] = useState(false);

  const [votes, setVotes] = useState({
    upVotes: Number(upVotes),
    downVotes: Number(downVotes),
    total: Number(upVotes) - Number(downVotes),
  });

  const [userVote, setUserVote] = useState(9999);

  if (!initloaded) {
    setTimeout(() => {
      handleGetVotes();
      setInitLoaded(true);
    }, 1000);
  }

  useEffect(() => {
    setVotes({ upVotes: Number(upVotes), downVotes: Number(downVotes) });
  }, [upVotes, downVotes]);

  let [loading, setLoading] = useState(false);
  let [loader, setLoader] = useState({
    up: false,
    down: false
  });

  const handleGetVotes = async () => {
    try {
      if (user.token) {
        const responseVotes = await axios.get(
          config.topicVote + "/" + topicId,
          {
            headers: { "x-auth-token": user.token },
          }
        );

        setUserVote(responseVotes.data.vote);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };

  const handleVote = (votingValue) => async () => {
    if (user.user == null) {
      location.href = "/login";
      return;
    }

    setLoading(true);
    if (votingValue == 1) {
      setLoader({ up: true });
    } else {
      setLoader({ down: true });
    }

    try {
      const response = await axios.put(
        config.topicVote,
        { topicId, vote: votingValue },
        { headers: { "x-auth-token": user.token } }
      );

      setLoading(false);
      if (votingValue == 1) {
        setLoader({ up: false });
      } else {
        setLoader({ down: false });
      }

      setVotes({
        vote: response.data.vote,
        total: Number(response.data.upVotes) - Number(response.data.downVotes),
        downVotes: response.data.downVotes,
        upVotes: response.data.upVotes,
      });

      setUserVote(response.data.vote);
    } catch (error) {
      setLoading(false);
      setLoader({
        up: false,
        down: false
      })
    }
  };

  return (
    <div className={classes.VoteRoot} id={id}>
      <IconButton
        disabled={loading}
        aria-label="thump ups"
        size="small"
        onClick={handleVote(1)}
        style={{ padding: 8, height: 30, width: 31 }}
      >
        {loader.up ? (
          <CircularProgress style={{ color: '#ff8b61', width: '15px', height: '15px' }} />
        ) : (
          <img
            src={
              userVote === 1
                ? "/static/up-arrow-blue.png"
                : "/static/up-arrow.png"
            }
          />
        )}
      </IconButton>
      {/* {votes.total > 0 ? <Typography variant="overline">{votes.total}</Typography> : null} */}
      {parseInt(votes.upVotes) - parseInt(votes.downVotes) == 0 && (
        <Typography variant="overline">{"Vote"}</Typography>
      )}
      {(parseInt(votes.upVotes) > 0 || parseInt(votes.downVotes) > 0) && (
        <Typography
          style={{ minWidth: 30, display: "inline-block", textAlign: "center", fontSize: 14, fontWeight: 600, color: userVote === 1 ? '#ff8b61' : (userVote === 0 ? '#9393ff' : '#757575') }}
          variant="overline"
        >
          {parseInt(votes.upVotes) - parseInt(votes.downVotes)}
        </Typography>
      )}
      <IconButton
        disabled={loading}
        aria-label="thump down"
        size="small"
        onClick={handleVote(0)}
        style={{ padding: 8, height: 30, width: 31 }}
      >
        {loader.down ? (
          <CircularProgress style={{ color: '#9393ff', width: '15px', height: '15px' }} />
        ) : (
          <img
            src={
              userVote === 0
                ? "/static/down-arrow-blue.png"
                : "/static/down-arrow.png"
            }
          />
        )}
      </IconButton>
    </div>
  );
};

const styles = ({ spacing }) => ({
  VoteRoot: isMobile
    ? {
      display: "flex",
      alignItems: "center",
      padding: spacing(0.5, 0),
    }
    : {
      display: "flex",
      flexDirection: "column",
      padding: spacing(0.5, 1),
    },
});

export default connect(mapStateToProps)(withStyles(styles)(Voting));
