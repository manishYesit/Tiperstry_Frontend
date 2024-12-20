import React, { Component, useState, useEffect, useRef } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

import { config, api } from "../../../config";
import { withTranslation } from "../../../i18n";
import { CircularProgress } from "@material-ui/core";
import { Check, Close, Refresh } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";

const AppCaptcha = (props) => {
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const [captcha, setCaptcha] = useState({
    image: "",
    isValid: false,
    validateUrl: "",
    reload: false,
  });
  const [loading, setLoading] = useState("");

  useEffect(() => {
    axios.get(config.captcha, { responseType: "blob" }).then((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(res.data);
      reader.onloadend = () => {
        setCaptcha({
          image: reader.result,
          validateUrl: api + res.headers["x-validate-url"],
        });
      };
    });
  }, [captcha.reload]);

  const handleAnswer = (ans) => {
    if (ans.length == 6) {
      validateCaptcha(ans);
    }
  };

  const validateCaptcha = (answer) => {
    console.log(answer);
    if (answer.length == 6) {
      setLoading(true);
      axios
        .post(captcha.validateUrl, { answer })
        .then((res) => {
          if (res.data === true) {
            setCaptcha({ isValid: true });
            props.onChange(true);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          props.onChange(captcha.isValid);
        });
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <img ref={imgRef} src={captcha.image} width="250" />
        <span
          style={{ width: 20, height: 20, margin: 20, display: "inline-block" }}
        >
          {loading ? (
            <CircularProgress style={{ width: 20, height: 20 }} />
          ) : null}
          {captcha.isValid ? (
            <p
              style={{
                display: "flex",
                minWidth: "12em",
                alignItems: "center",
              }}
            >
              {" "}
              <Check style={{ color: green[500] }} />{" "}
              <span> captcha validated </span>
            </p>
          ) : (
            <Close style={{ color: red[500] }} />
          )}
          {!captcha.isValid ? (
            <div>
              <Refresh
                style={{ cursor: "pointer" }}
                onClick={() => setCaptcha({ reload: !captcha.reload })}
              />{" "}
            </div>
          ) : null}
        </span>

        {!captcha.isValid ? (
          <input
            id="outlined-basic"
            placeholder="Your answer"
            variant="outlined"
            margin="dense"
            autoCapitalize="none"
            onChange={(evt) => handleAnswer(evt.target.value.trim())}
            onBlur={(evt) => validateCaptcha(evt)}
            ref={inputRef}
            style={{ textTransform: "lowercase" }}
          />
        ) : null}
      </div>
    </>
  );
};

export default withTranslation()(AppCaptcha);
