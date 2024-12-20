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
import TipSite from "./TipSite";
import DisplayTips from "../../../components/Card/components/ClassicCard/components/DisplayTips";
// import DisplayTip from "./DisplayTip";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    tips: [],
  };

  async getSiteTips() {
    const { user, siteId } = this.props;
    try {
      const tip = await axios.get(config.tipSite + "/" + siteId);

      // console.log("tiptip", tip);
      this.setState({ tips: tip.data });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response);
    }
  }

  componentDidMount() {
    const { user, downVotes, upVotes } = this.props;
    this.setState({
      downVotes: downVotes,
      upVotes: upVotes,
    });

    if (user.token) {
      this.handleGetVotes();
    }
  }

  handleVote = (votingValue) => async () => {
    const { user, siteId, voteType } = this.props;
    if (user.user == null) {
      location.href = "/login";
      return;
    }
    this.setState({
      loading: true,
    });

    try {
      const votes = await axios.put(
        config.siteVote,
        { siteId, vote: votingValue, vote_type: voteType },
        { headers: { "x-auth-token": user.token } }
      );

      // console.log("votes", votes);

      this.setState({
        vote: votes.data.vote,
        upVotes:
          voteType == "site" ? votes.data.upVotes : votes.data.domain_upVotes,
        downVotes:
          voteType == "site"
            ? votes.data.downVotes
            : votes.data.domain_downVotes,
        loading: false,
      });
    } catch (error) {
      // console.log("error", error);
      this.setState({
        loading: false,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { user, count, siteId } = this.props;
    const { tips, vote } = this.state;

    // if (this.state.tips.length <= 0) {
    //   console.log("this tips area ran", tips);
    //   this.getSiteTips();
    // }

    if (prevProps.user.token !== user.token && vote == null) {
      this.handleGetVotes();
    }
  }

  handleGetVotes = async () => {
    const { user, siteId, voteType } = this.props;

    try {
      const votes = await axios.get(
        config.siteVote + "/" + siteId + "?vote_type=" + voteType,
        {
          headers: { "x-auth-token": user.token },
        }
      );
      // console.log("votes", votes);
      // setVote(votes.data.vote);
      // setLoading(false);
      this.setState({
        vote: votes.data.vote,
        loading: false,
      });
    } catch (error) {
      // console.log("error", error);
      // console.log("error", error.response);
    }
  };

  render() {
    const { loading, vote, upVotes, downVotes, tips } = this.state;
    const { user, siteId } = this.props;
    const percentage = (upVotes / (upVotes + downVotes)) * 100;
    // // console.log("percentage", percentage);

    return (
      <>
        <div>
          <div>
            <IconButton
              disabled={loading}
              aria-label="thump ups"
              onClick={this.handleVote(1)}
              
            >
              <img src={vote === 1 ? "/static/up-arrow-blue.png" : "/static/up-arrow.png"} />
            </IconButton>
            {upVotes == 0 && downVotes == 0 && <Typography variant="overline">{"Vote"}</Typography>}
            {(upVotes > 0 || downVotes > 0) && <Typography style={{minWidth:30,display:"inline-block",textAlign:"center"}} variant="overline">{parseInt(upVotes) - parseInt(downVotes)}</Typography>}
            <IconButton
              disabled={loading}
              
              aria-label="thump down"
              onClick={this.handleVote(0)}
            >
              <img src={vote === 0 ? "/static/down-arrow-blue.png" : "/static/down-arrow.png"} />
            </IconButton>
            {downVotes > 0 && (
              <Typography variant="overline">{downVotes}</Typography>
            )}
            <TipSite siteId={siteId} />
          </div>

          <LinearProgress
            variant="determinate"
            value={isNaN(percentage) ? 0 : percentage}
            style={{
              width: "75px",
              float: "left",
              margin: "0px 11px",
            }}
          />
        </div>
        {tips.length > 0 && <DisplayTips tips={tips} />}
      </>
    );
  }
}

export default connect(mapStateToProps)(Voting);
