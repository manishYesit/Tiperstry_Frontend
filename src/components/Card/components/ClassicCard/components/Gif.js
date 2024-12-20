import React from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from '../../../../../utils';
import Hidden from "@material-ui/core/Hidden";
import { isMobile } from "react-device-detect";


export default function Gif(props) {
  const classes = useStyles();
  
  // const [dimension, setDimension] = React.useState({
  //   width: -1,
  //   height: -1,
  // });

  // //  get the image dimension and render based on that.
  // const onImgLoad = ({ target: img }) => {
  //   // setDimension({ height: img.offsetHeight, width: img.offsetWidth });
  //   setDimension({ height: img.naturalHeight, width: img.naturalWidth });
  // };

	return (
    <a
      className={classes.root}
      href={"/topics/" + props.topicId + "/" + nutralizeTitle(props.title)}
    >
        <img
          // onLoad={onImgLoad}
          className={clsx("lozad", classes.media)}
          // className={dimension.width > 600 && classes.media}
          data-src={props.url}
        />
    </a>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  media: {
    // width: "100%",
    display: "block",
    maxWidth: 500,
    maxHeight: 600,
    width: "auto",
    height: "auto",
  },
}));









// {
//   isMobile ? (
//     <img
//       onLoad={onImgLoad}
//       className={clsx("lozad", dimension.width > 600 && classes.media)}
//       // className={dimension.width > 600 && classes.media}
//       data-src={props.url}
//     />
//   ) : (
//     <img
//       onLoad={onImgLoad}
//       className={clsx("lozad", dimension.width > 600 && classes.media)}
//       // className={dimension.width > 600 && classes.media}
//       data-src={props.url}
//     />
//   );
// }


// <Hidden smDown>
//         <img
//           onLoad={onImgLoad}
//           className={clsx("lozad", dimension.width > 600 && classes.media)}
//           data-src={props.url}
//         />
//       </Hidden>
//       <Hidden smUp>
//         <img
//           onLoad={onImgLoad}
//           className={clsx("lozad", dimension.width > 400 && classes.media)}
//           data-src={props.url}
//         />
//       </Hidden>