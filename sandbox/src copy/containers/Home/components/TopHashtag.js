import React from 'react'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TagButton from '../../../components/TagButton';
import { makeStyles } from "@material-ui/core/styles";


const mockData = [
  "weareone",
  "testingtag",
  "linkedin",
  "openthedoor",
  "tipestry",
  "bitcoin",
  "business",
  "money",
  "accounting",
  "weareone",
  "testingtag",
  "linkedin",
  "openthedoor",
  "tipestry",
  "bitcoin",
  "business",
  "money",
  "accounting"
];

export default function TopHashtag() {
	const classes = useStyles();
	return (
    <div className={classes.root}>
      <Typography variant="caption">Top Hashtags</Typography>
      <Paper className={classes.paper}>
        {mockData.map((tag, index) => (
          <Box m={0.5}>
            <TagButton key={index} name={tag} />
          </Box>
        ))}
      </Paper>
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}));