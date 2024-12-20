import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { config } from "../../../../config";
import Hidden from "@material-ui/core/Hidden";


export default function Iframe(props) {
	const { url } = props;
  const classes = useStyles();
  const [loadable, setLoadable] = useState(false)

	const error = (err) => {
		// console.log("err iframe", err);
  }
  
  useEffect(() => {
    handleLoadable();
  }, [])


  const handleLoadable = async () => {
    try {
      const load = await axios.get(config.validateUrl + "?url=" + url);

      // console.log("load", load);

      setLoadable(load.data.loadable);
    } catch (error) {
      // console.log("error", error);
      
    }
  }


	return (
    <>
      {loadable ? (
        <iframe
          id="frame"
          // title="Inline Frame Example"
          // width="300"
          // height="200"
          className={classes.frame}
          src={url}
          onLoad={error}
          allow="fullscreen"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      ) : (
        <a 
          href={props.url} 
          className={classes.root} 
          target="_blank"
        >
          <Hidden smDown>
            <img
              className={classes.large}
              src={
                "//image.thum.io/get/width/900/crop/900/png/auth/3228-www.tipestry.com/" +
                props.url
              }
            />
          </Hidden>
          <Hidden smUp>
            <img
              className={classes.samll}
              src={
                "//image.thum.io/get/iphoneX/noanimate/hidePopovers/auth/3228-www.tipestry.com/" +
                props.url
              }
            />
          </Hidden>
        </a>
      )}
    </>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex", justifyContent: "center"
  },
  frame: {
    width: "100%",
    height: 600,
    // height: "60vh",
    marginTop: 20
  },
  large: {
    width: "100%",
    height: 600,
    // height: "60vh",
    marginTop: 20
  },
  samll: {
    // height: "60vh",
    height: 600,
    marginTop: 20
  }
}));


                // "//image.thum.io/get/iphoneX/noanimate/hidePopovers/auth/3228-www.tipestry.com/" +

