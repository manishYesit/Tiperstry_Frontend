import React from 'react';
import EditProfileComponent from "../../src/containers/EditProfile";
import { config } from "../../config";
import axios from "axios";
import { connect } from "react-redux";
import {
  setToken,
  setUserData,
} from "../../src/store/actions";
import Router from "next/router";
import { withTranslation } from "../../i18n";



const mapDispatchToProps = {
  setUserData,
  setToken,
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};


const EditProfile = ({ setUserData, setToken }) => {
  React.useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token }
        });

        setUserData(user.data);
        sessionStorage.setItem("userData", user.data);
      } else {
        Router.push("/");
      }
      setToken(token);
    } catch (error) {
      Router.push("/");
    }
  };

  return (
    <div>
      <EditProfileComponent />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditProfile));
