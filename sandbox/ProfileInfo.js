import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FollowButton from "../../../components/FollowButton"
import { connect } from "react-redux";
import ThumbNails from "../../../components/ThumbNails"
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { config } from "../../../../config";
import axios from "axios";
import { setUserData } from "../../../store/actions"
import { withTranslation } from "../../../../i18n"



const mapStateToProps = state => ({
  user: state.user
});


const mapDispatchToProps = {
  setUserData
};


const ProfileInfo = ({ profile, user, setUserData, t }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleImageUpload = async event => {
    try {
      const file = event.target.files[0];

      // // console.log("file", file);

      if (typeof file === "undefined") return;

      setLoading(true);

      const formData = new FormData();
      formData.append("img", file);

      const headers = {
        "x-auth-token": user.token,
        "Content-Type": "multipart/form-data"
      };
      const upload = await axios({
        method: "post",
        headers,
        url: config.upload,
        data: formData
      });

      // // console.log("upload", upload);

      const userDetails = await axios.get(config.me, {
        headers: { "x-auth-token": user.token }
      });

      setUserData(userDetails.data);
      sessionStorage.setItem("userData", userDetails.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid className={classes.imgRoot} item xs={12} sm={12} md={4}>
        <ThumbNails name={profile.username} size="lg" url={profile.img} />

        {user.user && user.user._id === profile._id && (
          <>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              onChange={handleImageUpload}
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                disabled={loading}
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </>
          // <Button size="small" variant="text" color="primary">
          //   Change Image
          // </Button>
        )}
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <Typography variant="h4">{profile.name}</Typography>
        {user.user && user.user._id !== profile._id && (
          <FollowButton userId={profile._id} />
        )}
        <Typography variant="h6" color="primary">
          @{profile.username}
        </Typography>
        <Typography variant="body2" className={classes.bio}>
          {profile.bio}
        </Typography>
        {user.user && user.user._id === profile._id && (
          <>
            <Button
              size="small"
              variant="text"
              href={"/wallet"}
              color="primary"
            >
              {t("Wallet")}
            </Button>
            <Button
              size="small"
              variant="text"
              href={"/edit/profile"}
              color="primary"
            >
              {t("Edit Profile")}
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};




export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProfileInfo));


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "auto",
    borderRadius: 0,
    // borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: 600,
    marginLeft: "auto",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: spacing(2),
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: spacing(2)
    },
    marginBottom: spacing(2)
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: "initial"
  },
  imgRoot: {
    display: "flex",
    flexDirection: "column"
  },
  large: {
    width: spacing(12),
    height: spacing(12)
  },
  bio: {
    width: "100%",
    height: spacing(6.5)
  },
  input: {
    display: "none"
  }
}));
