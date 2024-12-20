import React from 'react'
import ChangeUsername from './components/ChangeUsername'
import Container from "@material-ui/core/Container";
import Header from "../../components/Header"
import ChangePassword from "./components/ChangePassword";
import ChangeProfile from './components/ChangeProfile';
import { connect } from "react-redux";
import dynamic from "next/dynamic";

const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

const mapStateToProps = state => ({
  user: state.user.user
});

const EditProfile = ({ user }) => {
  return (
    <>
      <Header />
      <Container maxWidth="xs" style={{ marginTop: 100 }}>
        {user && !user.usernameChanged && (
          <>
            <ChangeUsername />
            <br />
            <br />
          </>
        )}

        <ChangeProfile />

        <br />
        <br />
        <ChangePassword />
        <Notification />
        <br />
        <br />
      </Container>
    </>
  );
}

export default connect(mapStateToProps)(EditProfile);
