import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FollowButton from "../../../components/FollowButton";
import Banuser from "../../../components/BanUser";
import { connect } from "react-redux";
import ThumbNails from "../../../components/ThumbNails";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { config, api } from "../../../../config";
import axios from "axios";
import {
  setUserData,
  openBotSetting,
  toggleVerifyChannelModal,
  toggleVerifyDomainModal,
} from "../../../store/actions";
import { withTranslation } from "../../../../i18n";
import Box from "@material-ui/core/Box";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserData,
  openBotSetting,
  toggleVerifyDomainModal,
  toggleVerifyChannelModal,
};

const ProfileInfo = ({
  profile,
  user,
  setUserData,
  openBotSetting,
  toggleVerifyDomainModal,
  toggleVerifyChannelModal,
  t,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const getReferal = async () => {
    const headers = { "x-auth-token": user.token };
    await axios(config.referal, { headers });
    const userDetails = await axios.get(config.me, {
      headers,
    });

    setUserData(userDetails.data);
  };

  const handleImageUpload = (type) => async (event) => {
    try {
      const file = event.target.files[0];

      if (typeof file === "undefined") return;

      setLoading(true);

      const formData = new FormData();
      formData.append("img", file);

      const headers = {
        "x-auth-token": user.token,
        "Content-Type": "multipart/form-data",
      };

      const upload = await axios({
        method: "post",
        headers,
        url: type !== "profile" ? config.uploadCover : config.upload,
        data: formData,
      });

      const userDetails = await axios.get(config.me, {
        headers: { "x-auth-token": user.token },
      });

      setUserData(userDetails.data);
      sessionStorage.setItem("userData", userDetails.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      console.log("error", error.response);
    }
  };

  const unblockUser = async (post) => {
    await axios.put(
      config.userblock,
      {
        userid: profile._id,
      },
      {
        headers: { "x-auth-token": user.token },
      }
    );

    location.reload();
  };

  const getFormattedDate = (datestring) => {
    let date = new Date(datestring);
    let month = date.toLocaleString("default", { month: "long" });

    date = date.toLocaleDateString();
    let year = date.split("/")[2];

    return month + " " + year;
  };

  // Markup text comment
  const markupText = (data) => {
    if (data) {
      data = data.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      data = data.replace(/\__(.*?)\__/g, '<i>$1</i>');
      data = data.replace(/\~~(.*?)\~~/g, '<strike>$1</strike>');
      data = data.replace(/\```(.*?)\```/g, '<code>$1</code>');
      data = data.replace(/\<>(.*?)\<\/>/g, '<code>$1</code>');
      data = data.replace(/((http:|https:)[^\s]+[\w])/g, '<a href="$1" target="_blank">$1</a>');
    }

    return data;
  }

  return (
    <Paper className={classes.container}>
      {(profile.coverImg && !profile.isDeleted) ? (
        <CardMedia
          image={config.getImage + profile.coverImg}
          className={classes.media}
        />
      ) : (
        <Box className={classes.header}>
          <Typography className={classes.headerText}>TIPESTRY</Typography>
        </Box>
      )}

      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          position: "relative",
          marginTop: -55,
        }}
      >
        <div>
          {profile.isDeleted ? (
            <ThumbNails name={'D'} size="lg" />
          ) : (
            <ThumbNails name={profile.username} size="lg" url={profile.img} />
          )}
          {user.user && user.user._id === profile._id && (
            <label
              htmlFor="icon-button-profile"
              style={{ position: "absolute", marginTop: -30 }}
            >
              <IconButton
                color="primary"
                disabled={loading}
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          )}

          {profile && !profile.isDeleted && (
            <>
              <Typography variant="h4">{profile.name}</Typography>
              {user.user && user.user._id !== profile._id && (
                <FollowButton userId={profile._id} />
              )}
              {/* {user.user && user.user.blocked.includes(profile._id) && (
                <Button variant="outlined" onClick={unblockUser} color="primary">{t("Un-block")}</Button>
              )} */}
              <Typography variant="h6" color="primary">
                @{profile.username}
              </Typography>
              <Typography>
                {user.user && user.user.isAdmin === true ? (
                  <Banuser profile={profile} />
                ) : null}
              </Typography>
            </>
          )}
        </div>

        <div>
          {user.user && user.user._id === profile._id && (
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                disabled={loading}
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          )}
        </div>
      </CardContent>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        style={{ paddingBottom: 20 }}
      >
        {profile && profile.deactivated && <Typography variant="h3">Account Suspended</Typography>}
        {profile && profile.isDeleted && <Typography variant="h3">Account Deleted</Typography>}
      </Box>

      {profile && !profile.deactivated && !profile.isDeleted && (
        <Box
          mt={2}
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
        >
          <Typography variant="body2" className={classes.bio}>
            <span dangerouslySetInnerHTML={{ __html: markupText(profile.bio) }}></span>
          </Typography>

          <div style={{ textAlign: "left" }}>
            <div className={classes.dataview}>
              <img src={"/static/calendar.png"} />{" "}
              {"Joined " + getFormattedDate(profile.createdAt)}
            </div>
          </div>

          {user.user && user.user._id === profile._id && (
            <Box display="flex" justifyContent="flex-end">
              <ButtonGroup style={{ maxWidth: "100%" }}>
                <Button
                  variant="outlined"
                  disableElevation
                  disableFocusRipple
                  href={"/edit/profile"}
                  color="primary"
                >
                  {t("Edit Profile")}
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  disableFocusRipple
                  onClick={openBotSetting}
                  color="primary"
                >
                  {t("Settings")}
                </Button>
              </ButtonGroup>
            </Box>
          )}
        </Box>
      )}

      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-profile"
        onChange={handleImageUpload("profile")}
        type="file"
      />
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        onChange={handleImageUpload("cover")}
        type="file"
      />
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProfileInfo));

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  container: {
    margin: spacing(0, 0, 4),
    // paddingBottom: spacing(1),
    height: "auto",
  },
  root: {
    margin: "auto",
    borderRadius: 0,
    // borderRadius: spacing(2), // 16px
    transition: "0.3s",
    // boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: 600,
    marginLeft: "auto",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // paddingBottom: spacing(2),
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: spacing(2),
    },
    marginBottom: spacing(2),
  },
  dataview: {
    color: "#757575",
    display: "flex",
    gap: "10px",
    padding: "0 20px",
  },
  followercountview: {
    fontWeight: "bold",
    color: "#000",
    marginRight: "6px",
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
  imgRoot: {
    display: "flex",
    flexDirection: "column",
  },
  large: {
    width: spacing(12),
    height: spacing(12),
  },
  bio: {
    // width: "100%",
    textAlign: "left",
    margin: spacing(0.3, 2),
  },
  input: {
    display: "none",
  },
  headerRoot: {
    height: 250,
  },
  header: {
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(#3a6dc5, #a73664)",
    cursor: "pointer",
  },
  headerText: {
    fontSize: 40,
    letterSpacing: 10,
    fontFamily: "monospace",
    color: "white",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));
