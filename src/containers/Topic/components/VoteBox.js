import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { withTranslation } from "../../../../i18n";

function formatDateString(date) {
  	return new Date(date).toDateString();
}

const VoteBox = ({ topic, t }) => {
  	const classes = useStyles();
  	
	let percentage = 100;
	if (topic.upVotes || topic.downVotes) {
  		percentage = parseInt((topic.upVotes / (topic.upVotes + topic.downVotes)) * 100);
	}

  	return (
    	<div className={classes.root}>
      		<Paper className={classes.paper}>
		    	<div style={{ width: '100%' }}>
		      		<p>{t('this post was submitted on ')}{formatDateString(topic.createdAt)}</p>
		      		<p><b style={{ fontSize: "14px" }}>{parseInt(topic.upVotes) - parseInt(topic.downVotes)} points</b> ({percentage}% upvoted)</p>
					{topic.url ?
		      			<p>link: <a href={topic.url} target='_blank'><input type="text" style={{ border: "1px solid gray", height: "25px", width: "65%" }} value={topic.url}/></a></p>
						: <></>
					}	
		    	</div>
		  	</Paper>
    	</div>
  	);
};

// Trending Topics
export default withTranslation()(VoteBox);

const useStyles = makeStyles((theme) => ({
  	root: {
    	marginTop: 15,
    	marginBottom: 15,
  	},
  	paper: {
    	display: "flex",
    	padding: "5px 20px",
    	justifyContent: "flex-start",
    	alignItems: "flex-start",
    	flexDirection: "row",
    	flexWrap: "wrap",
    	background: "#f3f9ff",
  	}
}));
