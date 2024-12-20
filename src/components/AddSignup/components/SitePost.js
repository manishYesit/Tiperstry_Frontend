import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { config } from "../../../../config";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import isURL from "validator/lib/isURL";
import Alert from "@material-ui/lab/Alert";
import Add from "@material-ui/icons/Add";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import RECAPTCHA from "../../Recaptcha";
import AppCaptcha from "../../AppCaptcha";
import { withTranslation } from "../../../../i18n";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const mapStateToProps = (state) => ({
  user: state.user,
});

const SitePost = ({ user, handleClose, siteUrl, disabled, i18n, t }) => {
  const classes = useStyles();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [val, setVal] = useState({
    url: siteUrl ? siteUrl : "",
    title: "",
    details: "",
    tag: "",
  });

  const [captcha, setCaptcha] = useState(false || user.token != null);
  const [chipData, setChipData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = React.useState({
    msg: "",
    err: false,
    status: "",
  });

  React.useEffect(() => {
    const country = localStorage.getItem("country");
    if (country) {
      chipData.push({
        key: country.toLocaleLowerCase() + Math.floor(Math.random() * 10 + 1),
        label: country.toLocaleLowerCase(),
      });
      setChipData(chipData);
    }
  }, []);

  const handleChange = (name) => (event) => {
    setVal({
      ...val,
      [name]: event.target.value,
    });
  };

  //   const handleChange = (event) => {
  //     setVal({
  //       ...val,
  //       [event.target.name]: event.target.value.trim(),
  //     });
  //   };

  const handlePost = async () => {
    const token = await executeRecaptcha("homepage");

    console.log("token", token);

    if (!token) return;

    try {
      if (
        !isURL(val.url.trim(), {
          require_valid_protocol: true,
          protocols: ["http", "https", "ftp"],
          require_protocol: true,
        })
      ) {
        // val.url = "https://" + val.url;
        setRes({
          err: true,
          msg: "A Valid URL is required",
          status: "warning",
        });
        return;
      }

      if (!captcha && user.user == null) {
        setRes({
          err: true,
          msg: t("Invalid Captcha"),
          status: "warning",
        });
        return;
      }

      if (val.title === "") {
        setRes({
          err: true,
          msg: "Title is required",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      const tags = chipData.flatMap((tag) => tag.label);
      const headers = user.token ? { "x-auth-token": user.token } : {};

      const isoriginalcontent = document.getElementById("is_oc2").checked;

      const upload = await axios.post(
        config.topics,
        {
          url: val.url.trim(),
          title: val.title.trim(),
          message: val.details.trim(),
          isoriginalcontent: isoriginalcontent ? isoriginalcontent : false,
          tags,
        },
        {
          headers,
        }
      );

      console.log("upload", upload);
      // setLoading(false);
      router.push(`/topics/${upload.data.data._id}/${upload.data.data.title}`);
      // Router.push("/recent");
    } catch (error) {
      setLoading(false);
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  const addTag = () => {
    handleChangeTag(undefined, true);
  };

  const handleChangeTag = (e, ignoreEvent) => {
    if (
      ignoreEvent ||
      e.keyCode === 32 ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.key === "Enter"
    ) {
      let data = chipData.flatMap((chip) => chip.label);
      val.tag =
        val.tag && val.tag.replace(/[#\$%\^\!@#$*\[\]\.\(\)-=+`~]*/g, "");
      if (
        val.tag &&
        !data.includes(val.tag) &&
        chipData.length <= 4 &&
        !val.tag.match(/^\s+$/)
      ) {
        chipData.push({
          key: val.tag + Math.floor(Math.random() * 10 + 1),
          label: val.tag
            .substring(0, 20)
            .toLocaleLowerCase()
            .replace(/ /gi, ""),
        });

        setChipData(chipData);
        setVal({
          ...val,
          tag: "",
        });
      }
    }
  };

  const handleTagRender = () => {
    return chipData.map((tag) => (
      <Chip
        key={tag.key}
        variant="outlined"
        size="small"
        avatar={<Avatar>#</Avatar>}
        label={tag.label}
        onDelete={() => handleDelete(tag)}
        color="primary"
      />
    ));
  };

  const handleDelete = (data) => {
    // const { chipData } = this.state;
    // // console.log(chipData.filter(chip => chip.key !== data.key));

    setChipData(chipData.filter((chip) => chip.key !== data.key));
  };

  return (
    <>
      <DialogContent className={classes.content}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <form className={classes.root} noValidate autoComplete="off">
          {!disabled && (
            <>
              {/* <Typography variant="h6">
                Add a post with or without an image and earn tips from users
              </Typography> */}
              <TextField
                id="outlined-basic"
                value={val.url}
                // defaultValue={siteUrl}
                fullWidth
                disabled={disabled}
                label="URL"
                onChange={handleChange("url")}
                variant="outlined"
                margin="dense"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">

                //     </InputAdornment>
                //   )
                // }}
              />
            </>
          )}

          <TextField
            id="outlined-basic"
            value={val.title}
            fullWidth
            label={t("Title")}
            onChange={handleChange("title")}
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            value={val.details}
            label={t("Details")}
            onChange={handleChange("details")}
            multiline
            rows={3}
            rowsMax={5}
            variant="outlined"
            margin="dense"
          />
        </form>
        <div className={classes.tag}>{handleTagRender()}</div>
        <div className={classes.relative}>
          <TextField
            required
            id="name"
            fullWidth
            onChange={handleChange("tag")}
            onKeyUp={handleChangeTag}
            value={val.tag}
            label={t("Add Tag")}
            margin="dense"
            placeholder={t("Enter a hashtag")}
            // size="small"
            variant="outlined"
          />
          <Button
            disabled={val.tag == ""}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClickCapture={addTag}
          >
            {" "}
            <Add />
          </Button>
        </div>
        <div className={classes.relative}>
          <FormControlLabel
            control={
              <Checkbox defaultChecked={false} id="is_oc2" color="primary" />
            }
            label="Original Content"
          />
        </div>
        {user.user == null && (
          <AppCaptcha onChange={(val) => setCaptcha(val)} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          {t("Cancel")}
        </Button>

        <Button
          disabled={loading || (!captcha && user.user == null)}
          onClick={() => handlePost()}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Save Post")}
        </Button>
      </DialogActions>
    </>
  );
};

SitePost.defaultProps = {
  siteUrl: null,
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    // "& > *": {
    //   margin: theme.spacing(1)
    // }
  },
  input: {
    display: "none",
  },
  img: {
    height: 200,
    width: "auto",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    minWidth: 400,
  },
  tag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    position: "absolute",
    top: 10.3,
    right: 3,
  },
  relative: {
    position: "relative",
    minWidth: 400,
  },
}));

export default connect(mapStateToProps)(withTranslation()(SitePost));
