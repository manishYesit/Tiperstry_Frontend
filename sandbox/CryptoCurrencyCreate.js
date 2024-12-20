import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withTranslation } from "../../../../i18n";
import { config } from "../../../../config";
import axios from "axios";

const CryptocurrencyCreate = ({ user, i18n, t }) => {
  const classes = useStyles();
  const router = useRouter();

  const [cryptodata, setcryptodata] = useState({
    groupId: "",
    tokenName: "",
    tokenSupply: 0,
    icon: "",
  });
  const [res, setRes] = React.useState({
    msg: "",
    err: false,
    status: "",
  });
  const [img, setImg] = useState(null);
  const [base64, setBase64] = useState(null);
  const [creategroup, setcreategroup] = useState(false);
  const [createCryptocurrency, setCreateCryptocurrency] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    setGroupdata({
      ...groupdata,
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
      if (groupdata.name === "" || groupdata.name === undefined) {
        setRes({
          err: true,
          msg: "Group Name is required",
          status: "warning",
        });
        return;
      } else if (groupdata.name.split(" ").length <= 1) {
        setRes({
          err: true,
          msg: "Group Name must have atleast two words",
          status: "warning",
        });
        return;
      } else if (
        groupdata.description === "" ||
        groupdata.description === undefined
      ) {
        setRes({
          err: true,
          msg: "Group Description is required",
          status: "warning",
        });
        return;
      }

      setLoading(true);

      const formData = new FormData();
      if (img) formData.append("icon", img);
      formData.append("name", groupdata.name);
      formData.append("description", groupdata.description);

      let is_nsfw = 0;
      if (groupdata.is_nsfw == "1") is_nsfw = 1;

      formData.append("is_nsfw", is_nsfw);
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
      if (createcryptocurrencyresponse.data.status != "success") {
        setRes({
          err: true,
          msg: "This group already exists",
          status: "warning",
        });
        return;
      }

      console.log("createcrypto response", createcryptocurrencyresponse);
      setLoading(false);
      // Router.reload();
      router.push(`/group/${groupdata.name.replace(" ", "-")}`);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
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
            Create a Binance Smart Chain (BEP-20) token for a group you own. A
            10% service fee will be charged on all tips and withdrawals. By
            creating a token, you agree that it is not and will not be used as
            an equity or debt security, and that it is solely to be used for fun
            and tipping. Void where prohibited by law.
          </Typography>

          {res.err && <Alert severity={res.status}>{res.msg}</Alert>}

          <FormControl className={classes.formControl}>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Placeholder
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

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
              <b>Token Supply</b>
            </Typography>
            <Typography>
              Describe the purpose of your group to new members.
            </Typography>
            <TextField
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              rowsMax={4}
              onChange={handleChange("tokenSupply")}
              className={classes.TextField}
            />
          </div>
          {base64 && <img src={base64} className={classes.img1} />}
          <div className={classes.formgrp}>
            <Typography>
              <b>Icon</b>
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
            200 Dogecoin Cash is required to create a new token. Email
            sales@tipestry.com if you would like to use a different payment
            method{" "}
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

      <Paper style={{ padding: "20px 10px", textAlign: "center" }}>
        <div className={classes.grpbtndiv} onClick={openCreateCryptocurrency}>
          <div className={classes.grpbtn}>Create Cryptocurrency</div>
        </div>

        <Typography>Create a token for your group</Typography>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  grpbtn: {
    fontSize: 20,
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
    marginBottom: 8,
    padding: 10,
    alignItems: "center",
    border: "1px solid #0079d3",
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
}));

export default withTranslation()(CryptocurrencyCreate);
