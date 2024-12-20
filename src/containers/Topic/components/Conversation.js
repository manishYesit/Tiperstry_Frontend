import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Sort from "../../Topic/components/Sort";
import CommentThread from "./CommentThread";

const Conversation = () => {
  const classes = useStyles();
  var comments = useSelector(({ comment: { comments } }) => comments);

  const user = useSelector(({ user }) => user);
  const singleTopic = useSelector(({ topics: { singleTopic } }) => singleTopic);
  if (comments_paginated)
    setCommentsPaginated(comments_paginated.concat(comments.slice(start, end)));
  /* Pagination optimization*/
  const perPage = 100;
  var start = 0;
  var end = perPage;
  var comments_paginated = comments.slice(start, end);

  const handlePagination = (start, end) => {
    start = start;
    end = end;
    comments_paginated = comments_paginated.concat(comments.slice(start, end));
  };

  return (
    <Card mt={5} style={{ marginTop: 10 }}>
      {comments[0] != undefined && (
        <Box display="flex" justifyContent="flex-end">
          <Sort />
        </Box>
      )}
      <Paper className={classes.root}>
        {comments &&
          comments_paginated.map(
            (comt) =>
              // don't show comments from blocked users
              ((comt.userId != null &&
                user.user != undefined &&
                !user.user.blocked.includes(comt.userId._id)) ||
                user.user == undefined ||
                comt.userId == null) && (

                <CommentThread comt={comt} singleTopic={singleTopic} key={comt._id} />
              )
          )}
      </Paper>
      {comments.length > perPage && (
        <div style={{ alignContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => {
              handlePagination(start + perPage, end + perPage);
            }}
            color="primary"
          >
            View More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Conversation;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "0 0 0 0",
  },
}));
