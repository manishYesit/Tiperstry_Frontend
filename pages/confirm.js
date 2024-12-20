import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { config } from "../config";

const Confirm = () => {
  const router = useRouter();
  const classes = useStyles();

  const paymentStatus = router.query.status;

  React.useEffect(() => {
    createPlan();
  }, []);

  const createPlan = async () => {
    try {
      const token = localStorage.getItem("token");
      const txnId = localStorage.getItem("txnId");
      const planId = localStorage.getItem("planId");

      if (txnId) {
        let body = {
          plan: planId,
          txnId: txnId,
          status: (paymentStatus == 'success') ? 1 : 0,
        };

        const planData = await axios.post(config.createPlan, body, {
          headers: { "x-auth-token": token },
        });

        localStorage.removeItem("txnId");
        localStorage.removeItem("planId");

        setTimeout(() => {
          window.location.href = '/';
        }, 2000)
      } else {
        window.location.href = '/subscription';
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h4" align="center">
          Your Payment was {paymentStatus == 'success' ? 'successful' : 'failed'}.
        </Typography>
        <p>Redirecting....</p>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;
  return {
    root: {
      marginTop: 80,
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      textAlign: 'center',
    },
  };
});

export default Confirm;