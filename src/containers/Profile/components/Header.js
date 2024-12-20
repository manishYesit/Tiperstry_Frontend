import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { withTranslation } from "../../../../i18n";

const FirebaseTabs = ({ profile, setTabIndex, tabIndex, currentuser, t }) => {
  const tabsStyles = TabsStyles();

  const tabItemStyles = TabItemStyles();
  return (
    <AppBar position={"static"}>
      <Tabs
        classes={tabsStyles}
        value={tabIndex}
        onChange={(e, index) => setTabIndex(index)}
      >
        <Tab
          classes={tabItemStyles}
          style={{
            textTransform: "capitalize",
            marginTop: 0,
            marginBottom: 0,
            marginRight: ".5rem",
            marginLeft: ".5rem",
            minWidth: 0,
          }}
          label={t("Post")}
        />
        <Tab
          classes={tabItemStyles}
          style={{ textTransform: "capitalize",      marginTop: 0,
            marginBottom: 0,
            marginRight: ".5rem",
            marginLeft: ".5rem",
            minWidth: 0, }}
          label={t("Comment")}
        />
        <Tab
          classes={tabItemStyles}
          style={{ textTransform: "capitalize" ,      marginTop: 0,
            marginBottom: 0,
            marginRight: ".5rem",
            marginLeft: ".5rem",
            minWidth: 0,}}
          label={t("Follower")}
        />
        <Tab
          classes={tabItemStyles}
          style={{ textTransform: "capitalize",      marginTop: 0,
            marginBottom: 0,
            marginRight: ".5rem",
            marginLeft: ".5rem",
            minWidth: 0, }}
          label={t("Following")}
        />
        {currentuser && currentuser.username == profile.user.username && (
          <Tab
            classes={tabItemStyles}
            style={{ textTransform: "capitalize",      marginTop: 0,
            marginBottom: 0,
            marginRight: ".5rem",
            marginLeft: ".5rem",
            minWidth: 0, }}
            label={t("Blocked")}
          />
        )}
      </Tabs>

      {currentuser && currentuser.username == profile.user.username && (
        <Tabs
          classes={tabsStyles}
          value={tabIndex + 5}
          onChange={(e, index) => {
            setTabIndex(index + 5);
          }}
        >
          <Tab
            classes={tabItemStyles}
            style={{ textTransform: "capitalize" }}
            label={t("Groups")}
          />
          <Tab
            classes={tabItemStyles}
            style={{ textTransform: "capitalize" }}
            label={t("Saved")}
          />
        </Tabs>
      )}
    </AppBar>
  );
};

export default withTranslation()(FirebaseTabs);

const TabsStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    marginLeft: spacing(0.6),
    maxWidth: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  indicator: {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: palette.common.white,
  },
}));
const TabItemStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    textTransform: "capitalize",
    margin: spacing(0, 2),
    minWidth: 0,
    [breakpoints.up("md")]: {
      minWidth: 0,
    },
  },
  wrapper: {
    fontWeight: "normal",
    letterSpacing: 0.5,
  },
}));
