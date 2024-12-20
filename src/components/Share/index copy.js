import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { shareToggle } from "../../store/actions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import makeStyles from "@material-ui/core/styles/makeStyles"
import FileCopy from "@material-ui/icons/FileCopy";
import Alert from "@material-ui/lab/Alert";
import { url } from "../../../config";
import { nutralizeTitle } from "../../utils";




const mapStateToProps = (state) => ({
	user: state.user
})

const mapDisPatchToProps = {
	shareToggle
}

const Share = ({ shareToggle, user: { share, title, topicId } }) => {
  const classes = useStyle();
  const [copied, setCopied] = React.useState(false);

  const message = `People are talking about: ${title.charAt(0).toUpperCase() +
    title.slice(1)}. Join the conversation`;
  const link = `${url}/topics/${topicId}/${nutralizeTitle(title)}`;

  return (
    <Dialog
      open={share}
      onClose={() => shareToggle()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Share this post to facebook/twitter or copy the link
      </DialogTitle>
      <DialogContent>
        {copied && <Alert severity="success">Link Successfully copied!.</Alert>}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}&t=${message}`}
          // onClick={this.handleCounterForSocial.bind(this, "fb")}
          target="_blank"
          className={classes.social}
        >
          <img src="/static/social/facebook.png" width="25" height="25" />
        </a>
        <a
          href={`https://twitter.com/share?text=${message}&amp;url=${link}`}
          // onClick={this.handleCounterForSocial.bind(this, "tw")}
          target="_blank"
          className={classes.social}
        >
          <img src="/static/social/twitter.png" width="25" height="25" />
        </a>
        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
          <FileCopy style={{ cursor: "pointer", color: "red" }} />
        </CopyToClipboard>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => shareToggle()} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default connect(mapStateToProps, mapDisPatchToProps)(Share);

const useStyle = makeStyles(theme => ({
  social: {
    margin: "20px 5px"
  }
}));