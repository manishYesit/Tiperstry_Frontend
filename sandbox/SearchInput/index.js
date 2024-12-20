import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import Router from "next/router";
import isURL from "validator/lib/isURL";
import FormHelperText from "@material-ui/core/FormHelperText";


const SearchInput = () => {
  const classes = useStyles();
  const [url, setUrl] = React.useState("");
  const [res, setRes] = React.useState({
    err: false,
    msg: ""
  });
  
  const handleLoadUrl = async (event) => {
    event.preventDefault();

    if (url === "") { 
      setRes({ msg: "Url is required", err: true });
      return;
    }

    if (
      !isURL(url, {
        require_valid_protocol: true,
        protocols: ["http", "https", "ftp"],
        require_protocol: true
      })
    ) {
      setRes({
        err: true,
        msg: "Please enter a valid URL.",
      });
      return;
    }


    if (
      !isURL(url, {
        require_valid_protocol: true,
        protocols: ["http", "https", "ftp"],
        require_protocol: true,
      })
    ) {
      setRes({
        err: true,
        msg: "Please enter a valid URL.",
      });
      return;
    }

    setRes({ msg: "", err: false });

    Router.push("/sites?s=" + url);
  }


  const handleUrl = (event) => {
    setUrl(event.target.value);
  }

  return (
    <Paper className={classes.root}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="row"
        width="100%"
      >
        <SearchIcon className={classes.icon} />

        <Input
          className={classes.input}
          error={res.err}
          // disableUnderline
          placeholder=" Enter a URL"
          helperText={res.err && res.msg}
          onChange={handleUrl}
          startAdornment={
            <InputAdornment>
              https://
            </InputAdornment>
          }
        />
        <Button onClick={handleLoadUrl}>Search</Button>
      </Box>
      {res.err && (
        <FormHelperText
          variant="outlined"
          error={true}
          filled={true}
          margin="dense"
        >
          {res.msg}
        </FormHelperText>
      )}
    </Paper>
  );
};

// SearchInput.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object
// };

export default SearchInput;

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
  root: {
    width: 420,
    [breakpoints.down("xs")]: {
      width: "100%",
    },
    flexDirection: "column",
    borderRadius: "4px",
    alignItems: "center",
    padding: spacing(1),
    margin: spacing(.5, 2),
    display: "flex",
    flexBasis: 420,
  },
  icon: {
    marginRight: spacing(1),
    color: palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
}));



















































































// import React from 'react'
// import { makeStyles } from '@material-ui/core'
// import InputBase from "@material-ui/core/InputBase";
// import IconButton from "@material-ui/core/IconButton";
// import InfoOutlined from "@material-ui/icons/InfoOutlined";
// import StarBorder from "@material-ui/icons/StarBorder";
// import Button from "@material-ui/core/Button";
// import Box from "@material-ui/core/Box";
// import axios from 'axios';
// import { config } from '../../../config';
// import Router from "next/router";
// import isURL from "validator/lib/isURL";
// import FormHelperText from "@material-ui/core/FormHelperText";


// export default function index() {
//   const classes = useStyles();
//   const [url, setUrl] = React.useState("");
//   const [res, setRes] = React.useState({
//     err: false,
//     msg: ""
//   });
  
//   const handleLoadUrl = async (event) => {
//     event.preventDefault();

//     console.log("hit");
    

//     if (url === "") { 
//       setRes({ msg: "Url is required", err: true });
//       return;
//     }

//     if (
//       !isURL(url, {
//         require_valid_protocol: true,
//         protocols: ["http", "https", "ftp"],
//         require_protocol: true
//       })
//     ) {
//       setRes({
//         err: true,
//         msg: "A Valid URL is required",
//       });
//       return;
//     }

//     setRes({ msg: "", err: false });

//     Router.push("/sites?s=" + url);
//   }


//   const handleUrl = (event) => {
//     setUrl(event.target.value);
//   }

// 	return (
//     <Box className={classes.form}>
//       <Box className={classes.container}>
//         <InputBase
//           className={classes.root}
//           fullWidth
//           placeholder="Enter a URL"
//           // helperText={res.err && res.msg}
//           error={res.err}
//           onChange={handleUrl}
//           startAdornment={
//             <IconButton className={classes.icon}>
//               <InfoOutlined />
//             </IconButton>
//           }
//         />
//         {res.err && (
//           <FormHelperText variant="outlined" error={true} filled={true} margin="dense">
//             {res.msg}
//           </FormHelperText>
//         )}
//       </Box>
//       <Button
//         onClick={handleLoadUrl}
//         type="submit"
//         variant="contained"
//         size="small"
//         color="primary"
//       >
//         Load
//       </Button>
//     </Box>
//   );
// }



// const useStyles = makeStyles(({ spacing }) => ({
//   root: {
//     backgroundColor: "#e5e5e5",
//     borderRadius: 5,
//     width: 320,
//     padding: spacing(1) / 4,
//   },
//   icon: {
//     padding: `${spacing(1) / 2}px ${spacing(1)}px`,
//     borderRadius: 100,
//   },
//   container: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//   },
//   form: {
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//     flexDirection: "row",
//     margin: spacing(2, 0.2),
//   },
// }));

//     // try {
//     //   const loadUrl = await axios.post(config.site, { url });

//     //   console.log("loadUrl", loadUrl);
      
//     //   Router.push("/sites?s=" + loadUrl.data.url);
//     // } catch (error) {
//     //   console.log("error.response", error);
//     //   setRes({ msg: error.response.data, err: true }); 
//     // }