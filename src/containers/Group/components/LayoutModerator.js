import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { makeStyles, Paper, Typography, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { config } from "../../../../config";

import Button from "@material-ui/core/Button";

import axios from "axios";
import GroupSidebarModerator from "./GroupSidebarModerator";

import HeightIcon from "@material-ui/icons/Height";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { nutralizeTitle } from "../../../utils";

import Modals from "./Modals";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { openModeratorModal } from "../../../store/actions";

const LadderBoardModal = dynamic(
  () => import("../../../components/LadderBoardModal"),
  {
    ssr: false,
  }
);

const LadderBoard = dynamic(() => import("../../../components/LadderBoard"), {
  ssr: false,
});

const ProfileCard = dynamic(() => import("../../../components/ProfileCard"), {
  ssr: false,
});

const SiteInfo = dynamic(() => import("../../../components/SiteInfo"), {
  ssr: false,
});

const AddModerator = dynamic(() => import("./AddModerator"), {
  ssr: false,
});

const mapStateToProps = ({ topics, user }) => {
  return {
    topics,
    user,
  };
};

function LayoutModerator({
  topics: { topics, loading },
  user: { user },
  group,
  viewstyle,
}) {
  const dispatch = useDispatch();
  topics = topics.filter(function (el) {
    return el != null;
  });

  const joinGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        let group_joiningstatus = await axios.post(
          config.joingroup,
          {
            userId: user._id,
            groupId: group._id,
          },
          {
            headers: { "x-auth-token": token },
          }
        );

        alert(group_joiningstatus.data.message);
      }
    } catch (error) {
      console.error("join group error", error);
    }
  };

  const [description, setDescription] = useState('');
  const [sidebardata, setSidebarData] = useState(false);
  const [reportedposts, setReportedPosts] = useState([]);
  const [reportedcomments, setreportedComments] = useState([]);
  const [deletedpostscomments, setdeletedPostsComments] = useState([]);
  const [menuitemsopen, setMenuItemsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [groupToken, setGroupToken] = useState(null);

  // modal specific states
  const [modalopen, setModalOpen] = useState(0);
  const [modaldata, setModalData] = useState(undefined);

  // modal specific functions
  const deleteRule = async (rule) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(config.deletegrouprule, {
          headers: { "x-auth-token": token },
          data: { ruleId: rule._id },
        });

        loadSideBarData();
      }
    } catch (error) {
      console.error("group moderator sidebar error", error);
    }
  };

  const updateTokenData = async (data) => {
    try {
      if (groupToken == null) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      setUploading(true);

      const headers = {
        "x-auth-token": token,
      };

      if (data.key == "minWithdrawalAmount") {
        let response = await axios({
          method: "put",
          headers,
          url: config.crypto + "/" + groupToken._id,
          data: { key: "minWithdrawal", value: data.value },
        });
      } else if (data.key == "tokenicon") {
        const formData = new FormData();
        formData.append("tokenicon", data.value);
        formData.append("key", data.key);
        formData.append("groupId", group._id);

        const headers = {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        };
        let response = await axios({
          method: "put",
          headers,
          url: config.crypto + "/" + groupToken._id,
          data: formData,
        });
      }
      // loadSideBarData();
      getTokenForGroup();

      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error.response);
      console.error("token update error", error);
    }
  };

  const updateGroupData = async (data) => {
    try {
      // check name before update
      if (data.key == "name") {
        if (data.value.split(" ").length <= 1) {
          alert("Group name should have atleast 2 words!");
          return;
        }
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      setUploading(true);

      const formData = new FormData();
      if (data.key == "icon" || data.key == "groupbanner")
        formData.append("icon", data.value);
      else formData.append("value", data.value);
      formData.append("key", data.key);
      formData.append("groupId", group._id);

      const headers = {
        "x-auth-token": token,
        "Content-Type": "multipart/form-data",
      };
      let response = await axios({
        method: "post",
        headers,
        url: config.updategroupdata,
        data: formData,
      });
      if (response.data.status == "success") {
        if (data.key == "name") {
          // go to updated URL of group
          window.location.href =
            "/group/" + data.value.toLowerCase().split(" ").join("-");
        }

        loadSideBarData();
      } else {
        alert(response.data.message);
      }
      setUploading(false);
    } catch (error) {
      console.error("group updation error", error);
    }
  };

  const banUnbanUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        config.banusergroup,
        {
          groupId: group._id,
          userId: user._id,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      loadSideBarData();
    }
  };

  const deletePost = async (topicId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.delete(config.deleteFollow + "/" + topicId, {
        headers: { "x-auth-token": token },
      });
      loadSideBarData();
    }
  };

  const deleteComment = async (topicId, commentId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.delete(`${config.deleteFollow}/${topicId}/${commentId}`, {
        headers: { "x-auth-token": token },
      });
      loadSideBarData();
    }
  };

  const loadSideBarData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const sidebar_data = await axios.get(
          config.groupinfo + "?groupId=" + group._id
        );

        if (sidebar_data.data.status == "success") {
          setSidebarData(sidebar_data.data);
          setDescription(sidebar_data.data.group.description);
        }

        // get reported posts and comments
        const reportedposts = await axios.get(
          config.viewreportedpostsgroup + "?groupId=" + group._id
        );

        if (reportedposts.data.status == "success") {
          setReportedPosts(reportedposts.data.group_reportedposts);
        }

        const reportedcomments = await axios.get(
          config.viewreportedcommentsgroup + "?groupId=" + group._id
        );

        if (reportedcomments.data.status == "success") {
          setreportedComments(reportedcomments.data.group_reportedcomments);
        }

        // get deleted posts and comments
        const deletedpostscomments_data = await axios.get(
          config.viewdeletedpostsandcomments + "?groupId=" + group._id
        );

        if (deletedpostscomments_data.data.status == "success") {
          setdeletedPostsComments(deletedpostscomments_data.data);
        }
      }
    } catch (error) {
      console.error("group moderator sidebar error", error);
    }
  };

  useEffect(() => {
    if (!sidebardata) loadSideBarData();
    if (groupToken == null) getTokenForGroup();
  });

  const getTokenForGroup = async () => {
    const data = await axios.get(
      config.crypto + "/by-groupid?groupId=" + group._id
    );

    setGroupToken(data.data.payload);
  };

  function openNormalView() {
    location.href = "?viewtype=normal";
  }

  const classes = useStyles();

  function getCommentUser(deletedpostscomments, index) {
    return deletedpostscomments.deleted_comments[index];
  }

  const undeletePostOrComment = async (type, id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        let data = {};
        if (type == "post") data.topicId = id;
        else data.commentId = id;

        await axios.post(config.undeletepostorcomment, data, {
          headers: { "x-auth-token": token },
        });

        loadSideBarData();
      }
    } catch (error) {
      console.error("undelete post/comment error", error);
    }
  };

  const editorTool = (value) => {
    var inputElement = document.getElementById('group_description_update');

    if (inputElement) {
      var selectedText = inputElement.innerHTML.slice(inputElement.selectionStart, inputElement.selectionEnd);

      if (selectedText.length) {
        if (value == '```') {
          selectedText = '<>' + selectedText + '</>';
        } else {
          selectedText = value + selectedText + value;
        }

        var description = (inputElement.innerHTML.substring(0, inputElement.selectionStart) + selectedText + inputElement.innerHTML.substring(inputElement.selectionEnd));
        setDescription(description);
      }
    }
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.groupsheader}>
        <a href="">
          <img
            src={
              sidebardata
                ? !group.icon.includes("/null")
                  ? config.getImage + sidebardata.group.icon
                  : "/static/tipcoin.png"
                : ""
            }
            height={60}
            width={"auto"}
          />
        </a>
        &nbsp;
        <h2
          style={{
            color: "black",
            fontSize: "32px",
            fontWeight: "600",
            lineHeight: "normal",
          }}
        >
          <a href="" style={{ color: "black", textDecoration: "none" }}>
            {group.name}
          </a>
        </h2>
        {user && user._id != group.userId && (
          <Button
            onClick={joinGroup}
            className={classes.joinbtn}
            color="default"
            variant="outlined"
          >
            Join
          </Button>
        )}
      </div>

      <Modals
        sidebardata={sidebardata}
        setModalData={setModalData}
        group={group}
        modalopen={modalopen}
        setModalOpen={setModalOpen}
        loadSideBarData={loadSideBarData}
        modaldata={modaldata}
      />

      <Grid container spacing={3} className={classes.resetWidth}>
        <Grid item xs={12} sm={12} md={3}>
          {viewstyle && viewstyle == "moderator" && (
            <div>
              <Button
                style={{ backgroundColor: "#b1d1f0", width: "100%", marginBottom: "10px" }}
                onClick={openNormalView}
              >
                Switch to normal view
              </Button>
            </div>
          )}

          <GroupSidebarModerator
            user={user}
            sidebardata={sidebardata}
            group={group}
            setMenuItemsOpen={setMenuItemsOpen}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} justify="center" align="center">
          {menuitemsopen == 0 && (
            <div className={classes.menupane}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginRight: 10,
                    color: "#0079d3",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalOpen(5);
                    setModalData(sidebardata.grouprules);
                  }}
                >
                  Reorder Rules
                </div>
                <Button
                  style={{
                    backgroundColor: "#0079d3",
                    borderRadius: "50px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setModalOpen(1);
                  }}
                >
                  Add Rule
                </Button>
              </div>

              <div className={classes.menupanebody}>
                <div>Rules</div>

                <p>
                  These are the rules that visitors must follow to participate
                  in your group. They can be used as reasons to report or delete
                  posts or comments and to ban users. Groups can have a maximum
                  of 10 rules. Group owners and moderators can be removed for
                  not enforcing these rules.
                </p>

                {sidebardata &&
                  sidebardata.grouprules.map((rule, index) => (
                    <Paper style={{ fontSize: 14, padding: 8 }}>
                      <Typography
                        style={{
                          position: "relative",
                          paddingRight: "75px",
                          wordBreak: "break-all",
                        }}
                      >
                        {index + 1}. {rule.name}
                        <span
                          style={{
                            position: "absolute",
                            right: "4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {!rule.defaultrule && (
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setModalOpen(2);
                                setModalData(rule);
                              }}
                            />
                          )}
                          {!rule.defaultrule && (
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                deleteRule(rule);
                              }}
                            />
                          )}
                          <HeightIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setModalOpen(22);
                              setModalData(rule);
                            }}
                          />
                        </span>
                      </Typography>
                    </Paper>
                  ))}
              </div>
            </div>
          )}

          {menuitemsopen == 1 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Reported Posts</div>
                {reportedposts &&
                  reportedposts.map((reportedpost, index) => (
                    <Paper style={{ fontSize: 14, padding: 8 }}>
                      <Typography style={{ position: "relative" }}>
                        <a
                          target="_blank"
                          href={
                            "/topics/" +
                            reportedpost.topicId +
                            "/" +
                            nutralizeTitle(reportedpost.topicTitle)
                          }
                        >
                          {reportedpost.topicTitle}
                        </a>{" "}
                        <br />
                        <b>Reason: </b> {reportedpost.reason}
                        {reportedpost.reason === "other" && (
                          <div>
                            <b>Message: </b> {reportedpost.message}
                          </div>
                        )}
                        <span
                          onClick={() => {
                            deletePost(reportedpost.topicId);
                          }}
                          style={{
                            position: "absolute",
                            right: "4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <DeleteIcon />
                        </span>
                      </Typography>
                    </Paper>
                  ))}
              </div>
            </div>
          )}

          {menuitemsopen == 2 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Reported Comments</div>
                {reportedcomments.map((reportedcomment, index) => (
                  <Paper style={{ fontSize: 14, padding: 8 }}>
                    <Typography style={{ position: "relative" }}>
                      <a
                        target="_blank"
                        href={
                          "/topics/" +
                          reportedcomment.topicId +
                          "/" +
                          nutralizeTitle(reportedcomment.topicTitle)
                        }
                      >
                        {reportedcomment.commentContent}
                      </a>{" "}
                      <br />
                      <b>Reason: </b> {reportedcomment.reason}
                      <span
                        onClick={() => {
                          deleteComment(
                            reportedcomment.topicId,
                            reportedcomment.commentId
                          );
                        }}
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <DeleteIcon />
                      </span>
                    </Typography>
                  </Paper>
                ))}
              </div>
            </div>
          )}

          {menuitemsopen == 3 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Deleted Posts</div>
                {deletedpostscomments &&
                  deletedpostscomments.deleted_posts.map((post, index) => (
                    <Paper style={{ fontSize: 14, padding: 8 }}>
                      <Typography style={{ position: "relative" }}>
                        <p>{post.title}</p>
                        <p>
                          <b>Deleted by: </b> {post.user.username}
                          <Button
                            style={{
                              backgroundColor: "#0079d3",
                              borderRadius: "50px",
                              textTransform: "capitalize",
                              fontWeight: "600",
                            }}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              undeletePostOrComment("post", post._id);
                            }}
                          >
                            Un-delete
                          </Button>
                        </p>
                      </Typography>
                    </Paper>
                  ))}
              </div>
            </div>
          )}

          {menuitemsopen == 4 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Deleted Comments</div>
                {deletedpostscomments &&
                  deletedpostscomments.deleted_comments.map(
                    (comment, index) => (
                      <Paper style={{ fontSize: 14, padding: 8 }}>
                        <Typography style={{ position: "relative" }}>
                          <p>
                            <a>{comment.content}</a>
                          </p>
                          <p>
                            <b>Deleted by: </b> {comment.user.username}
                            <Button
                              style={{
                                backgroundColor: "#0079d3",
                                borderRadius: "50px",
                                textTransform: "capitalize",
                                fontWeight: "600",
                              }}
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                undeletePostOrComment("comment", comment._id);
                              }}
                            >
                              Un-delete
                            </Button>
                          </p>
                        </Typography>
                      </Paper>
                    )
                  )}
              </div>
            </div>
          )}

          {menuitemsopen == 5 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Banned Users</div>
                {sidebardata.bannedusers.map((user, index) => (
                  <Paper style={{ fontSize: 14, padding: 8 }}>
                    <Typography style={{ position: "relative" }}>
                      {user.username}
                      <span
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#0079d3",
                            borderRadius: "50px",
                            marginTop: 5,
                            textTransform: "capitalize",
                            fontWeight: "600",
                          }}
                          color="primary"
                          variant="contained"
                          onClick={banUnbanUser}
                        >
                          Un-ban
                        </Button>
                      </span>
                    </Typography>
                  </Paper>
                ))}
              </div>
            </div>
          )}

          {menuitemsopen == 6 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Moderators List</div>

                {sidebardata &&
                  sidebardata.moderators.map((groupuser, index) => (
                    <Paper style={{ fontSize: 14, padding: 8 }}>
                      <Typography style={{ position: "relative" }}>
                        {groupuser.identity.username}

                        <span
                          style={{
                            position: "absolute",
                            right: "4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {groupuser.identity._id != group.userId &&
                            !sidebardata.group.moderators.some(
                              (a) => a.identity._id == groupuser._id
                            ) && (
                              <Button
                                style={{
                                  backgroundColor: "#0079d3",
                                  borderRadius: "50px",
                                  textTransform: "capitalize",
                                  fontWeight: "600",
                                }}
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                  setModalOpen(3);
                                  setModalData(groupuser);
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          {groupuser.identity._id != group.userId &&
                            sidebardata.group.moderators.some(
                              (a) => a.identity._id == groupuser._id
                            ) && (
                              <Button
                                style={{
                                  backgroundColor: "#0079d3",
                                  borderRadius: "50px",
                                  textTransform: "capitalize",
                                  fontWeight: "600",
                                }}
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                  setModalOpen(4);
                                  setModalData(groupuser);
                                }}
                              >
                                Add
                              </Button>
                            )}
                        </span>
                      </Typography>
                    </Paper>
                  ))}
              </div>
            </div>
          )}

          {menuitemsopen == 7 && user && (user.isAdmin || user._id == group.userId) && (
            <div className={classes.menupane}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {(user && user.isAdmin == true) ||
                  user._id == group.userId ? (
                  <Button
                    style={{
                      backgroundColor: "#0079d3",
                      borderRadius: "50px",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                    color="primary"
                    variant="contained"
                    onClick={() => dispatch(openModeratorModal())}
                  >
                    Add Moderator with Reward
                  </Button>
                ) : null}
              </div>

              <div className={classes.menupanebody}>
                <div>Moderator Rewards</div>
                <AddModerator
                  groupId={sidebardata.group._id}
                  loadSideBarData={loadSideBarData}
                />
                {sidebardata &&
                  sidebardata.moderators.map((groupuser, index) => (
                    <Paper style={{ fontSize: 14, padding: 8 }}>
                      <Typography style={{ position: "relative" }}>
                        {groupuser.identity.username}

                        <span
                          style={{
                            position: "absolute",
                            right: "4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {(groupuser.percentageEntitled * 100).toFixed(2)}%
                        </span>
                      </Typography>
                    </Paper>
                  ))}
              </div>
            </div>
          )}

          {menuitemsopen == 8 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Group Description</div>
                <p>Change group description</p>
                <Box className={classes.editor}>
                  <Typography onClick={() => editorTool('**')} title={'Bold'} variant="h6" className={classes.editorTool} style={{ fontWeight: 600 }}>B</Typography>
                  <Typography onClick={() => editorTool('__')} title={'Italic'} variant="h6" className={classes.editorTool} style={{ fontStyle: 'italic' }}>I</Typography>
                  <Typography onClick={() => editorTool('~~')} title={'Strike'} variant="h6" className={classes.editorTool} style={{ textDecoration: "line-through" }}>S</Typography>
                  <Typography onClick={() => editorTool('```')} title={'Code'} variant="h6" style={{ cursor: 'pointer' }}>{'</>'}</Typography>
                </Box>
                <TextField
                  variant="outlined"
                  value={description}
                  multiline
                  rows={3}
                  id="group_description_update"
                  rowsMax={4}
                  style={{ width: "100%" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <Button
                  style={{
                    backgroundColor: "#0079d3",
                    borderRadius: "50px",
                    marginTop: 5,
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    updateGroupData({
                      key: "description",
                      value: document.getElementById("group_description_update").value,
                    });
                  }}
                >
                  Update
                </Button>
              </div>

              {user && user.isAdmin && (
                <>
                  <div className={classes.menupanebody}>
                    <div>Group Name</div>
                    <p>Change group name</p>
                    <TextField
                      variant="outlined"
                      defaultValue={sidebardata.group.name}
                      id="group_name_update"
                      style={{ width: "100%" }}
                    />
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#0079d3",
                        borderRadius: "50px",
                        marginTop: 5,
                        textTransform: "capitalize",
                        fontWeight: "600",
                      }}
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        updateGroupData({
                          key: "name",
                          value:
                            document.getElementById("group_name_update").value,
                        });
                      }}
                    >
                      Update
                    </Button>
                  </div>

                  <div className={classes.menupanebody}>
                    <div>Group NSFW</div>
                    <p>Change group NSFW</p>
                    <FormControlLabel
                      value="1"
                      control={
                        <CheckBox
                          defaultChecked={group.is_nsfw}
                          id="group_nsfw_update"
                          color="primary"
                        />
                      }
                      label={
                        <b>
                          <span className={classes.nsfw}>NSFW</span> 18+ year
                          old community
                        </b>
                      }
                      labelPlacement="end"
                    />

                    <Button
                      style={{
                        backgroundColor: "#0079d3",
                        borderRadius: "50px",
                        marginTop: 5,
                        textTransform: "capitalize",
                        fontWeight: "600",
                      }}
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        updateGroupData({
                          key: "is_nsfw",
                          value: document.getElementById("group_nsfw_update")
                            .checked
                            ? 1
                            : 0,
                        });
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {menuitemsopen == 9 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Icon</div>
                <img
                  src={
                    sidebardata
                      ? group.icon
                        ? config.getImage + sidebardata.group.icon
                        : "/static/tipcoin.png"
                      : ""
                  }
                  height={60}
                  width={"auto"}
                />
                <p>Change group icon</p>

                <input type="file" id="groupicon22" accept="image/*" />
                {uploading ? (
                  <Container maxWidth="xs">
                    <CircularProgress />
                  </Container>
                ) : (
                  <Button
                    style={{
                      backgroundColor: "#0079d3",
                      borderRadius: "50px",
                      marginTop: 5,
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      updateGroupData({
                        key: "icon",
                        value: document.getElementById("groupicon22").files[0],
                      });
                    }}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
          )}

          {menuitemsopen == 11 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Banner</div>
                <img
                  src={
                    sidebardata && sidebardata.group.banner
                      ? config.getImage + sidebardata.group.banner
                      : ""
                  }
                  height={60}
                  width={"auto"}
                />
                <p>Banner link</p>
                <TextField
                  defaultValue={sidebardata.group.groupbannerlink}
                  id="groupbannerlink"
                />

                <p>Change group banner</p>
                <p>
                  {" "}
                  <b>Suggested banner size: 500 x 271</b>
                </p>

                <input type="file" id="groupbanner22" accept="image/*" />
                {uploading ? (
                  <Container maxWidth="xs">
                    <CircularProgress />
                  </Container>
                ) : (
                  <Button
                    disabled={uploading}
                    style={{
                      backgroundColor: "#0079d3",
                      borderRadius: "50px",
                      marginTop: 5,
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      updateGroupData({
                        key: "groupbanner",
                        value:
                          document.getElementById("groupbanner22").files[0],
                      });
                      updateGroupData({
                        key: "groupbannerlink",
                        value: document.getElementById("groupbannerlink")
                          .value,
                      });
                    }}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
          )}

          {menuitemsopen == 10 && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Group Owner</div>
                <p>Change group owner (enter username of new group owner)</p>
                <TextField
                  variant="outlined"
                  defaultValue={sidebardata.user.username}
                  id="group_owner_update"
                  style={{ width: "100%", marginTop: "1rem" }}
                />
                {user.isAdmin && (
                  <>
                    <p>Change group modifier</p>
                    <TextField
                      variant="outlined"
                      defaultValue={sidebardata.group.modifier}
                      id="group_modifier_update"
                      style={{ width: "100%", marginTop: "1rem" }}
                    />
                  </>
                )}

                <br />
                <Button
                  style={{
                    backgroundColor: "#0079d3",
                    borderRadius: "50px",
                    marginTop: 5,
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    updateGroupData({
                      key: "owner",
                      value:
                        document.getElementById("group_owner_update").value,
                    });
                    updateGroupData({
                      key: "modifier",
                      value: document.getElementById("group_modifier_update")
                        .value,
                    });
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          )}

          {menuitemsopen == 12 && groupToken != null && (
            <div className={classes.menupane}>
              <div className={classes.menupanebody}>
                <div>Group Token</div>
                {/* change group token */}
                {user.isAdmin && (
                  <div className={classes.menupane}>
                    <div className={classes.menupanebody}>
                      <div>Icon</div>
                      <img
                        src={
                          sidebardata
                            ? groupToken.icon
                              ? config.getImage + groupToken.icon
                              : "/static/tipcoin.png"
                            : ""
                        }
                        height={60}
                        width={"auto"}
                      />
                      <p>Change token icon</p>

                      <input type="file" id="tokenicon22" accept="image/*" />
                      {uploading ? (
                        <Container maxWidth="xs">
                          <CircularProgress />
                        </Container>
                      ) : (
                        <Button
                          style={{
                            backgroundColor: "#0079d3",
                            borderRadius: "50px",
                            marginTop: 5,
                            textTransform: "capitalize",
                            fontWeight: "600",
                          }}
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            updateTokenData({
                              key: "tokenicon",
                              value:
                                document.getElementById("tokenicon22").files[0],
                            });
                          }}
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                {/* end of group token */}
                <Typography className={classes.tokenBox}>
                  {" "}
                  <span className={classes.tokenLeads}>Group Token:</span>
                  {"  "}
                  {groupToken.tokenName} ({groupToken.ticker})
                  <img
                    src={
                      sidebardata
                        ? groupToken.icon
                          ? config.getImage + groupToken.icon
                          : "/static/tipcoin.png"
                        : ""
                    }
                    height={20}
                    width={"auto"}
                    className={classes.tokenIcon}
                  />
                </Typography>{" "}
                <Typography className={classes.tokenBox}>
                  {" "}
                  <span className={classes.tokenLeads}>Total Supply:</span>{" "}
                  {"  "}
                  {groupToken.tokenSupply}
                </Typography>
                <Typography className={classes.tokenBox}>
                  <span className={classes.tokenLeads}>Contract Address:</span>{" "}
                  {"  "}
                  {groupToken.contractAddress != "placeholder"
                    ? groupToken.contractAddress
                    : ""}
                </Typography>
                <Typography className={classes.tokenBox}>
                  <span className={classes.tokenLeads}>
                    {" "}
                    Minimum Withdrawal Amount
                  </span>
                </Typography>
                <TextField
                  variant="outlined"
                  defaultValue={groupToken.minWithdrawalAmount}
                  id="minWithdrawalAmount"
                  style={{ width: "100%", marginTop: "1rem" }}
                />
                <br />
                <Button
                  style={{
                    backgroundColor: "#0079d3",
                    borderRadius: "50px",
                    marginTop: 5,
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    updateTokenData({
                      key: "minWithdrawalAmount",
                      value: document.getElementById("minWithdrawalAmount")
                        .value,
                    });
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div>
            <div className={classes.side}>
              {user && <ProfileCard user={user} />}
              <LadderBoard item="1" single group={sidebardata.group} />
              <SiteInfo />
            </div>
          </div>
        </Grid>
      </Grid>

      <LadderBoardModal />
    </Container>
  );
}

export default connect(mapStateToProps)(LayoutModerator);

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;
  return {
    root: {
      minWidth: 280,
      // marginTop: 80,
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
    resetWidth: {
      [breakpoints.down("xs")]: {
        width: "100vw",
        margin: 0,
      },
    },
    displayFlex: {
      display: "flex",
    },
    spaceBetween: {
      justifyContent: "space-between",
    },
    buttonLineHeight: {
      lineHeight: "2rem",
    },
    side: {
      // position: "fixed",
      maxWidth: 320,
    },
    groupsheader: {
      paddingLeft: "8px",
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      backgroundColor: "white",
      marginBottom: "14px",
    },
    joinbtn: {
      borderRadius: "50px",
      borderColor: "#58a5de",
      color: "#0079d3",
      padding: "2px 15px",
      marginLeft: "15px",
      textTransform: "capitalize",
    },
    menupane: {
      textAlign: "left",
      backgroundColor: "#edeff1",
    },
    menupanebody: {
      padding: 15,
      marginTop: 10,
      backgroundColor: "#dae0e6",
    },
    nsfw: {
      backgroundColor: "#ff585b",
      color: "white",
      padding: "2px 6px",
      borderRadius: "4px",
    },
    tokenLeads: {
      fontWeight: "bold",
      // padding: "1rem",
    },
    tokenBox: {
      backgroundColor: "white",
      padding: ".5rem",
      marginTop: "1rem",
    },
    tokenIcon: {
      lineHeight: "inherit",
      marginLeft: "1rem",
      marginBottom: "-4px",
    },
    editor: {
      display: "flex",
      padding: "5px 15px",
      background: "#ececec",
      gap: "20px",
    },
    editorTool: {
      cursor: 'pointer',
      fontFamily: "'Courier New', Courier, monospace",
    }
  };
});
