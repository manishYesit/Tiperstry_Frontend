import React, { useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TagButton from '../../../components/TagButton';
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios';
import { config } from '../../../../config';
import { withTranslation } from "../../../../i18n";

const TopHashtag = ({ countries_list, t }) => {
  const classes = useStyles();
  const [tags, setTags] = useState([])

  useEffect(() => {
    const clear = setTimeout(async () => {
      handleTag();
    }, 2000);

    return () => {
      clearTimeout(clear)
    };
  }, [])

  const handleTag = async () => {
    try {
      const tagData = await Axios.get(config.topTags);
      setTags(tagData.data);
    } catch (error) {
    }
  }

  const hidden_tags = ["discussion", "pics", "gifs"];
  if (countries_list !== undefined) {
    for (let cntry of countries_list.values()) {
      hidden_tags.push(cntry.code.toLowerCase());
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div style={{ display: "block", width: "100%", padding: "8px", fontSize: "16px" }}>{t("Trending Tags")}</div>

        {tags.map((tag, index) => (
          <Box m={0.5} key={index} style={{ backgroundColor: "#f0f0f0" }}>
            {!hidden_tags.includes(tag) && (<TagButton name={tag} />)}
          </Box>
        ))}
      </Paper>
    </div>
  );
}

// Trending Topics
export default withTranslation()(TopHashtag);

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20
  },
  paper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}));