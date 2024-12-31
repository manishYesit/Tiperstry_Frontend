import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ReferalComponent from "../../../components/Referal"

const mapStateToProps = state => ({
	profile: state.profile
})

class ReferalSection extends Component {
  state = {
    loading: false
  };

  render() {
    const { profile } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Grid  container spacing={1}>
          {
           profile.referals ? 
           <ReferalComponent data="profile.referals" /> :
           <div>
             You currentlly dont have a referal link generate now.
           </div> }
        </Grid>
      </div>
    );
  }
};


export default connect(mapStateToProps, null)(ReferalSection)
