import React, { useEffect, Fragment } from "react";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import FollowButton from "../../../components/FollowButton";

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;

  return {
    root: {
      marginTop: 80,
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    deFlex: {
      flex: "auto",
      paddingLeft: "1em",
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    marginTop: {
      marginTop: theme.spacing(1),
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
    alignMent: {
      display: "flex",
      justifyContent: "right",
    },
  };
});

const GroupCard = ({ groups, max }) => {
  const classes = useStyles();
  console.log("groups_searched", groups);
  return (
    <MuiCard>
      <MuiCardContent>
        <Box component="div">
          <Typography
            color="textSecondary"
            variant="small"
            className={[classes.displayFlex, classes.spaceBetween]}
          >
            <Typography className={classes.buttonLineHeight}>
              {" "}
              Searched Groups({groups.length}){" "}
            </Typography>
            {/* <Button> See all</Button> */}
          </Typography>
        </Box>
        {groups &&
          groups.map((group) => (
            <Box
              component="div"
              className={[
                classes.displayFlex,
                classes.spaceBetween,
                classes.marginTop,
              ]}
            >
              <Avatar
                alt={group.name}
                src={
                  group.icon && !group.icon.includes("/null")
                    ? group.icon
                    : "/static/tipcoin.png"
                }
                className={classes.large}
              />
              <Box component="div" className={classes.deFlex}>
                <a  style={{color:"#3a6dc5"}} href={`/group/${group.name.replaceAll(" ", "-").replace("&","%26")}`}>
                  <Typography variant="b" className={classes.alignMent}>
                    {" "}
                    {group.name}{" "}
                  </Typography>
                </a>
                {/* <Typography
                  variant="small"
                  paragraph
                  className={classes.alignMent}
                >
                  {" "}
                  Suggested to you{" "}
                </Typography> */}
              </Box>
            </Box>
          ))}
      </MuiCardContent>
    </MuiCard>
  );
};

export default GroupCard;
