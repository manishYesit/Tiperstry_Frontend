import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { config } from "../../../../config";

import Button from "@material-ui/core/Button";
import axios from "axios";

const mapStateToProps = ({ user }) => {
  	return {
    	user,
  	};
};

function PostJoinGroup({
  	user: { user },
  	group,
}) {
  	const [userjoined, setUserJoined] = React.useState(false);
  	const [leavesuccess, setleaveSuccess] = React.useState(false);

  	const joinGroup = async () => {
    	try {
      		const token = localStorage.getItem("token");
      		if (token) {
        		let group_joiningstatus = await axios.post(
          			config.joingroup,
          			{
            			userId: user._id,
            			groupId: group._id,
          			},
          			{
            			headers: { "x-auth-token": token },
          			}
        		);
        
        		if (group_joiningstatus.data.message.includes("Left")) {
          			setUserJoined(false);
          			setleaveSuccess(true);
        		} else if (group_joiningstatus.data.message.includes("Joined")){
          			setUserJoined(true);
          			setleaveSuccess(false);
        		}
      		}
    	} catch (error) {
      		console.error("join group error", error);
    	}
  	};

  	const classes = useStyles();

  	return (
    	<Container maxWidth="lg" className={classes.root}>
      		<div className={classes.groupsheader}>
        		<h2
          			style={{
            			color: "black",
            			fontSize: "32px",
            			fontWeight: "600",
            			lineHeight: "normal",
            			width: "100%",
            			textAlign: "center",
          			}}
        		>
          			<a href="javascript:void(0)" style={{ color: "inherit", textDecoration: "none" }}>
            			{group.name}
          			</a>
        		</h2>
        		{user && user._id != group.userId && (
          			<Button
            			onClick={joinGroup}
            			className={classes.joinbtn}
            			color="default"
            			variant="outlined"
          			>
            			{(group.members.includes(user._id) || userjoined) && !leavesuccess && "Leave"}
            			{((!group.members.includes(user._id) && !userjoined) || leavesuccess) && "Join"}
          			</Button>
        		)}
      		</div>
    	</Container>
  	);
}

export default connect(mapStateToProps)(PostJoinGroup);

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;
  return {
    root: {
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    groupsheader: {
      paddingLeft:"8px",
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      backgroundColor: "white",
      marginBottom: "15px",
    },
    joinbtn: {
      borderRadius: "50px",
      borderColor: "#58a5de",
      color: "#0079d3",
      padding: "2px 15px",
      marginLeft: "15px",
      textTransform: "capitalize",
    },
  };
});
