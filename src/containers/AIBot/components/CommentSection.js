import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  setCommentsForProfile,
  setCurrentPageProfile
} from "../../../store/actions";
import axios from "axios";
import { config } from "../../../../config";
import Comment from "./Comment";
import CircularProgress from "@material-ui/core/CircularProgress";
import BottomScrollListerer from "react-bottom-scroll-listener";

const mapStateToProps = state => ({
	profile: state.profile
})

const mapDispatchToProps = {
  setCommentsForProfile,
  setCurrentPageProfile
};

class CommentsSection extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const { profile } = this.props;

    if (typeof profile.comments[0] === "undefined") {
      this.handleGetTopics();
    }
  }

  handleGetTopics = async () => {
    const {
      profile,
      setCommentsForProfile,
      setCurrentPageProfile
    } = this.props;
    const { loading } = this.state;

    try {
      if (!loading) {
        const nextComments = await axios.get(
          config.profileComment +
            "/" +
            profile.username +
            "?page=" +
            profile.commentCurrentPage
        );

        this.setState({
          loading: true
        });

        nextComments.data.comments.forEach(element => {
          profile.comments.push(element);
        });
        profile.commentPage = nextComments.data.page;
        profile.commentTotal = nextComments.data.total;

        const pageNo = Number(profile.commentCurrentPage) + 1;
        setCommentsForProfile(profile);
        this.setState({
          loading: false
        });

        setCurrentPageProfile({
          page: "commentCurrentPage",
          pageNo
        });
      }
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { profile } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <BottomScrollListerer onBottom={this.handleGetTopics}>
          {profile.comments.map((com, index) => (
            <Comment key={index} comment={com} />
          ))}
        </BottomScrollListerer>

        {loading && <CircularProgress />}
      </div>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection)
