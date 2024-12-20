import React from "react";
// import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";


export default function Image(props) {
  const classes = useStyles();
  return <img className={classes.media} src={props.url} />;
}


const useStyles = makeStyles(({ breakpoints }) => ({
  media: {
    display: "block",
    maxWidth: 900,
    maxHeight: 600,
    width: "auto",
    height: "auto",
    [breakpoints.down("xs")]: {
      width: "100%"
    }
  }
}));


















// import React from 'react';
// import Hidden from "@material-ui/core/Hidden"

// export default function Image(props) {
// 	return (
//     <>
//       <Hidden smDown>
//         <img
//           // style={{ width: "auto", height: 600 }}
//           src={props.url}
//           // src={
//           //   "https://image.thum.io/get/image/fit/900x600/auth/3228-www.tipestry.com/" +
//           //   props.url
//           // }
//         />
//       </Hidden>
//       <Hidden smUp>
//         <img
//           style={{ width: "100%" }}
//           src={
//             "https://image.thum.io/get/image/fit/320x240/auth/3228-www.tipestry.com/" +
//             props.url
//           }
//         />
//       </Hidden>
//     </>
//   );
// }