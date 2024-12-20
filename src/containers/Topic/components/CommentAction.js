import React from "react";
import Vote from "./Vote";
import TipPost from "./TipPost";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Reply from "@material-ui/icons/Reply";
import DeleteForever from "@material-ui/icons/DeleteForever";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';
import Menu from "@material-ui/core/Menu";
import BlockIcon from "@material-ui/icons/Block";
import Delete from "@material-ui/icons/DeleteForever";

import {
  setToggleComment,
  setComment,
  setUserData,
  openReportComment,
  setEditTopic,
  deleteComment,
  updateCount,
} from "../../../store/actions";
import dynamic from "next/dynamic";
import { config } from "../../../../config";
import { useRouter } from "next/router";
import axios from "axios";
import { withTranslation } from "../../../../i18n";
import Report from "@material-ui/icons/Report";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

const DeleteAlert = dynamic(() => import("../../../components/DeleteAlert"), {
  ssr: false,
});

const ReportComment = dynamic(
  () => import("../../../../src/components/reportComment"),
  {
    ssr: false,
  }
);

const CommentAction = ({
  commentId,
  votesCount,
  username,
  replyCount,
  userId,
  topicId,
  topicTitle,
  name,
  t,
  content,
  topic,
}) => {
  const [del, setDel] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);
  const token = useSelector(({ user: { token } }) => token);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    dispatch(
      setToggleComment({
        openComment: true,
        commentId,
        username: userId.isDeleted ? '[Deleted]' : username,
        topicId,
        type: "reply",
      })
    );
  };

  const handleEdit = () => {
    dispatch(
      setToggleComment({
        openComment: true,
        commentId,
        type: "edit",
        content,
        topicId,
      })
    );
  };

  const handleDelete = async () => {
    try {
      const follow = await axios.delete(
        `${config.deleteFollow}/${topicId}/${commentId}`,
        {
          headers: { "x-auth-token": token },
        }
      );

      dispatch(deleteComment(commentId));
      dispatch(setComment([]));
      dispatch(updateCount(1));

      const comments = await axios.get(config.comment + "/" + topicId);

      dispatch(setComment(comments.data));

      handleDeleteClose();
    } catch (error) {
      console.log("error", error);
      console.log("error.response", error.response);
    }
  };

  const handleDeleteSetup = () => {
    setDel(true);
  };

  const handleDeleteClose = () => {
    setDel(false);
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
  }

  let show2 = false;
  if (user) {
    if (user && topic && topic.group) {
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

  const blockUser = async () => {
    if (userId._id != user._id) {
      const follow = await axios.put(
        config.userblock,
        {
          userid: userId._id,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      location.reload();
    }
  };

  const banUser = async () => {
    if (userId._id != user._id) {
      await axios.post(
        config.banusergroup,
        {
          groupId: topic.groupId,
          userId: userId._id,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      location.reload();
    }
  };

  return (
    <div>
      {/* {router.pathname && router.pathname !== "/p/[username]" && (
           <Vote
           commentId={commentId}
           count={votesCount}
           // downVotes={topic.downVotes}
           // upVotes={topic.upVotes}
         />
      )} */}

      {/* <Button
        size="small"
        variant="text"
        color="default"
        // startIcon={<Reply />}
        onClick={handleOpen}
        style={{textTransform:"capitalize"}}
      >
        {t("Reply")} {"  "}
        {replyCount > 0 ? replyCount : ""}
      </Button> */}

      <Tooltip title="Reply">
        <Typography style={{ display: 'inline' }} className={classes.action} onClick={handleOpen}>
          {t("reply")} {"  "}
        </Typography>
      </Tooltip>

      {userId && <TipPost commentId={commentId} />}

      <Tooltip title="Report">
        {/* <IconButton
          size="small"
          variant="text"
          color="default"
          onClick={() => dispatch(openReportComment(commentId))}
        >
          <Report />
        </IconButton> */}
        <Typography style={{ display: 'inline' }} className={classes.action} onClick={() => dispatch(openReportComment(commentId))}>&emsp;report</Typography>
      </Tooltip>

      {show && (
        <>
          <Tooltip title="Delete">
            {/* <IconButton size="small" onClick={handleDeleteSetup}>
              <DeleteForever />
            </IconButton> */}
            <Typography style={{ display: 'inline' }} className={classes.action} onClick={handleDeleteSetup}>&emsp;delete</Typography>
          </Tooltip>
          {/* <IconButton size="small" onClick={handleEdit}>
            <EditOutlined />
          </IconButton> */}
          <Typography style={{ display: 'inline' }} className={classes.action} onClick={handleEdit}>&emsp;edit</Typography>
        </>
      )}

      <IconButton
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: "0px", marginLeft: "5px" }}
      >
        <MoreHorizIcon />
      </IconButton>

      {show3 && (
        <>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {show2 && (
              <MenuItem
                onClick={handleDelete}
                style={{ fontSize: 12, padding: "5px 16px" }}
              >
                <Delete style={{ fontSize: 15 }} />
                <Typography variant="overline">{t("Delete")}</Typography>
              </MenuItem>
            )}

            {show2 && (
              <MenuItem
                onClick={banUser}
                style={{ fontSize: 12, padding: "5px 16px" }}
              >
                <BlockIcon style={{ fontSize: 15 }} />
                <Typography variant="overline">{t("Ban User")}</Typography>
              </MenuItem>
            )}

            <MenuItem
              onClick={blockUser}
              style={{ fontSize: 12, padding: "5px 16px" }}
            >
              <BlockIcon style={{ fontSize: 15 }} />
              <Typography variant="overline">{t("Block User")}</Typography>
            </MenuItem>
          </Menu>
        </>
      )}

      <DeleteAlert
        open={del}
        setClose={handleDeleteClose}
        name={name}
        handleApprove={handleDelete}
      />

      <ReportComment topicTitle={topicTitle} topicId={topicId} />
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    action: {
      fontSize: 12,
      color: '#757575',
      fontWeight: 500,
      cursor: 'pointer',
    }
  };
});

export default withTranslation()(CommentAction);
