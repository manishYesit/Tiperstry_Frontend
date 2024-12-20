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
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import RECAPTCHA from "../../Recaptcha";
import AppCaptcha from "../../AppCaptcha";
import { withTranslation } from "../../../../i18n";

const mapStateToProps = (state) => ({
  user: state.user,
});

const ImagePost = ({ user, handleClose, i18n, t }) => {
  const classes = useStyles();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [val, setVal] = useState({
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

  const [img, setImg] = useState(null);
  const [base64, setBase64] = useState(null);
  // // console.log("chipData", chipData);

  const handleChange = (name) => (event) => {
    setVal({
      ...val,
      [name]: event.target.value,
    });
  };

  const handleRemove = () => {
    setImg(null);
    setBase64(null);
  };

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

  const handleImagePost = async () => {
    const token = await executeRecaptcha("homepage");

    // // console.log("token", token);

    if (!token) return;

    try {
      if (val.title === "") {
        setRes({
          err: true,
          msg: "Title is required",
          status: "warning",
        });
        return;
      }

      if (!img) {
        setRes({
          err: true,
          msg: "Image is required",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      const tags = chipData.flatMap((tag) => tag.label);

      const formData = new FormData();
      formData.append("img", img);
      formData.append("title", val.title);
      formData.append("message", val.details);
      formData.append("tags", JSON.stringify(tags));

      const isoriginalcontent = document.getElementById("is_oc").checked;
      formData.append("isoriginalcontent",isoriginalcontent ? isoriginalcontent : false);
      
      const headers = user.token
        ? { "x-auth-token": user.token, "Content-Type": "multipart/form-data" }
        : { "Content-Type": "multipart/form-data" };
      const upload = await axios({
        method: "post",
        headers,
        url: config.uploadImgPost,
        data: formData,
      });

      // // console.log("upload", upload);
      setLoading(false);
      // Router.reload();
      router.push(`/topics/${upload.data.data._id}/${upload.data.data.title}`);
    } catch (error) {
      setLoading(false);
      setRes({
        msg: error.response.data,
        err: true,
        status: "warning",
      });
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  const handleTextPost = async () => {
    try {
      // // console.log("text");

      if (val.title === "") {
        setRes({
          err: true,
          msg: "Title is required",
          status: "warning",
        });
        return;
      }

      setLoading(true);
      const tags = [];
      chipData.forEach((tag) => {
        tags.push(tag.label);
      });

      const isoriginalcontent = document.getElementById("is_oc").checked;

      const headers = user.token ? { "x-auth-token": user.token } : {};
      const upload = await axios.post(
        config.uploadTextPost,
        {
          title: val.title,
          message: val.details,
          isoriginalcontent: isoriginalcontent ? isoriginalcontent : false,
          tags,
        },
        { headers }
      );

      // // console.log("upload", upload);
      // setLoading(false);
      // Router.reload();

      router.push(`/topics/${upload.data.data._id}/${upload.data.data.title}`);
    } catch (error) {
      setLoading(false);
      setRes({
        msg: error.response.data,
        err: true,
        status: "warning",
      });
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  const handlePost = async () => {
    if (img) {
      handleImagePost();
    } else {
      handleTextPost();
    }
  };

  const handleChangeTag = (e) => {
    if (
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
        console.log("Adding", val.tag);
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
        {/* <Typography>
          Add a post with or without an image and earn tips from users
        </Typography> */}
        <form className={classes.root} noValidate autoComplete="off">
          {base64 && <img src={base64} className={classes.img} />}
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            onChange={getBase64}
            type="file"
          />
          <div className={classes.ButtonRoot}>
            <label htmlFor="contained-button-file">
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
          <Typography variant="caption">
            {t("Your maximum upload size is 5MB")}
          </Typography>
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
        {/* <form onSubmit={handleChangeTag} className={classes.root}> */}
        <div className={classes.tag}>{handleTagRender()}</div>

        <TextField
          required
          id="name"
          onChange={handleChange("tag")}
          onKeyUp={handleChangeTag}
          value={val.tag}
          label={t("Add Tag")}
          margin="dense"
          placeholder={t("Enter a hashtag")}
          // size="small"
          fullWidth
          variant="outlined"
        />
        {/* </form> */}
        {user.user == null ? (
          <AppCaptcha onChange={(val) => setCaptcha(val)} />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          disabled={loading || (!captcha && user.user == null)}
          onClick={handlePost}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Save Post")}
        </Button>
      </DialogActions>
    </>
  );
};

ImagePost.propTypes = {};

export default connect(mapStateToProps)(withTranslation()(ImagePost));

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
    height: 150,
    width: 150,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    maxHeight: 700,
    minWidth: 400,
  },
  tag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ButtonRoot: {
    width: 150,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 2,
  },
}));
