import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import useLabelIconStyles from "../RegularPost/components/LabelIcon";
import MoreHorizOutlined from "@material-ui/icons/MoreHorizOutlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";



export default function PositionedPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
	const classes = useStyles();
	const labelStyles = useLabelIconStyles();

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
	};
	
	const handleClickAway = () => {
		setOpen(false);
		setAnchorEl(null);
	}

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Box mt={0.5} className={classes.click}>
                  <Typography variant="caption" className={classes.typography}>
                    follow @egarly
                  </Typography>
                </Box>
                <Divider />
                <Box mt={0.5} className={classes.click}>
                  <Typography variant="caption" className={classes.typography}>
                    Turn on Notification
                  </Typography>
                </Box>
                <Divider />
                <Box mt={0.5} className={classes.click}>
                  <Typography variant="caption" className={classes.typography}>
                    Report this post
                  </Typography>
                </Box>
                <Divider />
                <Box mt={0.5} className={classes.click}>
                  <Typography variant="caption" className={classes.typography}>
                    Delete this post
                  </Typography>
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>

        <button
          type={"button"}
          onClick={handleClick("top-end")}
          className={labelStyles.link}
        >
          <MoreHorizOutlined className={labelStyles.icon} />
        </button>
      </div>
    </ClickAwayListener>
  );
}



const useStyles = makeStyles(theme => ({
  root: {
		// width: 500,
		display: "flex"
  },
  typography: {
    padding: theme.spacing(1)
  },
  click: {
		cursor: "pointer"
	}
}));