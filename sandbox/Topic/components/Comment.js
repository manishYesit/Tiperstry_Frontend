import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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



const Comment = ({ data, name, t, i18n }) => {
  const classes = useStyles();
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: "",
  });

  console.log("i18n", i18n);

  useEffect(() => {
    let comment;
    if (data.replied) {
      // comment = setTimeout(() => {
      handleReply();
      // }, 2000);
    }
    // return () => {
    //   clearTimeout(comment);
    // };
  }, []);

  const handleReply = async () => {
    try {
      setLoading(true);
      const trans = await axios.get(config.reply + "/" + data._id);

      // // console.log("trans", trans);

      setReplies(trans.data);
    } catch (error) {
      setLoading(false);
      // console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"baseline"}
          justifyContent={"flex-start"}
          ml={1}
        >
          {data.userId ? (
            <Typography
              component="a"
              color="primary"
              href={"/p/" + data.userId.username}
              className={classes.heading}
            >
              @{data.userId.username}
            </Typography>
          ) : (
            <Typography
              component="a"
              color="primary"
              className={classes.heading}
            >
              {t("Anonymous")}
            </Typography>
          )}
        </Box>
        <Box display={"flex"} alignItems={"center"} ml={1}>
          <p className={classes.value}>
            {data.content.split("\n").map(function (item, key) {
              return (
                <span key={key}>
                  <Linkify tagName="span">{item}</Linkify>
                  <br />
                </span>
              );
            })}
          </p>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          ml={1}
        >
          <CommentAction
            userId={data.userId}
            topicId={data.topicId}
            name={name}
            commentId={data._id}
            votesCount={data.votesCount}
            username={data.userId && data.userId.username}
            replyCount={data.replyCount}
          />
          <p className={classes.subheader}>
            {moment(data.createdAt)
              .locale(typeof i18n.language !== "undefined" ? (i18n.language == "cn" ? "zh_cn" : i18n.language) : "en")
              .fromNow()}
          </p>
        </Box>
        {data.userId && <DisplayCommentTips commentId={data._id} />}
      </Card>

      {/* {data.replyCount > 0 && (
        <Box>
          <Button color="primary">Load {data.replyCount} more replies</Button>
        </Box>
      )} */}

      <div style={{ marginLeft: 10 }}>
        {replies.map((reply, index) => (
          <Comment data={reply} name="Reply" t={t} key={reply._id} i18n={i18n} t={t} />
        ))}
      </div>
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
      borderLeft: "3px solid #3a6cc5",
      backgroundColor: "transparent",
      borderRadius: 0,
      "&:hover": {
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
        // transform: "scale(1.04)"
        transform: "scale(1.01)"
      },
      // boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
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
      marginBottom: 0
    },
    subheader: {
      fontFamily: family,
      fontSize: 11,
      margin: 0,
      marginTop: -5,
      color: palette.grey[600]
      // letterSpacing: "1px",
      // marginBottom: 4
    },
    value: {
      marginLeft: 2,
      margin: 1,
      fontSize: 14,
      color: palette.grey[800],
      textAlign: "left"
    }
  };
});

