import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    // contrastText: black,
    dark: "#D80954",
    main: "#D80954",
    light: "#D80954"
  },
  secondary: {
    contrastText: black,
    dark: "#37474f",
    main: white,
    light: white
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.grey[900],
    secondary: colors.grey[600],
    link: colors.grey[500]
  },
  background: {
    // default: white,
    paper: white
  },
  icon: colors.grey[600],
  // divider: white
  divider: colors.grey[300]
};
