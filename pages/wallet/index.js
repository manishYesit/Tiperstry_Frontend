import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserData, setToken } from "../../src/store/actions";
import axios from "axios";
import { config } from "../../config";
import WalletDetails from "../../src/containers/WalletDetails";
import { withTranslation } from "../../i18n";
import { useRouter } from "next/router";

const mapDispatchToProps = {
  setUserData,
  setToken,
};

const WalletDetail = ({ setToken, setUserData }) => {
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      console.log("handlegetuser ran");
      const token = localStorage.getItem("token");
      if (token) {
        await axios.get(config.balance, {
          headers: { "x-auth-token": token },
        });

        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        setUserData(user.data);
        sessionStorage.setItem("userData", user.data);
      }

      setToken(token);
    } catch (error) {
      // console.log("error", error);
      router.push("/");
    }
  };

  return <WalletDetails />;
};

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(WalletDetail));
