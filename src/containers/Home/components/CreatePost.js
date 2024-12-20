import dynamic from "next/dynamic";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const AddPost = dynamic(() => import("../../../components/AddPost"), {
    ssr: false,
});

import { withTranslation } from "../../../../i18n";

const PostCreate = ({ user, group }) => {
    const classes = useStyles();
    const [addPost, setAddPost] = useState(false);

    const handleOpen = () => {
        if (!user) {
            location.href = "/login";
            return;
        }
        setAddPost(true);
    };

    const handleClose = () => {
        setAddPost(false);
    };

    return (
        <div>
            <AddPost open={addPost} group={group} handleClose={handleClose} />
            <Paper className={classes.root}>
                <div className={classes.grpbtndiv} onClick={handleOpen}>
                    <div className={classes.grpbtn}>Create Post</div>
                </div>
            </Paper>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center", 
		backgroundImage: "url('/static/arrow.png')", 
		borderRadius: "unset",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		height: 41,
		marginBottom: 15,
		boxShadow: "none",
	},
    grpbtn: {
        fontSize: 16,
        color: "#3f48cc",
    },
    nsfw: {
        backgroundColor: "#ff585b",
        color: "white",
        padding: "2px 6px",
        borderRadius: "4px",
    },
    grpbtn2: {
        borderRadius: "50px",
        borderColor: "#58a5de",
        color: "#0079d3",
    },
    grpbtn3: {
        borderRadius: "50px",
        backgroundColor: "#0079d3",
        color: "white",
    },
    formgrp: {
        padding: "20px 0",
        margin: "auto",
    },
    grpbtndiv: {
        cursor: "pointer",
        marginBottom: 15,
        padding: 10,
        alignItems: "center",
        // border: "1px solid #0079d3",
        // borderRadius: "50px",
    },
    ButtonRoot: {
        width: 150,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 2,
    },
    img1: {
        height: 150,
        width: 150,
        display: "block",
    },
}));

export default withTranslation()(PostCreate);
