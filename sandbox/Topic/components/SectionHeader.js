import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import { setToggleComment } from "../../../store/actions"
import { withTranslation } from "../../../../i18n"

const mapDispatchToProps = {
  setToggleComment
};

const SectionHeader = ({ setToggleComment, topicId, t }) => {
	const classes = useStyles();

	const handleOpen = () => {
		setToggleComment({
			openComment: true,
			commentId: null,
			topicId,
			type: "comment"
		})
	}

	return (
    <div>
      {/* <div className={classes.header}>
        <Typography variant="h4">{t("Join The Conversation")}</Typography>
        <Button color="primary" variant="outlined" onClick={handleOpen}>
          {t("Add Comment")}
        </Button>
      </div> */}
    </div>
  );
}


export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(SectionHeader));

const useStyles = makeStyles(theme => ({
	header: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		alignItems: "center",
		flexDirection: "row"
	}
}))
