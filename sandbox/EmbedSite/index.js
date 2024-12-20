import React from 'react'
import EmbedSiteRoot from './components/EmbedSiteRoot'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { withTranslation } from "../../../i18n";
import Linkify from "linkifyjs/react";

const EmbedSite = ({ topic, t, i18n }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.header}>
        <Typography align="left" className={classes.titleLink} variant="h4">
          <Linkify tagName="span">{topic.title}</Linkify>
        </Typography>

        <span>
          {topic.userId && (
            <>
              <Typography align="left" variant="overline">
                {t("posted by")}
              </Typography>{" "}
              <Typography
                align="left"
                variant="overline"
                color="primary"
                component="a"
                className={classes.link}
                href={"/p/" + topic.userId.username}
              >
                @{topic.userId.username}
              </Typography>{" "}
            </>
          )}

          <Typography align="left" variant="overline">
            {moment(topic.createdAt)
              .locale(typeof i18n.language !== "undefined" ? (i18n.language == "cn" ? "zh_cn" : i18n.language) : "en")
              .fromNow()}
          </Typography>
        </span>
      </Paper>

      <EmbedSiteRoot topic={topic} />
    </div>
  );
};

export default withTranslation()(EmbedSite);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    boxShadow: "0px 0px 0px 0px",
    padding: theme.spacing(1),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
  },
  titleLink: {
    color: "black",
    fontWeight: "500",
  },
  link: {
    textDecoration: "none",
  },
}));