import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  setProfileFollowers
} from "../../../store/actions";
import axios from "axios";
import { config } from "../../../../config";
import Comment from "./Comment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Follow from "./Follow";
import Grid from "@material-ui/core/Grid";

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = {
  setProfileFollowers
};

class CommentsSection extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const { profile } = this.props;

    if (typeof profile.followers[0] === "undefined") {
      this.handleGetFollows();
    }
  }

  handleGetFollows = async () => {
    const { profile, setProfileFollowers } = this.props;
    const { loading } = this.state;

    try {
      if (!loading) {
        const followers = await axios.get(config.profileFollowers + "/" + profile.username);

        this.setState({
          loading: true
        });

        setProfileFollowers(followers.data);
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { profile, currentuser } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Grid container spacing={1}>
          {profile.followers.map((user, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Follow profile={profile} currentuser={currentuser} user={user} buttonName="follower" />
            </Grid>
          ))}
        </Grid>

        {loading && <CircularProgress />}
      </div>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection)
