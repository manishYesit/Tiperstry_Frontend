import React, { Component } from "react";
import { connect } from "react-redux";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { config } from "../../../../config";

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
  };

  componentDidMount() {
    const { user, downVotes, upVotes } = this.props;

    // this.setState({
    //   downVotes: downVotes,
    //   upVotes: upVotes
    // });

    // if (user.token) {
    this.handleGetVotes();
    // }
  }

  handleVote = (votingValue) => async () => {
    const { user, topicId } = this.props;

    this.setState({
      loading: true,
    });

    try {
      const votes = await axios.put(
        config.topicVote,
        { topicId, vote: votingValue },
        { headers: { "x-auth-token": user.token } }
      );

      console.log("votes", votes);

      this.setState({
        vote: votes.data.vote,
        upVotes: votes.data.upVotes,
        downVotes: votes.data.downVotes,
        loading: false,
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        loading: false,
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
        const votes = await axios.get(config.topicVote + "/" + topicId, {
          headers: { "x-auth-token": user.token },
        });

        this.setState({
          vote: votes.data.vote,
          loading: false,
        });
      } else {
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
    }
  };

  render() {
    const { loading, vote, upVotes, downVotes } = this.state;
    const { classes } = this.props;

    const total = Number(upVotes) + Number(downVotes);
    return (
      <div className={classes.VoteRoot}>
        <IconButton
          disabled={loading}
          aria-label="thump ups"
          size="small"
          onClick={this.handleVote(1)}
          color={vote === 1 ? "primary" : "default"}
        >
          <ThumbUpAlt />
        </IconButton>
        {total > 0 && <Typography variant="overline">{total}</Typography>}
        <IconButton
          disabled={loading}
          color={vote === 0 ? "primary" : "default"}
          aria-label="thump down"
          size="small"
          onClick={this.handleVote(0)}
        >
          <ThumbDownAlt />
        </IconButton>
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  VoteRoot: {
    display: "flex",
    flexDirection: "column",
    // margin: spacing(1, 2),
    padding: spacing(0.5, 1),
  },
});
export default connect(mapStateToProps)(withStyles(styles)(Voting));
