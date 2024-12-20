import React, { Component } from "react";
import { connect } from "react-redux";
import { setProfileFollowing } from "../../../store/actions";
import axios from "axios";
import { config } from "../../../../config";
import Comment from "./Comment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Follow from "./Follow";
import Grid from "@material-ui/core/Grid";

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  setProfileFollowing,
};

class CommentsSection extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { profile } = this.props;

    if (typeof profile.following[0] === "undefined") {
      this.handleGetFollows();
    }
  }

  handleGetFollows = async () => {
    const { profile, setProfileFollowing } = this.props;
    const { loading } = this.state;

    try {
      console.log("this is the prfile i just consoled", profile);
      if (!loading) {
        const following = await axios.get(
          config.profileFollowing + "/" + profile.user.username
        );

        this.setState({
          loading: true,
        });

        setProfileFollowing(following.data);
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { profile, currentuser } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Grid container spacing={1}>
          {profile.following.map((user, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Follow
                profile={profile}
                user={user}
                buttonName="follower"
                currentuser={currentuser}
              />
            </Grid>
          ))}
        </Grid>

        {loading && <CircularProgress />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
