import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { withTranslation } from "../../../i18n";

import { setLanguage } from "../../store/actions"

import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux"


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const mapStateToProps = ({ site }) => ({
  site
});

const mapDispatchToProps = {
  setLanguage
};

const Language =  ({ i18n, site, setLanguage }) => {
  const [age, setAge] = React.useState(i18n.language == undefined ? "en" : i18n.language );

  React.useEffect(() => {
    setAge(localStorage.getItem("lang") || "en")
  }, []);

  const handleChange = (event) => {
    setLanguage(event.target.value)
    setAge(event.target.value);
    i18n.changeLanguage(event.target.value);
  };
     
  return (
    <TextField
      id="outlined-select-currency"
      className="language-dropdown"
      select
      value={age}
      color="secondary"
      size="small"
      onChange={handleChange}
      variant="outlined"
    >
      <MenuItem value="en">🌐 EN</MenuItem>
      <MenuItem value="ko">🌐 한국어</MenuItem>
      <MenuItem value="cn">🌐 中文</MenuItem>
    </TextField>
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Language));


{/* <NativeSelect
  id="demo-customized-select-native"
  value={age}
  onChange={handleChange}
  input={<BootstrapInput />}
>
  <option value="en">🌐EN</option>
  <option value="ko">🌐한국어</option>
</NativeSelect>; */}



// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     color: "white",
//     backgroundColor: "transparent",
//     // backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 15,
//     padding: "6px 26px 6px 12px",
//     marginBottom: 2,
//     marginLeft: 5,
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     // fontFamily: [
//     //   "-apple-system",
//     //   "BlinkMacSystemFont",
//     //   '"Segoe UI"',
//     //   "Roboto",
//     //   '"Helvetica Neue"',
//     //   "Arial",
//     //   "sans-serif",
//     //   '"Apple Color Emoji"',
//     //   '"Segoe UI Emoji"',
//     //   '"Segoe UI Symbol"'
//     // ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       // borderColor: "#80bdff",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
//     },
//   },
// }))(InputBase);
