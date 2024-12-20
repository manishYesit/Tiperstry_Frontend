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
import FollowButton from "../FollowButton";

const mapStateToProps = (state) => ({
  user: state.user,
});

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
  };
});

const ProfileCard = ({ user, max,suggestedgroups }) => {
  const classes = useStyles();
  return (
    <>
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
              Suggestions for you{" "}
            </Typography>
            {/* <Button> See all</Button> */}
          </Typography>
        </Box>
        {user.suggestions &&
          user.suggestions.splice(0, max).map((suggestion) => (
            <Box
              component="div"
              className={[
                classes.displayFlex,
                classes.spaceBetween,
                classes.marginTop,
              ]}
            >
              <Avatar
                alt={suggestion.name}
                src={suggestion.img}
                className={classes.large}
              />
              <Box component="div" className={classes.deFlex}>
                <Link href={`/p/${suggestion.username}`}>
                  <Typography variant="b"> @{suggestion.username} </Typography>
                </Link>
                <Typography variant="small" paragraph>
                  {" "}
                  Suggested to you{" "}
                </Typography>
              </Box>
              <Box component="div">
                <FollowButton userId={suggestion._id} />
              </Box>
            </Box>
          ))}
      </MuiCardContent>

      {
        suggestedgroups && (
          <MuiCardContent>
            <Box component="div">
              <Typography
                color="textSecondary"
                variant="small"
                className={[classes.displayFlex, classes.spaceBetween]}
              >
                <Typography className={classes.buttonLineHeight}>
                  {" "}
                  Suggestions for you{" "}
                </Typography>
                {/* <Button> See all</Button> */}
              </Typography>
            </Box>
            {suggestedgroups.splice(0, max).map((group) => (
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
                    src={group.img}
                    className={classes.large}
                  />
                  <Box component="div" className={classes.deFlex}>
                    <Link href={`/group/${group.name.replace(" ","-").replace("&","%26")}`}>
                      <Typography variant="b"> {group.name} </Typography>
                    </Link>
                  </Box>
                  <Box component="div">
                    <Button>Join</Button>
                  </Box>
                </Box>
              ))}
          </MuiCardContent>
        )
      }
    </MuiCard>
    
    </>
    
  );
};

export default connect(mapStateToProps, null)(ProfileCard);
