import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx"

const TagButton = ({ name, classnames }) => {
  const classes = useStyles();
  return (
    <a href={"/hashtag/" + name} className={classes.root}>
      <Typography color="primary" className={clsx(classnames)}>
        #
      </Typography>
      <Typography color="primary" className={clsx(classnames)}>
        {name}
      </Typography>
    </a>
  );
};

export default TagButton;


const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    margin: "1px 2px",
    padding: "0px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  tag: {
    // borderRadius: "0 3px 3px 0",
    background: "#FFFFFF",
    // borderLeft: `3px solid ${palette.primary.main}`,
    fontWeight: "bold",
    padding: "2px 4px",
    margin: spacing(0.2)
  }
}));
