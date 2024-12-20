import React, { Component } from "react";
import { connect } from "react-redux";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { config } from "../../../../config";
import LinearProgress from "@material-ui/core/LinearProgress";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Voting extends Component {
  state = {
    loading: false,
    vote: null,
    downVotes: 0,
    upVotes: 0
  };

  componentDidMount() {
    const { user, downVotes, upVotes } = this.props;

    this.setState({
      downVotes: downVotes,
      upVotes: upVotes
    });

    if (user.token) {
      this.handleGetVotes();
    }
  }

  handleVote = votingValue => async () => {
    const { user, siteId } = this.props;

    this.setState({
      loading: true
    });

    try {
      const votes = await axios.put(
        config.siteVote,
        { siteId, vote: votingValue },
        { headers: { "x-auth-token": user.token } }
      );

      console.log("votes", votes);

      this.setState({
        vote: votes.data.vote,
        upVotes: votes.data.upVotes,
        downVotes: votes.data.downVotes,
        loading: false
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        loading: false
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { user, count, siteId } = this.props;

    if (prevProps.user.token !== user.token) {
      this.handleGetVotes();
    }
  }

  handleGetVotes = async () => {
    const { user, siteId } = this.props;

    try {
      const votes = await axios.get(config.siteVote + "/" + siteId, {
        headers: { "x-auth-token": user.token }
      });
      console.log("votes", votes);
      // setVote(votes.data.vote);
      // setLoading(false);
      this.setState({
        vote: votes.data.vote,
        loading: false
      });
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
    }
  };

  render() {
    const { loading, vote, upVotes, downVotes } = this.state;
    const percentage = (upVotes / (upVotes + downVotes)) * 100;
    // console.log("percentage", percentage);

    return (
      <div>
        <div>
          <IconButton
            disabled={loading}
            aria-label="thump ups"
            onClick={this.handleVote(1)}
            color={vote === 1 ? "primary" : "default"}
          >
            <ThumbUpAlt />
          </IconButton>
          {upVotes > 0 && <Typography variant="overline">{upVotes}</Typography>}
          <IconButton
            disabled={loading}
            color={vote === 0 ? "primary" : "default"}
            aria-label="thump down"
            onClick={this.handleVote(0)}
          >
            <ThumbDownAlt />
          </IconButton>
          {downVotes > 0 && (
            <Typography variant="overline">{downVotes}</Typography>
          )}
        </div>
        <LinearProgress
          variant="determinate"
          value={isNaN(percentage) ? 0 : percentage}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Voting);
