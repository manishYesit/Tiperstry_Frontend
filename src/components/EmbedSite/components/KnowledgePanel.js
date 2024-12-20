import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { parse } from "tldjs";
import { config } from "../../../../config";

export default function KnowledgePanel(props) {
  const { url } = props;
  const parsedDomain = parse(url);

  let search = "";
  let domain = "";
  if (parsedDomain.domain != null) {
    domain = parsedDomain.domain;
    search = parsedDomain.domain.split(".")[0];
  } else {
    domain = url;
    search = url.split("://")[1];
  }

  const classes = useStyles();
  const [siteData, setSiteData] = useState({
    title: '',
    type: '',
    website: '',
    image: '',
    description: '',
    wikiLink: '',
    main: {},
    profiles: {},
  });

  useEffect(() => {
    handleLoadable();
  }, []);

  const handleLoadable = async () => {
    try {
      const data = await axios.get(config.siteInfo + "?q=" + search + "&domain=" + domain);

      if (data) {
        setSiteData({
          title: data.data.title,
          type: data.data.type,
          website: data.data.website,
          image: data.data.image,
          description: data.data.description,
          wikiLink: data.data.wikiLink,
          main: data.data.main,
          profiles: data.data.profiles,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Card mt={5}>
        <Box m={1} className={classes.root}>
          {siteData.image && (
            <img src={siteData.image} className={classes.logo} />
          )}
          {siteData.title && (
            <h1>{siteData.title}</h1>
          )}
          {siteData.type && (
            <h4>{siteData.type}</h4>
          )}
          <p>{siteData.description}</p>
          <a href={siteData.wikiLink}>{siteData.wikiLink}</a>
        </Box>
      </Card>
    </>
  );
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: '20%',
    margin: 'auto',
  }
}));
