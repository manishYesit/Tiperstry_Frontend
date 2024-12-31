import React from "react";
import ThumbNails from "../../../components/ThumbNails";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import moment from "moment";
import { withTranslation } from "../../../../i18n";
import Linkify from "linkifyjs/react";
import CommentAction from "../../Topic/components/CommentAction";
import DisplayCommentTips from "../../Topic/components/DisplayCommentTips";

const CommentProfile = ({ comment, t, i18n }) => {
  const classes = useStyles();

  // Markup text comment
  const markupText = (data) => {
    if (data) {
      data = data.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      data = data.replace(/\__(.*?)\__/g, '<i>$1</i>');
      data = data.replace(/\~~(.*?)\~~/g, '<strike>$1</strike>');
      data = data.replace(/\```(.*?)\```/g, '<code>$1</code>');
      data = data.replace(/\<>(.*?)\<\/>/g, '<code>$1</code>');
      data = data.replace(/((http:|https:)[^\s]+[\w])/g, '<a href="$1" target="_blank">$1</a>');
    }

    return data;
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <ThumbNails
          name={comment.userId.username}
          size="xs"
          url={comment.userId && comment.userId.img}
        />
        <Box ml={1} display="flex" flexDirection="column">
          {comment.userId ? (
            <Typography
              align="left"
              color="primary"
              component="a"
              href={comment.userId.isDeleted ? "#" : "/p/" + comment.userId.username}
            >
              {comment.userId.isDeleted ? (
                <>
                  {"[Deleted]"}
                </>
              ) : (
                <>
                  {comment.userId.username}
                </>
              )}
            </Typography>
          ) : (
            <Typography align="left" color="primary">
              {t("Anonymous")}
            </Typography>
          )}
          <Typography align="left" variant="caption">
            {moment(comment.createdAt)
              .locale(
                typeof i18n.language !== "undefined"
                  ? i18n.language == "cn"
                    ? "zh_cn"
                    : i18n.language
                  : "en"
              )
              .fromNow()}
          </Typography>
        </Box>

        <div style={{ flexGrow: 1 }} />
      </div>
      <div className={classes.body}>
        <Typography align="left">
          {comment.content.split("\n").map(function (item, key) {
            return (
              <span key={key}>
                <span dangerouslySetInnerHTML={{ __html: markupText(item) }}></span>
                <br />
              </span>
            );
          })}
        </Typography>
      </div>

      {comment.commentId && (
        <div className={classes.comment}>
          <Typography align="left" color="primary" variant="overline">
            {t("Replying to")}
          </Typography>
          <Typography align="left">
            {comment.commentId.content.split("\n").map(function (item, key) {
              return (
                <span key={key}>
                  <span dangerouslySetInnerHTML={{ __html: markupText(item) }}></span>
                  <br />
                </span>
              );
            })}
          </Typography>
        </div>
      )}

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        ml={1}
      >
        <CommentAction
          userId={comment.userId}
          topicId={comment.topicId}
          topicTitle={comment.topicId.title}
          name={name}
          commentId={comment._id}
          votesCount={comment.votesCount}
          username={comment.userId && comment.userId.username}
          replyCount={comment.replyCount}
          content={comment.content}
        />
        <p className={classes.subheader}>
          {moment(comment.createdAt)
            .locale(
              typeof i18n.language !== "undefined"
                ? i18n.language == "cn"
                  ? "zh_cn"
                  : i18n.language
                : "en"
            )
            .fromNow()}
        </p>
      </Box>
      {comment.userId && <DisplayCommentTips commentId={comment._id} />}
      {comment.topicId && (
        <div className={classes.action}>
          <Button
            variant="text"
            href={
              "/topics/" + comment.topicId._id + "/" + comment.topicId.title
            }
            size="small"
            color="primary"
          >
            {t("View Post")}
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default withTranslation()(CommentProfile);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    width: "100%",
    padding: theme.spacing(1),
    margin: theme.spacing(1.5, 0),
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  body: {
    margin: theme.spacing(0.5, 1),
  },
  comment: {
    // margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(8),
    borderRadius: 5,
    border: "1px solid #d1d1d18c",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));
