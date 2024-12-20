import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { config } from "../../../../config";
import { withTranslation } from "../../../../i18n";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CakeIcon from "@material-ui/icons/Cake";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function formatDateString(date) {
  return new Date(date).toDateString();
}

const GroupSidebar = ({ group, user, t }) => {
  const classes = useStyles();
  const [sidebardata, setSidebarData] = useState(false);

  const handleOpenPost = () => {
    // check if current user is banned from this group
    if (user && group.bannedusers.includes(user._id)) {
      alert("You are banned from this group!");
      return;
    }

    let btncheck = document.getElementById("sidenavbar_closebtn");
    if (btncheck) btncheck.click();

    document.querySelector("[title='Post']").click();
  };

  const loadSideBarData = async () => {
    const token = localStorage.getItem("token");
    const sidebar_data = await axios.get(
      config.groupinfo + "?groupId=" + group._id
    );

    if (sidebar_data.data.status == "success")
      setSidebarData(sidebar_data.data);
  };

  const addRemoveModerator = async (moderator) => { };

  useEffect(() => {
    if (!sidebardata) loadSideBarData();
  });

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
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        style={{
          padding: "14px 6px 6px",
          color: "#1f1f1f",
          fontSize: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            alignContent: "space-between",
            width: "100%",
          }}
        >
          <b style={{ width: "90%" }}>About Community</b>
          {/* <span style={{marginRight:"10px"}}> <MoreHorizIcon /></span> */}
        </div>
        <Typography className={classes.description} style={{ width: "100%", wordWrap: "break-word", lineHeight: '25px' }}>
          <span dangerouslySetInnerHTML={{ __html: markupText(group.description) }}></span>
        </Typography>

        <div style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
          <div style={{ fontSize: "14px" }}>{group.membercount}</div>
          <div style={{ fontSize: "10px" }}>Readers</div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <CakeIcon />
          </span>
          Created {formatDateString(group.createdAt)}
        </div>
        {group.is_nsfw && (
          <span
            style={{ color: "#ff585b", fontWeight: "600", marginTop: "10px" }}
          >
            <span
              style={{
                border: "1px solid #ff585b",
                marginRight: "6px",
                padding: "0 4px",
              }}
            >
              nsfw
            </span>
            Adult content
          </span>
        )}
        {/* <Button
          style={{
            width: "100%",
            backgroundColor: "#0079d3",
            borderRadius: "50px",
            textTransform: "capitalize",
            marginTop: "10px",
            fontWeight: "600",
          }}
          color="primary"
          variant="contained"
          onClick={handleOpenPost}
        >
          {t("Create Post")}
        </Button> */}
      </Paper>

      <Paper>
        <Typography
          style={{ marginTop: 20, fontSize: "16px", padding: "14px 6px 6px" }}
        >
          <b>Group Rules</b>

          <div className={classes.accordianroot}>
            {sidebardata &&
              sidebardata.grouprules.map((rule, index) => (
                <ExpansionPanel index={index} className={classes.accordian}>
                  <ExpansionPanelSummary
                    className={classes.accordiansummary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.accordianheading}>
                      {index + 1}. {rule.name}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.accordiansummary}>
                    <Typography className={classes.description}>{rule.description}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
          </div>
        </Typography>
      </Paper>

      <Paper>
        <Typography
          style={{ marginTop: 30, fontSize: "16px", padding: "14px 6px 6px" }}
        >
          <b>Moderators</b>

          <div className={classes.accordianroot}>
            {/* {sidebardata && (
              <div className={classes.moderatorlistitem}>
                {sidebardata && sidebardata.user.username} [Owner]
              </div>
            )} */}
            {sidebardata &&
              sidebardata.moderators.map((moderator, index) => (
                <div className={classes.moderatorlistitem}>
                  <div style={{ paddingRight: "10px" }}>
                    <a style={{ textDecoration: "none", color: "inherit" }} href={moderator.identity.isDeleted ? "#" : "/p/" + moderator.identity.username}>
                      {moderator.identity.isDeleted ? (
                        <>
                          {"[Deleted]"}
                        </>
                      ) : (
                        <>
                          {moderator.identity.username}
                        </>
                      )}
                    </a>
                    {" "}
                    {moderator.position == "owner" && <span>[Owner]</span>}
                  </div>
                </div>
              ))
            }
          </div>
        </Typography>
      </Paper>
    </div>
  );
};

// Trending Topics
export default withTranslation()(GroupSidebar);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  paper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  accordianroot: {
    width: "100%",
  },
  accordianheading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontWeight: "700",
    wordBreak: "break-all",
    fontFamily: 'verdana, arial, helvetica, sans-serif',
  },
  accordian: {
    borderRadius: 0,
    boxShadow: "0px 2px 5px -5px #000000;",
  },
  accordiansummary: {
    padding: 0,
  },
  moderatorlistitem: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    fontFamily: 'verdana, arial, helvetica, sans-serif',
  },
  description: {
    fontSize: 12,
    fontFamily: 'verdana, arial, helvetica, sans-serif',
  }
}));
