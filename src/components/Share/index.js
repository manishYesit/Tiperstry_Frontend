import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect, useDispatch, useSelector } from "react-redux";
import { shareToggle } from "../../store/actions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import makeStyles from "@material-ui/core/styles/makeStyles"
import FileCopy from "@material-ui/icons/FileCopy";
import Alert from "@material-ui/lab/Alert";
import { url } from "../../../config";
import { nutralizeTitle } from "../../utils";

import { withTranslation } from "../../../i18n";

import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
TwitterShareButton,
TelegramShareButton,
TelegramIcon,
WhatsappShareButton,
WhatsappIcon,
LinkedinShareButton,
LinkedinIcon,
RedditShareButton,
RedditIcon
} from "react-share";



// const mapStateToProps = (state) => ({
// 	user: state.user
// })

const Share = ({ t}) => {
  const classes = useStyle();
  const [copied, setCopied] = React.useState(false);
  const dispatch = useDispatch();
  const { share, title, topicId } = useSelector(({ user }) => user);

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
      <DialogContent>
        {copied && <Alert severity="success">{t("Link Copied Successfully")}</Alert>}
        <FacebookShareButton
          url={link}
          className={classes.social}
          quote={message}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={link}
          className={classes.social}
          title={message}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton
          className={classes.social}
          url={link}
          title={message}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={link}
          title={message}
          className={classes.social}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton
          className={classes.social}
          url={link}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton
          url={link}
          title={message}
          windowWidth={660}
          windowHeight={460}
          className={classes.social}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
          <FileCopy
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: 32,
              marginLeft: 5
            }}
          />
        </CopyToClipboard>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(shareToggle())}
          color="primary"
          autoFocus
        >
          { t("Close") }
        </Button>
      </DialogActions>
    </Dialog>
  );
};


// export default connect(mapStateToProps, mapDisPatchToProps)(Share);
export default withTranslation()(Share);

const useStyle = makeStyles(theme => ({
  social: {
    margin: "20px 5px"
  }
}));