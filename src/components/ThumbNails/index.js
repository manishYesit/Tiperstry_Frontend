import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { config } from "../../../config"


const styles = {
  avatar: {
    margin: "auto",
  },
  bigAvatar: {
    margin: "auto",
    width: 60,
    height: 60,
  },
};

const colors = {
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  lightblue: "#add8e6",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  yellow: "#ffff00"
}



class Thumbnails extends Component {
  colorRan() {
    var result;
    var count = 0;
    for (var prop in colors)
      if (Math.random() < 1 / ++count)
        result = prop;
    return result;
  }

  render() {
    const {
      classes,
      url,
      size,
      borderWidth,
      borderColor,
      name,
      color
    } = this.props;

    const xs = {
      backgroundColor: color !== "" ? color :this.colorRan(),
      width: 35,
      height: 35,
      fontSize: 14,
      border: `${borderWidth}px solid ${borderColor}`
    }
    const sm = {
      backgroundColor: color !== "" ? color : this.colorRan(),
      width: 45,
      height: 45,
      border: `${borderWidth}px solid ${borderColor}`
      // fontSize: 50
    }
    const md = {
      backgroundColor: color !== "" ? color : this.colorRan(),
      width: 60,
      height: 60,
      fontSize: 35,
      border: `${borderWidth}px solid ${borderColor}`
    }
    const lg = {
      backgroundColor: color !== "" ? color : this.colorRan(),
      width: 75,
      height: 75,
      fontSize: 50,
      border: `${borderWidth}px solid ${borderColor}`
      
    }
    const xl = {
      backgroundColor: color !== "" ? color : this.colorRan(),
      width: 115,
      height: 115,
      fontSize: 90,
      border: `${borderWidth}px solid ${borderColor}`
    }
    let sizer;
    if (size === "sm") {
      sizer = sm;
    } else if(size === 'md') {
      sizer = md;
    } else if (size === 'lg') {
      sizer = lg;
    } else if (size === 'xl') {
      sizer = xl;
    } else if (size === 'xs') {
      sizer = xs;
    }
    if (url) {
      return (
        <Avatar src={config.getImage + url} className={classes.avatar} style={sizer} />
      );
    } else {
      return (
        <Avatar className={classes.avatar} style={sizer}>
          {name ? name.charAt(0).toUpperCase() : ""}
        </Avatar>
      );
    }
  }
}

Thumbnails.defaultProps = {
  url: null,
  borderWidth: 0,
  borderColor: 'transparent',
  size: 'sm',
  color: ''
};


Thumbnails.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  color: PropTypes.string,
};

export default withStyles(styles)(Thumbnails);
