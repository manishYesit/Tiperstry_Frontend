import React from "react";
import AdminComponent from "../src/containers/Admin";
import { config } from "../config";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { setToken, setUserData } from "../src/store/actions";
import Router from "next/router";

let dispatch;
export const handleGetUser = async () => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const user = await axios.get(config.me, {
        headers: { "x-auth-token": token },
      });

      if (!user.data.isAdmin) Router.push("/");
      dispatch(setUserData(user.data));
      sessionStorage.setItem("userData", JSON.stringify(user.data));
    } else {
      Router.push("/");
    }
    dispatch(setToken(token));
    setToken(token);
  } catch (error) {
    console.log("error", error);
    Router.push("/");
  }
};

const mapDispatchToProps = {
  setUserData,
  setToken,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const Admin = ({ setUserData, setToken }) => {
  dispatch = useDispatch();

  React.useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div>
      <AdminComponent />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
