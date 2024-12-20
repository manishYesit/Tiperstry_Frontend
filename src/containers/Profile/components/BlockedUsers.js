import React, { Component } from 'react';
import { connect } from "react-redux";

import axios from "axios";
import { config } from "../../../../config";
import Comment from "./Comment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ThumbNails from "../../../components/ThumbNails";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = state => ({
    profile: state.profile
})

const mapDispatchToProps = {

};

const useStyles = theme => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        display: "flex",
        float: "left",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%"
    },
    left: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    },
    username: {
        marginLeft: theme.spacing(0.5)
    }
});

class BlockedUsers extends Component {
    state = {
        loading: false,
        blockedusers: []
    };

    componentDidMount() {
        const { profile } = this.props;
        this.handleGetBlockedUsersData();
    }

    handleGetBlockedUsersData = async () => {
        const { profile, user } = this.props;
        const { loading, blockedusers } = this.state;

        try {
            if (!loading) {
                const blocked = await axios.get(config.profileBlocked + "/" + profile.username);

                this.setState({
                    loading: true,
                    blockedusers: []
                });

                console.log("blockedusers", blocked.data);

                this.setState({
                    loading: false,
                    blockedusers: blocked.data
                });
            }
        }
        catch (error) {
            this.setState({
                loading: false
            });
        }
    };

    unblockUser = async (userid) => {
        const { profile, user } = this.props;

        await axios.put(
            config.userblock,
            {
                userid: userid
            },
            {
                headers: { "x-auth-token": user.token }
            }
        );

        location.reload();
    }

    render() {
        const { profile, user, classes } = this.props;
        const { loading, blockedusers } = this.state;

        return (
            <div>
                {blockedusers.map((user, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                        <Paper className={classes.root}>
                            <div className={classes.left}>
                                <ThumbNails name={user.username} size="xs" />
                                <Typography
                                    component="a"
                                    color="primary"
                                    href={user.isDeleted ? "#" : "/p/" + user.username}
                                    className={classes.username}
                                >
                                    {user.isDeleted ? (
                                        <>
                                            {"[Deleted]"}
                                        </>
                                    ) : (
                                        <>
                                            @{user.username}
                                        </>
                                    )}
                                </Typography>
                            </div>
                            <Button disabled={loading} onClick={() => { this.unblockUser(user._id) }} size="small" color="warning" variant="outlined">
                                {"Unblock"}
                            </Button>
                        </Paper>

                    </Grid>
                ))}

                {loading && <CircularProgress />}
            </div>
        );
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BlockedUsers));
