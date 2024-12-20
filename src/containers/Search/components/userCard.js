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

const ProfileCard = ({ users, max }) => {
  const classes = useStyles();
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
              Searched Users({users.length}){" "}
            </Typography>
            {/* <Button> See all</Button> */}
          </Typography>
        </Box>
        {users &&
          users.map((user) => (
            <Box
              component="div"
              className={[
                classes.displayFlex,
                classes.spaceBetween,
                classes.marginTop,
              ]}
            >
              <Avatar
                alt={user.name}
                src={user.img}
                className={classes.large}
              />
              <Box component="div" className={classes.deFlex}>
                <Link href={`/p/${user.username}`}>
                  <Typography variant="b" className={classes.alignMent}>
                    {" "}
                    @{user.username}{" "}
                  </Typography>
                </Link>
                <Typography
                  variant="small"
                  paragraph
                  className={classes.alignMent}
                >
                  {" "}
                  Suggested to you{" "}
                </Typography>
              </Box>
              <Box component="div">
                <FollowButton userId={user._id} />
              </Box>
            </Box>
          ))}
      </MuiCardContent>
    </MuiCard>
  );
};

export default ProfileCard;
