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
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class Voting extends Component {
  state = {
    loading: false,
    vote: null,
    downVotes: 0,
    upVotes: 0,
    justVoted: false,
    up: false,
    down: false
  };

  componentDidMount() {
    const { user, downVotes, upVotes } = this.props;

    this.setState({
      downVotes: downVotes,
      upVotes: upVotes,
    });

    this.handleGetVotes();
  }

  handleVote = (votingValue) => async () => {
    const { user, topicId } = this.props;

    if (user.user == null) {
      location.href = "/login";
      return;
    }

    this.setState({
      loading: true,
    });

    if (votingValue == 1) {
      this.setState({
        up: true
      });
    } else {
      this.setState({
        down: true
      });
    }

    try {
      const votes = await axios.put(
        config.topicVote,
        { topicId, vote: votingValue },
        { headers: { "x-auth-token": user.token } }
      );

      this.setState({
        vote: votes.data.vote,
        upVotes: votes.data.upVotes,
        downVotes: votes.data.downVotes,
        loading: false,
      });

      if (votingValue == 1) {
        this.setState({
          up: false
        });
      } else {
        this.setState({
          down: false
        });
      }
      // this.handleGetVotes()
    } catch (error) {
      this.setState({
        loading: false,
        up: false,
        down: false
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { user, count, topicId } = this.props;

    if (prevProps.user.token !== user.token) {
      this.handleGetVotes();
    }
  }

  handleGetVotes = async () => {
    const { user, topicId } = this.props;
    try {
      if (user.token) {
        const responseVotes = await axios.get(
          config.topicVote + "/" + topicId,
          {
            headers: { "x-auth-token": user.token },
          }
        );

        const topicDetails = await axios.get(config.topics + "/" + topicId, {
          headers: { "x-auth-token": user.token },
        });

        this.setState({
          upVotes: topicDetails.data.upVotes,
          downVotes: topicDetails.data.downVotes,
          vote: responseVotes.data.vote,
          loading: false,
        });
      } else {
        const topicDetails = await axios.get(config.topics + "/" + topicId, {
          headers: { "x-auth-token": user.token },
        });

        this.setState({
          upVotes: topicDetails.data.upVotes,
          downVotes: topicDetails.data.downVotes,
          loading: false,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { loading, vote, justVoted, upVotes, downVotes } = this.state;
    const percentage = (upVotes / (upVotes + downVotes)) * 100;

    return (
      <div style={{ padding: "0px 5px" }}>
        <div>
          <IconButton
            size="small"
            disabled={loading}
            aria-label="thump ups"
            onClick={this.handleVote(1)}
            style={{ height: 20, width: 21 }}
          >
            {this.state.up ? (
              <CircularProgress style={{ color: '#ff8b61', width: '15px', height: '15px' }} />
            ) : (
              <img
                src={
                  vote === 1
                    ? "/static/up-arrow-blue.png"
                    : "/static/up-arrow.png"
                }
              />
            )}
          </IconButton>
          {this.state.upVotes == 0 && this.state.downVotes == 0 && (
            <Typography variant="overline">{"Vote"}</Typography>
          )}
          {(upVotes > 0 || downVotes > 0) && (
            <Typography
              style={{
                minWidth: 30,
                display: "inline-block",
                textAlign: "center",
                color: vote === 1 ? '#ff8b61' : (vote === 0 ? '#9393ff' : '#757575')
              }}
              variant="overline"
            >
              {/* {justVoted
                ? parseInt(this.state.upVotes) - parseInt(this.state.downVotes)
                : parseInt(upVotes) - parseInt(downVotes)} */}
              {parseInt(this.state.upVotes) - parseInt(this.state.downVotes)}
            </Typography>
          )}
          <IconButton
            size="small"
            disabled={loading}
            aria-label="thump down"
            onClick={this.handleVote(0)}
            style={{ height: 20, width: 21 }}
          >
            {this.state.down ? (
              <CircularProgress style={{ color: '#9393ff', width: '15px', height: '15px' }} />
            ) : (
              <img
                src={
                  vote === 0
                    ? "/static/down-arrow-blue.png"
                    : "/static/down-arrow.png"
                }
              />
            )}
          </IconButton>
          {/* {downVotes > 0 && (
            <Typography variant="overline">{downVotes}</Typography>
          )} */}
        </div>
        {/* <LinearProgress
          variant="determinate"
          value={isNaN(percentage) ? 0 : percentage}
        /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Voting);
