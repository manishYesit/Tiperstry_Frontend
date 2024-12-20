import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Report from '@material-ui/icons/Report';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
// import axios from 'axios';
import Delete from "@material-ui/icons/DeleteForever";
import FollowButton from "../../FollowButton";
import withStyles from "@material-ui/core/styles/withStyles";

class Options extends React.Component {
  state = {
    anchorEl: null,
    userFollowing: [],
    topicFollowing: [],
    report: false,
    del: false
  };


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { anchorEl } = this.state
    const { classes } = this.props;
    
    return (
      <div className={classes.root} >
        <FollowButton />
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem style={{ fontSize: 12, padding: "5px 16px" }}>
            <Remove style={{ fontSize: 15 }} />
            &nbsp;
            Following Post
          </MenuItem>
          <MenuItem style={{ fontSize: 12, padding: "5px 16px" }}>
            <Report style={{ fontSize: 15 }} /> 
            &nbsp;
            Report post
          </MenuItem>
          <MenuItem style={{ fontSize: 12, padding: "5px 16px" }}>
            <Delete style={{ fontSize: 15 }} />
            &nbsp;
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }
}


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withStyles(styles)(Options);
