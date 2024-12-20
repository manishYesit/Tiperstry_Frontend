import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import cx from "clsx";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import ThumbNails from '../../../components/ThumbNails';
import CommentAction from "./CommentAction";
import axios from "axios";
import { config } from "../../../../config";
import DisplayCommentTips from "./DisplayCommentTips";
import { withTranslation } from "../../../../i18n"
import Linkify from "linkifyjs/react";
import Vote from "./Vote";
import CircularProgress from '@material-ui/core/CircularProgress';

const Comment = ({ data, name, t, i18n, singleTopic, setCollapsed, collapsed }) => {
  const classes = useStyles();
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });

  const [votes, setVotes] = useState({
    vote: 2,
    voteCount: 0,
  });

  let [loader, setLoader] = useState({
    up: false,
    down: false
  });

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    let comment;
    if (data.replied) {
      handleReply();
    }

    if (token) {
      handleGetVotes();
    }
  }, []);

  const handleReply = async () => {
    try {
      setLoading(true);
      const trans = await axios.get(config.reply + "/" + data._id);

      setReplies(trans.data);
    } catch (error) {
      setLoading(false);

      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleGetVotes = async () => {
    try {
      const votesData = await axios.get(config.commentVote + "/" + data._id, {
        headers: { "x-auth-token": token }
      });

      setVotes({
        vote: votesData.data.vote,
        voteCount: data.votesCount
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleVote = (votingValue, commentId) => async () => {
    if (token == null) {
      location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      if (votingValue == 1) {
        setLoader({ up: true });
      } else {
        setLoader({ down: true });
      }

      const votesData = await axios.put(
        config.commentVote,
        { commentId: commentId, vote: votingValue },
        { headers: { "x-auth-token": token } }
      );

      setVotes({
        vote: votesData.data.vote,
        voteCount: votesData.data.count,
      });

      setLoading(false);
      if (votingValue == 1) {
        setLoader({ up: false });
      } else {
        setLoader({ down: false });
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setLoader({
        up: false,
        down: false
      })
    }
  };

  // Markup text comment
  const markupText = (data) => {
    data = data.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    data = data.replace(/\__(.*?)\__/g, '<i>$1</i>');
    data = data.replace(/\~~(.*?)\~~/g, '<strike>$1</strike>');
    data = data.replace(/\```(.*?)\```/g, '<code>$1</code>');
    data = data.replace(/\<>(.*?)\<\/>/g, '<code>$1</code>');
    data = data.replace(/((http:|https:)[^\s]+[\w])/g, '<a href="$1" target="_blank">$1</a>');

    return data;
  }

  return (
    <>
      {
        collapsed ? (
          <>
            <div style={{ display: 'inline-block', float: 'left', marginRight: 5 }}>
              {/* <Vote
                commentId={data._id}
                count={data.votesCount}
              /> */}
              <IconButton
                size="small"
                disabled={loading}
                aria-label="thump ups"
                onClick={handleVote(1, data._id)}
                style={{ display: 'block' }}
              >
                {loader.up ? (
                  <CircularProgress style={{ color: '#ff8b61', width: '15px', height: '15px' }} />
                ) : (
                  <img src={votes.vote === 1 ? "/static/up-arrow-blue.png" : "/static/up-arrow.png"} />
                )}
              </IconButton>
              <IconButton
                disabled={loading}
                size="small"
                aria-label="thump down"
                onClick={handleVote(0, data._id)}
              >
                {loader.down ? (
                  <CircularProgress style={{ color: '#9393ff', width: '15px', height: '15px' }} />
                ) : (
                  <img src={votes.vote === 0 ? "/static/down-arrow-blue.png" : "/static/down-arrow.png"} />
                )}
              </IconButton>
            </div>
            <Box
              flexDirection="column"
              alignItems={"baseline"}
              justifyContent={"flex-start"}
              ml={1}
            >
              {data.userId ? (
                <>
                  {/* <Avatar
                    alt={data.userId.username}
                    src={config.getImage + data.userId.img}
                    className={classes.large}
                  /> */}
                  <span style={{ color: "black", cursor: 'pointer' }} onClick={() => { setCollapsed(false) }}><b>[+]</b></span>
                  &nbsp;
                  <Typography
                    component="a"
                    style={{ color: "#2525e1" }}
                    href={data.userId.isDeleted ? "#" : "/p/" + data.userId.username}
                    className={classes.heading}
                  >
                    {data.userId.isDeleted ? (
                      <>
                        {"[Deleted]"}
                      </>
                    ) : (
                      <>
                        {data.userId.username}
                      </>
                    )}
                  </Typography>
                  {singleTopic && data.userId && data.userId._id === singleTopic.userId._id && <span style={{ color: "#0079d3", fontWeight: 500, marginLeft: 5 }}>OP</span>}
                </>
              ) : (
                <Typography
                  component="a"
                  color="primary"
                  className={classes.heading}
                >
                  {t("Anonymous")}
                </Typography>
              )}
              &nbsp;&nbsp;
              <span style={{ color: '#757575' }}>{(votes.voteCount > 1) ? votes.voteCount + ' points' : votes.voteCount + ' point'}</span>
              &nbsp;&nbsp;
              <span style={{ color: '#757575' }}>
                {moment(data.createdAt)
                  .locale(
                    typeof i18n.language !== "undefined" ? (i18n.language == "cn" ? "zh_cn" : i18n.language) : "en"
                  )
                  .fromNow()
                }
              </span>
            </Box>
          </>
        )
          :
          (
            <>
              <Card className={classes.card} elevation={0}>
                <div style={{ display: 'inline-block', float: 'left', marginRight: 5 }}>
                  {/* <Vote
                    commentId={data._id}
                    count={data.votesCount}
                  /> */}
                  <IconButton
                    size="small"
                    disabled={loading}
                    aria-label="thump ups"
                    onClick={handleVote(1, data._id)}
                    style={{ display: 'block' }}
                  >
                    {loader.up ? (
                      <CircularProgress style={{ color: '#ff8b61', width: '15px', height: '15px' }} />
                    ) : (
                      <img src={votes.vote === 1 ? "/static/up-arrow-blue.png" : "/static/up-arrow.png"} />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={loading}
                    aria-label="thump down"
                    onClick={handleVote(0, data._id)}
                  >
                    {loader.down ? (
                      <CircularProgress style={{ color: '#9393ff', width: '15px', height: '15px' }} />
                    ) : (
                      <img src={votes.vote === 0 ? "/static/down-arrow-blue.png" : "/static/down-arrow.png"} />
                    )}
                  </IconButton>
                </div>
                <Box
                  flexDirection="column"
                  alignItems={"baseline"}
                  justifyContent={"flex-start"}
                  ml={1}
                >
                  {data.userId ? (
                    <>
                      {/* <Avatar
                        alt={data.userId.username}
                        src={config.getImage + data.userId.img}
                        className={classes.large}
                      /> */}
                      {setCollapsed && <span style={{ color: "black", cursor: 'pointer' }} onClick={() => { setCollapsed(true) }}><b>[-]</b></span>}
                      &nbsp;
                      <Typography
                        component="a"
                        style={{ color: "#2525e1" }}
                        href={data.userId.isDeleted ? "#" : "/p/" + data.userId.username}
                        className={classes.heading}
                      >
                        {data.userId.isDeleted ? (
                          <>
                            {"[Deleted]"}
                          </>
                        ) : (
                          <>
                            {data.userId.username}
                          </>
                        )}
                      </Typography>
                      {singleTopic && data.userId && data.userId._id === singleTopic.userId._id && <span style={{ color: "#0079d3", fontWeight: 500, marginLeft: 5 }}>OP</span>}
                    </>
                  ) : (
                    <Typography
                      component="a"
                      color="primary"
                      className={classes.heading}
                    >
                      {t("Anonymous")}
                    </Typography>
                  )}
                  &nbsp;&nbsp;
                  <span style={{ color: '#757575' }}>{(votes.voteCount > 1) ? votes.voteCount + ' points' : votes.voteCount + ' point'}</span>
                  &nbsp;&nbsp;
                  <span style={{ color: '#757575' }}>
                    {moment(data.createdAt)
                      .locale(
                        typeof i18n.language !== "undefined" ? (i18n.language == "cn" ? "zh_cn" : i18n.language) : "en"
                      )
                      .fromNow()
                    }
                  </span>

                </Box>
                <Box display={"flex"} alignItems={"center"} ml={1}>
                  <p className={classes.value}>
                    {data.deleted ? (
                      <>
                        {data.deletedBy == 'self' ? (
                          <>
                            {t("[Deleted]")}
                          </>
                        ) :
                          <>
                            {t("[Removed]")}
                          </>
                        }
                      </>
                    ) :
                      <>
                        {data.content.split("\n").map(function (item, key) {
                          return (
                            <span key={key}>
                              <span dangerouslySetInnerHTML={{ __html: markupText(item) }}></span>
                              <br />
                            </span>
                          );
                        })
                        }
                      </>
                    }
                  </p>
                </Box>
                {!data.deleted && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    style={{ marginLeft: 28 }}
                  >
                    <CommentAction
                      userId={data.userId}
                      topicId={data.topicId}
                      name={name}
                      commentId={data._id}
                      votesCount={data.votesCount}
                      username={data.userId && data.userId.username}
                      replyCount={data.replyCount}
                      content={data.content}
                      topic={singleTopic}
                    />

                  </Box>
                )}
                {data.userId && <DisplayCommentTips commentId={data._id} />}
              </Card>

              {/* {data.replyCount > 0 && (
                <Box>
                  <Button color="primary">Load {data.replyCount} more replies</Button>
                </Box>
              )} */}

              <div style={{ marginLeft: 20 }}>
                {replies.map((reply, index) => (
                  <Comment
                    singleTopic={singleTopic}
                    data={reply}
                    name="Reply"
                    t={t}
                    key={reply._id}
                    i18n={i18n}
                  />
                ))}
              </div>
            </>
          )
      }

    </>
  );
};

Comment.defaultProps = {
  name: "Comment"
};

export default withTranslation()(Comment);


const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      padding: spacing(0.5),
      minWidth: 288,
      // borderLeft: "3px solid #f2f3f5",
      backgroundColor: "transparent",
      borderRadius: 0,
      "& > *:nth-child(1)": {
        marginRight: spacing(2)
      },
      "& > *:nth-child(2)": {
        flex: "auto"
      }
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 14,
      marginBottom: 0,
      textDecoration: 'none'
    },
    subheader: {
      fontFamily: family,
      fontSize: 11,
      margin: 0,
      marginTop: -5,
      color: palette.grey[600]
    },
    value: {
      marginLeft: 2,
      margin: 1,
      fontSize: 14,
      color: "black",
      textAlign: "left",
      fontFamily: 'verdana, arial, helvetica, sans-serif',
    }
  };
});

