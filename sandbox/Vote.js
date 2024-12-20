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


const mapStateToProps = state => {
	return {
		user: state.user,
	}
}


class Voting extends Component {
  state = {
    loading: false,
    vote: null,
    voteCount: null
  }

  // componentDidMount() {
	//   const { user, count, topicId } = this.props;

  //   this.setState({
  //     voteCount: count
  //   })

  //   if (user.token) {
  //     this.handleGetVotes();
  //   }
  // }
  

	handleVote = votingValue => async () => {
	  const { user, count, topicId } = this.props;

    this.setState({
      loading: true
    })
    try {
      const votes = await axios.put(
        config.topicVote,
        { topicId, vote: votingValue },
        { headers: { "x-auth-token": user.token } }
      );

      console.log("votes", votes);
      
      this.setState({
        vote: votes.data.vote,
        voteCount: votes.data.count,
        loading: false
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        loading: false
      });
    }
  };

  // componentDidUpdate(prevProps, prevState) {
	//   const { user, count, topicId } = this.props;

  //   if (prevProps.user.token !== user.token) {
  //     this.handleGetVotes();
  //   }
  // }
  


  handleGetVotes = async () => {
	  const { user, topicId } = this.props;

    try {
      const votes = await axios.get(config.topicVote + "/" + topicId, {
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
  }

  render() {
    const { loading, vote, voteCount } = this.state;
    return (
      <>
        <IconButton
          disabled={loading}
          size="small"
          aria-label="thump ups"
          onClick={this.handleVote(1)}
          color={vote === 1 ? "primary" : "default"}
        >
          <ThumbUpAlt />
        </IconButton>
        {voteCount && (
          <Typography variant="overline">
            {voteCount == 0 ? "" : voteCount}
          </Typography>
        )}
        <IconButton
          disabled={loading}
          size="small"
          color={vote === 0 ? "primary" : "default"}
          aria-label="thump down"
          onClick={this.handleVote(0)}
        >
          <ThumbDownAlt />
        </IconButton>
      </>
    );
  }
}


// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: 500,
//     margin: theme.spacing(2, .5),
//     "&:hover": {
//       boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
//       // transform: "scale(1.04)"
//       transform: "scale(1.01)"
//     }
//   },
// }));


export default connect(mapStateToProps)(Voting)