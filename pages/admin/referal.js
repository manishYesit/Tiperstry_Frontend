import React from "react";
import ReferalComponent from "../../src/containers/Admin/referal";
import { connect } from "react-redux";
import { setToken, setUserData } from "../../src/store/actions";
import { handleGetUser } from "../admin";

const mapDispatchToProps = {
  setUserData,
  setToken
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const Referal = () => {
  React.useEffect(() => {
    handleGetUser();
  }, []);


  return (
    <ReferalComponent />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Referal);
