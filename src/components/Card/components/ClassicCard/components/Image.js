import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import Hidden from "@material-ui/core/Hidden";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

export default function Image(props) {
  const classes = useStyles();
  // const [dimension, setDimension] = React.useState({
  //   width: -1,
  //   height: -1,
  // });

  // //  get the image dimension and render based on that.
  // const onImgLoad = ({target:img}) => {
  //   // setDimension({ height: img.offsetHeight, width: img.offsetWidth });
  //   setDimension({ height: img.naturalHeight, width: img.naturalWidth });
  // }

  return (
    <a
      className={classes.root}
      href={"/topics/" + props.topicId + "/" + nutralizeTitle(props.title)}
    >
      <img
        // onLoad={onImgLoad}
        className={clsx("lozad", classes.media)}
        // className={"lozad " + classes.media}
        // className={clsx("lozad", dimension.width > 600 && classes.media)}
        // className={dimension.width > 600 && classes.media}
        data-src={props.url}
      />
    </a>
  );
}

const useStyles = makeStyles(({ breakpoints }) => ({
  media: {
    display: "block",
    maxHeight: 500,
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

// {
//   isMobile ? (
//     <img
//       onLoad={onImgLoad}
//       className={clsx("lozad", dimension.width > 600 && classes.media)}
//       // className={dimension.width > 600 && classes.media}
//       data-src={props.url}
//     />
//   ) : (
//     <img
//       onLoad={onImgLoad}
//       className={clsx("lozad", dimension.width > 600 && classes.media)}
//       // className={dimension.width > 600 && classes.media}
//       data-src={props.url}
//     />
//   );
// }

{
  /* <Hidden smDown>
        <img
          onLoad={onImgLoad}
          // className={clsx("lozad", dimension.width > 600 && classes.media)}
          className={dimension.width > 600 && classes.media}
          src={props.url}
        />
      </Hidden>
      <Hidden smUp>
        <img
          onLoad={onImgLoad}
          // className={clsx("lozad", dimension.width > 600 && classes.media)}
          className={dimension.width > 600 && classes.media}
          src={props.url}
        />
      </Hidden> */
}

// <img
//   onLoad={onImgLoad}
//   className={clsx("lozad", dimension.width > 600 && classes.media)}
//   className={dimension.width > 600 && classes.media}
//   data-src={props.url}
// />;

// data-src={
//   "https://image.thum.io/get/image/fit/500x400/auth/3228-www.tipestry.com/" +
//   props.url
// }
// data-src={
//   "https://image.thum.io/get/iphoneX/noanimate/width/400/allowJPG/crop/400/hidePopovers/auth/3228-www.tipestry.com/" +
//   props.url
// }
