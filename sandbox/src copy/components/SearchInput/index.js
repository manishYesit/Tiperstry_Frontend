import React from 'react'
import { makeStyles } from '@material-ui/core'
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import StarBorder from "@material-ui/icons/StarBorder";



export default function index() {
	const classes = useStyles()
	return (
    <InputBase
      className={classes.root}
      placeholder={"https://"}
      startAdornment={
        <IconButton className={classes.icon}>
          <InfoOutlined />
        </IconButton>
      }
      endAdornment={
        <IconButton className={classes.icon}>
          <StarBorder />
        </IconButton>
      }
    />
  );
}



const useStyles = makeStyles(({ spacing }) => ({
	root: {
		backgroundColor: '#F1F3F4',
		borderRadius: 100,
		padding: spacing(1) / 4,
	},
	icon: {
		padding: `${spacing(1) / 2}px ${spacing(1)}px`,
		borderRadius: 100,
	}
}));