import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CallMissedOutgoing from "@material-ui/icons/CallMissedOutgoing";
import Color from 'color';
import { makeStyles } from "@material-ui/core";

const TagButton = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Button size="small" classes={{ root: classes.root, label: classes.label }}>
        {props.name}
        <CallMissedOutgoing className={classes.icon} />
      </Button>
    </Box>
  );
};

export default TagButton;



const useStyles = makeStyles(({ spacing, palette }) => ({
	box: {
		marginRight: 5
	},
  root: {
		backgroundColor: palette.grey[100],
		'&:hover, &.Mui-focusVisible': {
			backgroundColor: Color(palette.primary.light).lighten(0.5).toString(),
			color: palette.primary.dark,
			'& $icon': {
				color: palette.primary.dark,
				marginLeft: spacing(1),
				visibility: 'visible',
				opacity: 1,
			},
			'& $overline': {
				color: Color(palette.primary.dark)
					.fade(0.3)
					.toString(),
			},
		},
	},
	label: {
		transition: '0.2s',
		textTransform: 'initial',
	},
	icon: {
		fontSize: 18,
		visibility: 'hidden',
		opacity: 0,
		transition: '0.3s',
		color: palette.common.white,
		marginLeft: -spacing(1.5),
		'& .MuiIcon--fa': {
			padding: 0,
		},
	},
	overline: {
		display: 'block',
		lineHeight: 1,
		fontSize: 10,
		textAlign: 'left',
		textTransform: 'uppercase',
		marginTop: 4,
		color: palette.text.secondary,
	},
}));