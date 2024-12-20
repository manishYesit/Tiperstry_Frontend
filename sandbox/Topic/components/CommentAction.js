import React from 'react'
import Vote from './Vote';
import TipPost from './TipPost';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Reply from "@material-ui/icons/Reply";
import DeleteForever from "@material-ui/icons/DeleteForever";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { connect } from "react-redux";
import { setToggleComment } from "../../../store/actions";
import dynamic from "next/dynamic";
import { config } from "../../../../config";
import { useRouter } from "next/router"
import axios from "axios";
import { withTranslation } from "../../../../i18n";

const DeleteAlert = dynamic(
  () => import("../../../components/DeleteAlert"),
  { ssr: false }
);

const mapDispatchToProps = {
  setToggleComment
};

const mapStateToProps = state => ({
  user: state.user,
});

const CommentAction = ({
  commentId,
  votesCount,
  setToggleComment,
  username,
  replyCount,
  userId,
  topicId,
  name,
  user: { token, user },
  t
}) => {
  const [del, setDel] = React.useState({
    open: false,
    commentId: null,
  });
  const router = useRouter();

  const handleOpen = () => {
    setToggleComment({
      openComment: true,
      commentId,
      username,
      topicId,
      type: "reply"
    });
  };



  const handleEdit = () => {
    setToggleComment({
      openComment: true,
      commentId,
      type: "edit",
    });
  };

  

  const handleDelete = async () => {
    try {
      const follow = await axios.delete(`${config.deleteFollow}/${topicId}/${commentId}`, {
        headers: { "x-auth-token": token },
      });

      router.reload();
    } catch (error) {
      // console.log("error", error);
      // console.log("error.response", error.response);
    }
  };

  

  const handleDeleteSetup = () => {
    setDel({
      open: true,
      commentId,
    });
  };

  const handleDeleteClose = () => {
    setDel({
      open: false,
      commentId: null,
    });
  };

  let show = false;
  if (user) {
    if (user.isAdmin) {
      show = true
    }
    if (userId) {
      if (user._id === userId._id) {
        show = true;
      }
    }
  }

  return (
    <div>
      <Vote
        commentId={commentId}
        count={votesCount}
        // downVotes={topic.downVotes}
        // upVotes={topic.upVotes}
      />
      <Button
        size="small"
        variant="text"
        color="default"
        startIcon={<Reply />}
        onClick={handleOpen}
      >
        {t("Reply")} {"  "}
        {replyCount > 0 ? replyCount : ""}
      </Button>
      {userId && <TipPost commentId={commentId} />}
      {show && (
        <>
          <IconButton size="small" onClick={handleDeleteSetup}>
            <DeleteForever />
          </IconButton>
          <IconButton size="small" onClick={handleDeleteSetup}>
            <EditOutlined />
          </IconButton>
        </>
      )}
      <DeleteAlert
        open={del.open}
        setClose={handleDeleteClose}
        name={name}
        handleApprove={handleDelete}
      />
    </div>
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CommentAction));
