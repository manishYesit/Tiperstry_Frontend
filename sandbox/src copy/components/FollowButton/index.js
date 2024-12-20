import React from 'react'
import { makeStyles } from '@material-ui/core'
import Button from "@material-ui/core/Button";


export default function index() {
	const styles = useStyles();
	return (
    <div>
      <Button
        classes={styles}
        variant={"outlined"}
        color={"primary"}
        size={"small"}
      >
        Follow
      </Button>
    </div>
  );
}




const useStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 100,
    minHeight: 30,
    padding: "0 1em"
  },
  label: {
    textTransform: "none",
    fontSize: 12,
    fontWeight: 500
  },
  outlined: {
    padding: "0 1em"
  },
  outlinedPrimary: {
    borderColor: palette.secondary.main,
    color: "rgb(29, 161, 242)",
    "&:hover": {
      borderColor: palette.primary.light,
      color: "white",
      backgroundColor: palette.primary.light
    }
  },
  outlinedOldPrimary: {
    borderColor: "rgb(29, 161, 242)",
    color: "rgb(29, 161, 242)",
    "&:hover": {
      borderColor: "rgb(29, 161, 242)",
      color: "rgb(29, 161, 242)",
      backgroundColor: "rgb(29, 161, 242, 0.1)"
    }
  },
  contained: {
    minHeight: 30,
    boxShadow: shadows[0],
    "&:active": {
      boxShadow: shadows[0]
    }
  },
  containedPrimary: {
    backgroundColor: "rgb(29, 161, 242)",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "rgb(29, 145, 218)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(29, 145, 218)"
      }
    }
  },
  sizeLarge: {
    padding: "0 1em",
    minHeight: 39
  }
}));