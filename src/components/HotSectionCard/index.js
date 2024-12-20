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
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import GifIcon from "@material-ui/icons/Gif";
import VideocamIcon from "@material-ui/icons/Videocam";
import PublicIcon from "@material-ui/icons/Public";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import { url } from "../../../config";

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
    spaceBetween2: {
      display: "flex",
      alignItems: "center",
      position: "relative",
    },
    marginTop2: {
      marginTop: "10px",
    },
    spaceBetween3: {
      display: "flex",
      alignItems: "center",
    },
    buttonLineHeight: {
      width: "100%",
      lineHeight: "2rem",
    },
    link2: {
      color: "black",
      textDecoration: "none",
      paddingLeft: "5px",
    },
    grayback: {
      background: "#f7f7f7",
      height: "35px",
    },
  };
});

const HotSectionCard = ({ user, max, countries_list, country }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [country2, setCountry2] = React.useState(
    localStorage.getItem("country")
  );

  useEffect(() => {
    setCountry2(localStorage.getItem("country"));
    setTimeout(() => {
      console.log("user country2:", country2);
    }, 2000);
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSectionClick = (sectionname = "") => {
    if (sectionname == "" || !url) {
      return;
    }

    location.href = url + "/hashtag/" + sectionname;
  };

  const ITEM_HEIGHT = 48;
  const flagWidthHeight = 24;
  const flagWidthHeight2 = 20;
  const iconHeight2 = 24;

  return (
    <MuiCard style={{ marginTop: "10px" }}>
      <MuiCardContent>
        <Box component="div">
          <Typography className={classes.buttonLineHeight}>
            {" "}
            <b>Hot</b>{" "}
          </Typography>
          <Typography
            color="textSecondary"
            variant="small"
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.grayback,
            ]}
          >
            <a
              href={url + "/hashtag/" + country2.toLowerCase()}
              style={{ textDecoration: "none", color: "#757575" }}
            >
              <LocationOnIcon />
            </a>
            <a
              href={url + "/hashtag/" + country2.toLowerCase()}
              style={{ textDecoration: "none" }}
            >
              <Typography style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                <b>{country2}</b>{" "}
              </Typography>
            </a>
            <div>
              <a href={url + "/hashtag/" + country2.toLowerCase()}>
                <svg
                  width={flagWidthHeight}
                  height={flagWidthHeight}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <image
                    href={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${country2.toLowerCase()}.svg`}
                    height={flagWidthHeight}
                    width={flagWidthHeight}
                  />
                </svg>
              </a>
            </div>

            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ float: "right", position: "absolute", right: "6px" }}
            >
              <MoreHorizIcon />
            </IconButton>

            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClick={handleClose}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "30ch",
                },
              }}
            >
              {countries_list.map((countryval) => (
                <MenuItem
                  key={countryval.code}
                  selected={countryval.code === country2}
                  onClick={() => {
                    handleClose();
                    setCountry2(countryval.code);
                    location.href =
                      url +
                      "/hashtag/" +
                      countryval.code.toLowerCase() +
                      "?c=" +
                      countryval.code.toUpperCase();
                  }}
                >
                  {countryval.name} &nbsp; &nbsp;
                  <svg
                    width={flagWidthHeight2}
                    height={flagWidthHeight2}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image
                      href={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${countryval.code.toLowerCase()}.svg`}
                      height={flagWidthHeight2}
                      width={flagWidthHeight2}
                    />
                  </svg>
                </MenuItem>
              ))}
            </Menu>
          </Typography>

          <Typography
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.marginTop2,
            ]}
          >
            {" "}
            <img
              src={"/static/oc_icon.png"}
              width={iconHeight2}
              height={iconHeight2}
            />{" "}
            <a
              className={classes.link2}
              href="#"
              onClick={() => {
                handleSectionClick("originalcontent");
              }}
            >
              Original Content
            </a>{" "}
          </Typography>

          <Typography
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.marginTop2,
            ]}
          >
            {" "}
            <GifIcon />{" "}
            <a
              className={classes.link2}
              href="#"
              onClick={() => {
                handleSectionClick("gifs");
              }}
            >
              Gifs
            </a>{" "}
          </Typography>
          <Typography
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.marginTop2,
            ]}
          >
            {" "}
            <CameraAltIcon />{" "}
            <a
              className={classes.link2}
              href="#"
              onClick={() => {
                handleSectionClick("pics");
              }}
            >
              Pics
            </a>{" "}
          </Typography>
          <Typography
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.marginTop2,
            ]}
          >
            {" "}
            <VideocamIcon />{" "}
            <a
              className={classes.link2}
              href="#"
              onClick={() => {
                handleSectionClick("videos");
              }}
            >
              Video
            </a>{" "}
          </Typography>
          <Typography
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.marginTop2,
            ]}
          >
            {" "}
            <PublicIcon />{" "}
            <a
              className={classes.link2}
              href="#"
              onClick={() => {
                handleSectionClick("social");
              }}
            >
              Social
            </a>{" "}
          </Typography>
          <Typography
            className={[
              classes.displayFlex,
              classes.spaceBetween2,
              classes.marginTop2,
            ]}
          >
            <svg
              width={iconHeight2}
              height={iconHeight2}
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                href={`https://raw.githubusercontent.com/shreyakyesitlabs/public_assets/main/popcorn-svgrepo-com.svg`}
                height={iconHeight2}
                width={iconHeight2}
              />
            </svg>
            <a
              className={classes.link2}
              href="#"
              onClick={() => {
                handleSectionClick("discussion");
              }}
            >
              Discussion
            </a>
          </Typography>
        </Box>
        {/* {user.suggestions && user.suggestions.splice(0,max).map(suggestion=>(
                <Box component="div" className={[classes.displayFlex, classes.spaceBetween, classes.marginTop]}>
                    <Avatar alt={suggestion.name} src={suggestion.img} className={classes.large} />
                    <Box component="div" className={classes.deFlex}>
                        <Link href={`/p/${suggestion.username}`}>
                            <Typography variant="b"> @{suggestion.username} </Typography>
                        </Link>
                        <Typography variant="small" paragraph> Suggested to you </Typography>
                    </Box>
                    <Box component="div">
                        <FollowButton userId={suggestion._id} />
                    </Box>
                </Box>
            ))} */}
      </MuiCardContent>
    </MuiCard>
  );
};

export default connect(mapStateToProps, null)(HotSectionCard);
