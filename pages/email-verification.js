import React from "react";
import { useRouter, Router } from "next/router";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { config } from "../config";

import { setToken } from "../src/store/actions";

const EmailVerification = ({ }) => {
  const router = useRouter();
  const verifyToken = router.query.t;

  React.useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const token = await axios.post(config.verify, { token: verifyToken });

      if (token) {
        localStorage.setItem("token", token.headers["x-auth-token"]);

        setToken(token.headers["x-auth-token"]);

        window.location.href = "/";
      } else {
        window.location.href = "/login";
      }

      return {};
    } catch (error) {
      console.log("error", error);
      return {};
    }
  };

  return (
    <Typography variant="h4" align="center" style={{ marginTop: 100 }}>
      Loading...
    </Typography>
  );
}

export default EmailVerification;
