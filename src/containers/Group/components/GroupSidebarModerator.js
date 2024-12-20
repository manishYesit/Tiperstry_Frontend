import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { withTranslation } from "../../../../i18n";

import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@material-ui/icons/Person";

const GroupSidebarModerator = ({
  user,
  group,
  sidebardata,
  setMenuItemsOpen,
  t,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        style={{
          padding: "14px 6px 6px",
          backgroundColor: "#f6f7f8",
          fontSize: 16,
        }}
      >
        <div className={classes.menuitem}>
          <div className={classes.menuitemheader}>
            <ListAltIcon /> Rules and Regulations
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(0);
            }}
          >
            Rules
          </div>
        </div>

        <div className={classes.menuitem}>
          <div className={classes.menuitemheader}>
            <PersonIcon /> User Management
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(1);
            }}
          >
            Reported Posts
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(2);
            }}
          >
            Reported Comments
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(3);
            }}
          >
            Deleted Posts
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(4);
            }}
          >
            Deleted Comments
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(5);
            }}
          >
            Banned Users
          </div>
        </div>

        <div className={classes.menuitem}>
          <div className={classes.menuitemheader}>
            <PersonIcon /> Moderation
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(6);
            }}
          >
            Moderator List
          </div>
          {(user.isAdmin || user._id == group.userId) && (
            <div
              className={classes.menuitemlink}
              onClick={() => {
                setMenuItemsOpen(7);
              }}
            >
              Moderator Rewards
            </div>
          )}
        </div>

        <div className={classes.menuitem}>
          <div className={classes.menuitemheader}>
            <PersonIcon /> Group Information
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(8);
            }}
          >
            {" "}
            {user && user.isAdmin && "Name and "} Description
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(12);
            }}
          >
            Token
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(9);
            }}
          >
            Icon
          </div>
          <div
            className={classes.menuitemlink}
            onClick={() => {
              setMenuItemsOpen(11);
            }}
          >
            Banner
          </div>
          {user && user.isAdmin && (
            <div
              className={classes.menuitemlink}
              onClick={() => {
                setMenuItemsOpen(10);
              }}
            >
              Group Owner
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};
// Trending Topics
export default withTranslation()(GroupSidebarModerator);

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 20
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
  },
  menuitem: {
    margin: 10,
  },
  menuitemheader: {
    marginLeft: 6,
    textTransform: "uppercase",
    display: "flex",
    fontSize: 12,
    color: "#898c8e",
    alignItems: "center",
    fontWeight: 700,
  },
  menuitemlink: {
    padding: 10,
    cursor: "pointer",
    fontSize: 12,
  },
}));
