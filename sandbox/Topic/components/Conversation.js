import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Comment from './Comment';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  comment: state.comment
});

const Conversation = (props) => {
	const classes = useStyles();
	const { comment } = props;

	return (
    <Paper className={classes.root}>
      {comment.comments.map((comt) => (
        <div
          key={comt._id}
          style={{
            marginTop: 20,
          }}
        >
          <Comment data={comt} />
        </div>
      ))}
    </Paper>
  );
}


export default connect(mapStateToProps)(Conversation)

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "0 0 0 0",
    // marginBottom: 20,
  },
}));
