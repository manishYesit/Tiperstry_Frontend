import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class SearchCard extends Component {
  state = {
    topic: null
  };

  componentDidMount() {
    const { user, topic } = this.props;
    this.setState({
      topic
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Link>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h4" color="primary">Hello this is one card</Typography>
            <Typography variant="p" paragraph>This a sweet stroy about this one card</Typography>
            <Typography variant="small" color="muted" >{(new Date()).toString()}</Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }
}
const styles = theme => ({
  root: {
    marginTop: 20
  }
});

export default connect(
  mapStateToProps
)(withStyles(styles)(SearchCard));
