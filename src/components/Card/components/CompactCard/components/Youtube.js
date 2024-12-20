import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";


export default function Gif({ url, topicId, title }) {
  const classes = useStyles();
    const router = useRouter();

    let variant = "rounded";
    // if (
    //   router.asPath === "/" ||
    //   router.asPath === "/recent" ||
    //   router.route === "/HashTag"
    // ) {
    //   variant = "rounded";
    // } else {
    //   variant = "circle";
    // }
  return (
    <Avatar
      component="a"
      variant={variant}
      alt={title}
      href={"/topics/" + topicId + "/" + nutralizeTitle(title)}
      src="/static/social/youtube.jpg"
      className={classes.large}
    />
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  large: {
    width: spacing(9),
    height: spacing(9),
  },
}));