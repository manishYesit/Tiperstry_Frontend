import React from 'react'
import EmbedSiteRoot from './components/EmbedSiteRoot'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import moment from "moment";
import Action from "./components/Action";
import TagButton from "../../components/TagButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { withTranslation } from "../../../i18n";
import Linkify from "linkifyjs/react";

const EmbedSite = ({ topic, t, i18n }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Paper className={classes.header}>
        <Typography align="left" className={classes.titleLink} variant="h4">
          <Linkify tagName="span">{topic.title}</Linkify>
          <Box style={{ display: 'inline' }}>
            {topic.tags && topic.tags.map((tag, index) => (
              <TagButton key={index} name={tag} />
            ))}
          </Box>
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
                href={topic.userId.isDeleted ? "#" : "/p/" + topic.userId.username}
              >
                {topic.userId.isDeleted ? (
                  <>
                    {"[Deleted]"}
                  </>
                ) : (
                  <>
                    @{topic.userId.username}
                  </>
                )}
              </Typography>{" "}

              {
                topic.groupId && (
                  <Typography align="left" variant="overline">
                    IN /<a style={{ color: "inherit", textDecoration: "none" }} href={"/group/" + topic.group.name.replaceAll(" ", "-").replace("&", "%26")}>{topic.group.name}</a>
                  </Typography>
                )
              }
              {" "}

            </>
          )}

          <Typography align="left" variant="overline">
            {moment(topic.createdAt)
              .locale(typeof i18n.language !== "undefined" ? (i18n.language == "cn" ? "zh_cn" : i18n.language) : "en")
              .fromNow()}
          </Typography>
        </span>
        <Action
          topicId={topic._id}
          topic={topic}
          title={topic.title}
          userId={topic.userId}
          downVotes={topic.downVotes}
          upVotes={topic.upVotes}
          commentsCount={topic.commentsCount}
        />
      </Paper>

      <EmbedSiteRoot topic={topic} />
    </Card>
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
  },
  titleLink: {
    color: "black",
    fontWeight: "500",
  },
  link: {
    textDecoration: "none",
  },
}));
