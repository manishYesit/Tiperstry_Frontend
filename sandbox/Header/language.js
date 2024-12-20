import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    color: "white",
    backgroundColor: "transparent",
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 15,
    padding: "6px 26px 6px 12px",
    marginBottom: 2,
    marginLeft: 5,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    // fontFamily: [
    //   "-apple-system",
    //   "BlinkMacSystemFont",
    //   '"Segoe UI"',
    //   "Roboto",
    //   '"Helvetica Neue"',
    //   "Arial",
    //   "sans-serif",
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"'
    // ].join(","),
    "&:focus": {
      borderRadius: 4,
      // borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));


export default function Language() {
  const classes = useStyles();
  const [age, setAge] = React.useState("English");
  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <NativeSelect
      id="demo-customized-select-native"
      value={age}
      onChange={handleChange}
      input={<BootstrapInput />}
    >
      <option value="English">🌐EN</option>
      <option value="Korean">🌐한국어</option>
    </NativeSelect>
  );
}
