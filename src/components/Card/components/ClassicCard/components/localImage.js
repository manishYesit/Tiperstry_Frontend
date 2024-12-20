import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import { config } from "../../../../../../config";
import clsx from "clsx";
export default function LocalImage(props) {
  const classes = useStyles();
  return (
    <div>
      <a href={"/topics/" + props.topicId + "/" + nutralizeTitle(props.title)}>
        <img
          className={"lozad " + classes.img}
          // data-src={config.getImage + props.url}
          src={config.getImage + props.url}
        />
      </a>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    height: "100%",
    "object-fit": "contain",
    "max-height": "43em",
  },
  media: {
    display: "block",
    maxHeight: 500,
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
}));
