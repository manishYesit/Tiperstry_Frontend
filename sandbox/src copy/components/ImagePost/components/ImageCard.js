import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import LocationOn from "@material-ui/icons/LocationOn";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Favorite from "@material-ui/icons/Favorite";
import useWideCardMediaStyles from "./WideCardMedia";
import useFadedShadowStyles from "./FadedShadow";
import usePushingGutterStyles from "./PushingGutter";
import FollowButton from "../../FollowButton";



const ImageCard = () => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
  return (
    <Card elevation={0} className={styles.root}>
      <CardMedia
        classes={mediaStyles}
        image={
          "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        }
      />
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        {/* <IconButton className={styles.favorite}>
          <Favorite />
        </IconButton> */}
        <Box mb={1} className={styles.boxRoot}>
          <div className={styles.headingRoot}>
            <h3 className={styles.heading}>Aegen Ergon</h3>
            <Typography variant="caption">@aegen</Typography>
          </div>
          <div>
            <FollowButton />
          </div>
        </Box>
        {/* <Box color={"grey.500"} display={"flex"} alignItems={"center"} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>Rome</span>
        </Box> */}

        {/* <Typography color={"textSecondary"} variant={"body2"}>
          Talking about travelling or new jobs, many people often think of
          change of environment...
        </Typography> */}
        <p className={styles.body}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </p>
        <Box
          mt={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            className={gutterStyles.parent}
          >
            <Typography
              component={"span"}
              variant={"body2"}
              color={"textSecondary"}
            >
              +420
            </Typography>
          </Box>
          <IconButton size={"small"}>
            <MoreHoriz />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};


export default ImageCard;



const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    overflow: "initial",
    width: "100%",
    // maxWidth: 304
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    },
    margin: "10px auto"
  },
  title: {
    marginBottom: 0
  },
  rateValue: {
    fontWeight: "bold",
    marginTop: 2
  },
  content: {
    position: "relative",
    padding: 24,
    margin: "-5% 16px 0",
    // margin: "-24% 16px 0",
    backgroundColor: "#fff",
    borderRadius: 4
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18
  },
  body: {
    fontSize: 14,
    color: palette.grey[500]
  },
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headingRoot: {
    display: "flex",
    flexDirection: "column"
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block"
  }
}));