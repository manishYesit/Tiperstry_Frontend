import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import { withTranslation } from "../../../../i18n";
import { config } from "../../../../config";
import axios from "axios";

const CryptocurrencyCreate = ({ user, i18n, t }) => {
  const classes = useStyles();
  const router = useRouter();

  const [cryptodata, setcryptodata] = useState({
    groupId: "",
    tokenName: "",
    ticker: "",
    tokenSupply: 0,
    minWithdrawalAmount: 0,
    icon: "",
    groups: [],
    networkId: "",
  });
  const [res, setRes] = React.useState({
    msg: "",
    err: false,
    status: "",
  });
  const [img, setImg] = useState(null);
  const [base64, setBase64] = useState(null);
  const [createCryptocurrency, setCreateCryptocurrency] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    getGroupForOwner();
  }, []);

  const getGroupForOwner = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "x-auth-token": token,
      "Content-Type": "application/json",
    };

    await axios({
      method: "get",
      headers,
      url: config.groupbyowner,
    })
      .then((res) => {
        setcryptodata({ ...cryptodata, groups: res.data.groups });
      })
      .catch((err) => {
        console.log(err);
        setRes({
          err: true,
          msg: "something happened while getting groups please refresh",
          status: "warning",
        });
      });
  };

  const handleChange = (name) => (event) => {
    setcryptodata({
      ...cryptodata,
      [name]: event.target.value,
    });
  };

  function openCreateCryptocurrency() {
    if (!user) {
      // not logged in
      location.href = "/login";
      return;
    }
    setCreateCryptocurrency(true);
  }

  function closeCreateCryptocurrency() {
    setCreateCryptocurrency(false);
  }

  const getBase64 = () => {
    const file = event.target.files[0];

    if (typeof file === "undefined") return;

    setImg(event.target.files[0]);

    let self = this;

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      // // console.log(reader.result);
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      // // console.log("Error: ", error);
    };
  };

  function handleRemove() {
    setImg(null);
    setBase64(null);
  }

  const handleCreateCryptocurrency = async () => {
    try {
      // validations
      if (cryptodata.groupId === "" || cryptodata.groupId === undefined) {
        setRes({
          err: true,
          msg: "You must select a group",
          status: "warning",
        });
        return;
      }

      if (cryptodata.networkId === "" || cryptodata.networkId === undefined) {
        setRes({
          err: true,
          msg: "You must select a network",
          status: "warning",
        });
        return;
      }

      if (cryptodata.tokenName === "" || cryptodata.tokenName === undefined) {
        setRes({
          err: true,
          msg: "Token Name is required",
          status: "warning",
        });
        return;
      }

      if (cryptodata.ticker === "" || cryptodata.ticker === undefined) {
        setRes({
          err: true,
          msg: "Ticker is required",
          status: "warning",
        });
        return;
      }

      if (cryptodata.tokenSupply <= 0) {
        setRes({
          err: true,
          msg: "Token Supply cannot be less than or equal to zero",
          status: "warning",
        });
        return;
      }
      if (cryptodata.minWithdrawalAmount <= 0) {
        setRes({
          err: true,
          msg: "Min. Withdrawal Amount cannot be less than or equal to zero",
          status: "warning",
        });
        return;
      }

      setLoading(true);

      const formData = new FormData();
      if (img) formData.append("icon", img);
      formData.append("tokenName", cryptodata.tokenName);
      formData.append("ticker", cryptodata.ticker);
      formData.append("tokenSupply", cryptodata.tokenSupply);
      formData.append("minWithdrawalAmount", cryptodata.minWithdrawalAmount);
      formData.append("groupId", cryptodata.groupId);
      formData.append("networkId", cryptodata.networkId);

      setLoading(false);

      const token = localStorage.getItem("token");

      const headers = {
        "x-auth-token": token,
        "Content-Type": "multipart/form-data",
      };

      const createcryptocurrencyresponse = await axios({
        method: "post",
        headers,
        url: config.crypto,
        data: formData,
      });

      if (createcryptocurrencyresponse.data.success == false) {
        setRes({
          err: true,
          msg: createcryptocurrencyresponse.data.message,
          status: "warning",
        });
        return;
      }

      setRes({
        err: false,
        msg: createcryptocurrencyresponse.data.message,
        status: "success",
      });

      console.log("createcrypto response", createcryptocurrencyresponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response ? error.response.data.message : "unexpected error",
        status: "warning",
      });
      return;
      // // console.log("error", error.response);
    }
  };

  return (
    <div>
      <Dialog
        open={createCryptocurrency}
        style={{ WebkitOverflowScrolling: "touch" }}
        fullWidth={true}
        maxWidth="sm"
        aira-label="Create Group Window"
        onClose={closeCreateCryptocurrency}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          id="alert-dialog-slide-title"
          style={{
            borderBottom: "1px solid #f3f5f6",
            padding: "20px 20px",
            margin: 0,
            fontSize: "26px",
          }}
        >
          Create a Group Token
        </div>

        <DialogContent className={classes.crgrpdialog}>
          <Typography>
            Create a token for your group. A 5% service fee will be charged on all tips and withdrawals. By creating a token, you agree that it is not and will not be used as an equity or debt security, and that it is solely to be used for fun and tipping. Void where prohibited by law.
          </Typography>

          {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
          {res.status == "success" && (
            <Alert severity={res.status}>{res.msg}</Alert>
          )}
          <div className={classes.selectBox}>
            <Typography className={classes.selectInput}>
              <b> Select Group</b>
            </Typography>
            <FormControl className={classes.formControl}>
              <Select onChange={handleChange("groupId")}>
                <MenuItem value="" disabled>
                  Select Group
                </MenuItem>
                {cryptodata.groups.map((group) => {
                  return <MenuItem value={group._id}>{group.name}</MenuItem>;
                })}
                {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          
          <div className={classes.selectBox}>
            <Typography className={classes.selectInput}>
              <b> Select Network</b>
            </Typography>
            <FormControl className={classes.formControl}>
              <Select onChange={handleChange("networkId")}>
                <MenuItem value="" disabled>
                  Select Network
                </MenuItem>
                <MenuItem value="Polygon (ERC-20)">Polygon (ERC-20)</MenuItem>
                <MenuItem value="BNB Smart Chain (BEP-20)">BNB Smart Chain (BEP-20)</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          <div className={classes.formgrp}>
            <Typography>
              <b>Token Name</b>
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange("tokenName")}
              className={classes.TextField}
            />
          </div>
          <div className={classes.formgrp}>
            <Typography>
              <b>Token Ticker (e.g. btc)</b>
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange("ticker")}
              className={classes.TextField}
            />
          </div>

          <div className={classes.formgrp}>
            <Typography>
              <b>Token Supply</b>
            </Typography>
            <TextField
              variant="outlined"
              type="number"
              fullWidth
              onChange={handleChange("tokenSupply")}
              className={classes.TextField}
            />
          </div>
          <div className={classes.formgrp}>
            <Typography>
              <b>Minimum Withdrawal Amount</b>
            </Typography>
            <TextField
              variant="outlined"
              type="number"
              fullWidth
              onChange={handleChange("minWithdrawalAmount")}
              className={classes.TextField}
            />
          </div>
          {base64 && <img src={base64} className={classes.img1} />}
          <div className={classes.formgrp}>
            <Typography>
              <b>Token Icon</b>
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file2"
              onChange={getBase64}
              type="file"
            />
            <div className={classes.ButtonRoot}>
              <label htmlFor="contained-button-file2">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  component="span"
                >
                  {t("Upload")}
                </Button>
              </label>
              <Button
                variant="outlined"
                disabled={!img}
                onClick={handleRemove}
                style={{ color: "red" }}
                size="small"
                component="span"
              >
                {t("remove")}
              </Button>
            </div>
          </div>
          <Typography>
            200 Dogecoin Cash is required to create a token.
          </Typography>
        </DialogContent>

        <DialogActions
          style={{ backgroundColor: "#edeff1", padding: "10px 10px" }}
        >
          <Button
            className={classes.grpbtn2}
            onClick={closeCreateCryptocurrency}
            color="default"
            variant="outlined"
          >
            {t("Cancel")}
          </Button>
          <Button
            className={classes.grpbtn3}
            onClick={handleCreateCryptocurrency}
            color="primary"
            variant="contained"
          >
            {loading ? (
              <CircularProgress
                style={{ color: "white" }}
                size={25}
                // style={{ backgroundColor: "#edeff1", padding: "10px 10px" }}
              />
            ) : (
              t("Request Token")
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Paper className={classes.root}>
        <div className={classes.grpbtndiv} onClick={openCreateCryptocurrency}>
          <div className={classes.grpbtn}>Create Cryptocurrency</div>
        </div>

        {/* <Typography>Create a token for your group</Typography> */}
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center", 
		backgroundImage: "url('/static/arrow.png')", 
		borderRadius: "unset",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		height: 41,
		marginBottom: 15,
		boxShadow: "none",
	},
  formControl: {
    minWidth: 120,
  },
  grpbtn: {
    fontSize: 16,
    color: "#3f48cc",
  },
  nsfw: {
    backgroundColor: "#ff585b",
    color: "white",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  grpbtn2: {
    borderRadius: "50px",
    borderColor: "#58a5de",
    color: "#0079d3",
  },
  grpbtn3: {
    borderRadius: "50px",
    backgroundColor: "#0079d3",
    color: "white",
  },
  formgrp: {
    padding: "20px 0",
    margin: "auto",
  },
  grpbtndiv: {
    cursor: "pointer",
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
    // border: "1px solid #0079d3",
    borderRadius: "50px",
  },
  ButtonRoot: {
    width: 150,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 2,
  },
  img1: {
    height: 150,
    width: 150,
    display: "block",
  },
  selectInput: {
    display: "inline",
    marginRight: "2rem",
  },
  selectBox: {
    padding: "20px 0",
    margin: "auto",
  },
}));

export default withTranslation()(CryptocurrencyCreate);
