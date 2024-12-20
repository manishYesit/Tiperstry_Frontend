import React from 'react';
import { fbAppID } from '../../../../../../config.js'
import { makeStyles } from "@material-ui/core/styles";
import { FacebookProvider, EmbeddedPost,  } from "react-facebook";


export default function Facebook({url}) {
    return (
        <FacebookProvider appId={fbAppID}>
          <EmbeddedPost href={url} width="450" />
        </FacebookProvider>
    );
} 




const useStyles = makeStyles((theme) => ({
    media: {
      width: "100%",
      display: "block",
      maxWidth: 500,
      maxHeight: 600,
      height: "auto",
    },
    root: {
      display: "flex",
      justifyContent: "center",
    },
  }));