import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Header from "../src/components/Header";

import { config } from "../config";
import {
  setToken,
  setUserData,
} from "../src/store/actions";

const Subscription = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  let token;

  React.useEffect(() => {
    token = localStorage.getItem("token");

    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        dispatch(setUserData(user.data));
        sessionStorage.setItem("userData", JSON.stringify(user.data));
      }

      dispatch(setToken(token));
    } catch (error) {
      console.log("error", error);
    }
  };

  const selectPlan = async (plan) => {
    try {
      let body = { plan: '', price: 0 };

      if (plan == 'pro') {
        body.plan = 'Pro Plan';
        body.price = 100;
      }

      if (plan == 'basic') {
        body.plan = 'Basic Plan';
        body.price = 35;
      }

      const planData = await axios.post(config.checkout, body, {
        headers: { "x-auth-token": user.token },
      });

      localStorage.setItem("planId", body.plan);
      localStorage.setItem("txnId", planData.data.session.id);

      window.location.href = planData.data.session.url;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Header />
      <Container className={classes.root}>
        <div className="meta-price-wrap">
          <div className="meta-price-inner">
            <div className="meta-price-top">
              <h1>Choose Your Plan</h1>
              <form>
                <input id="monthlyplan" type="radio" name="plan" value="monthly" checked hidden />
                <label for="monthlyplan">Monthly</label>
                <input id="yearlyplan" type="radio" name="plan" value="yearly" hidden />
                <label for="yearlyplan">Yearly</label>
              </form>
            </div>
            <div className="meta-price-in">
              <h1>Light</h1>
              <p><b>Start After Registration</b></p>
              <h2>$0 <span>/ month</span></h2>
              <p>Cancel Anytime</p>
              <a href="#">Get Started</a>
              <ul>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
              </ul>
            </div>
            <div className="meta-price-in">
              <h1>Basic</h1>
              <p><b>Start From Today</b></p>
              <h2>$35 <span>/ month</span></h2>
              <p>Cancel Anytime</p>
              <a href="#" onClick={() => selectPlan('basic')}>Get Started</a>
              <ul>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
                <li className="fade-list">
                  <img src="/price-plan/lock.png" alt="" />Lorem ipsum dolor sit amet elit.
                </li>
              </ul>
            </div>
            <div className="meta-price-in active">
              <h1>Pro <span>Popular</span></h1>
              <p><b>Start From Today</b></p>
              <h2>$100 <span>/ month</span></h2>
              <p>Cancel Anytime</p>
              <a href="#" onClick={() => selectPlan('pro')}>Get Started</a>
              <ul>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
                <li><img src="/price-plan/check.png" alt="" />Lorem ipsum dolor sit amet elit.</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;
  return {
    root: {
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    }
  };
});

export default Subscription;