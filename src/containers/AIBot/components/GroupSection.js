import React, { Component } from 'react';
import { connect } from "react-redux";

import axios from "axios";
import { config } from "../../../../config";
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

class GroupSection extends Component {
    state = {
        loading: false,
        groupslist: []
    };

    componentDidMount() {
        const { profile } = this.props;
        this.handleGetGroupsList();
    }

    handleGetGroupsList = async () => {
        const { profile, user } = this.props;
        const { loading, groupslist } = this.state;

        try {
            if (!loading) {
                const token = localStorage.getItem("token");
                const groups = await axios.get(config.listgroups + "?joinedgroups=1&username=" + profile.username, {
                    headers: { "x-auth-token": token },
                });

                this.setState({
                    loading: true,
                    groupslist: []
                });

                console.log("groupslist", groups.data);
                if (groups.data.status == "success") {
                    this.setState({
                        loading: false,
                        groupslist: groups.data.groups
                    });
                }
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

    joinGroup = async (groupid) => {
        const { profile, currentuser } = this.props;
        try {
            const token = localStorage.getItem("token");
            if (token) {
                let group_joiningstatus = await axios.post(config.joingroup, {
                    userId: currentuser._id,
                    groupId: groupid
                }, {
                    headers: { "x-auth-token": token },
                });
                location.reload();
            }
        } catch (error) {
            console.error("join group error", error);
        }
    }

    render() {
        const { profile, user, classes } = this.props;
        const { loading, groupslist } = this.state;

        return (
            <div>
                {groupslist.map((group, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                        <Paper className={classes.root}>
                            <div className={classes.left}>
                                <img src={group.icon ? config.getImage + group.icon : "/static/tipcoin.png"} height={60} width={"auto"} />
                                <Typography

                                >
                                    <a style={{ color: "inherit", textDecoration: 'none' }} href={"/group/" + group.name.split(" ").join("-")}>{group.name}</a>
                                </Typography>
                            </div>
                            <Button disabled={loading} onClick={() => { this.joinGroup(group._id) }} size="small" color="warning" variant="outlined">
                                {"Leave"}
                            </Button>
                        </Paper>

                    </Grid>
                ))}

                {loading && <CircularProgress />}
            </div>
        );
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(GroupSection));
