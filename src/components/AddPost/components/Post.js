import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { config, maxfilesize } from "../../../../config";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import isURL from "validator/lib/isURL";
import Alert from "@material-ui/lab/Alert";
import Add from "@material-ui/icons/Add";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import AppCaptcha from "../../AppCaptcha";
import { withTranslation } from "../../../../i18n";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Body from "../../../containers/Topic/components/body";
import TagButton from "../../../components/TagButton";
import Edit from "@material-ui/icons/Edit";

import Linkify from "linkifyjs/react";
import Instagram from "../../../components/Card/components/ClassicCard/components/Instagram";
import Reddit from "../../../components/Card/components/ClassicCard/components/Reddit";
import Pinterest from "../../../components/Card/components/ClassicCard/components/Pinterest";
import Medium from "../../../components/Card/components/ClassicCard/components/Medium";
import Facebook from "../../../components/Card/components/ClassicCard/components/Facebook";
import Twitter from "../../../components/Card/components/ClassicCard/components/Twitter";
import Youtube from "../../../components/Card/components/ClassicCard/components/Youtube";
import Image from "../../../components/Card/components/ClassicCard/components/Image";
import Gif from "../../../components/Card/components/ClassicCard/components/Gif";
import Iframe from "../../EmbedSite/components/Iframe";
import LocalImage from "../../../components/Card/components/ClassicCard/components/localImage";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const mapStateToProps = (state) => ({
  user: state.user,
});

const Post = ({ user, siteUrl, disabled, handleClose, i18n, group, t }) => {
  const classes = useStyles();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [val, setVal] = useState({
    url: siteUrl ? siteUrl : "",
    title: "",
    details: "",
    tag: "",
    img: "",
  });

  const [img, setImg] = useState(null);
  const [base64, setBase64] = useState(null);
  const [captcha, setCaptcha] = useState(user.token != null);
  const [chipData, setChipData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [filesizeExceeded, setFilesizeExceeded] = useState(false);

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

  const handleChecked = (name) => (event) => {
    setVal({
      ...val,
      [name]: event.target.checked,
    });
  };

  const handlePreview = () => {
    console.log(val);
    console.log(img);
    setPreview(true);
  };
  const handlePreviewClose = () => {
    setPreview(false);
  };

  const handlePost = async () => {
    if (img) {
      handleImagePost();
    } else {
      handleTextPost();
    }
  };

  const handleTextPost = async () => {
    const token = await executeRecaptcha("homepage");
    if (!token) return;

    try {
      if (
        !isURL(val.url.trim(), {
          require_valid_protocol: true,
          protocols: ["http", "https", "ftp"],
          require_protocol: true,
        })
      ) {
        /*setRes({
          err: true,
          msg: "A Valid URL is required",
          status: "warning",
        });
        return;*/
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

      const isoriginalcontent = document.getElementById("is_oc").checked;

      let data = {
        url: val.url.trim(),
        title: val.title,
        message: val.details,
        groupId: group ? group._id : '63c45df44d4a821b05fad661',
        isoriginalcontent: isoriginalcontent ? isoriginalcontent : false,
        tags,
      };

      const upload = await axios.post(config.topics, data, {
        headers,
      });

      router.push(`/topics/${upload.data.data._id}/${upload.data.data.title}`);
    } catch (error) {
      setLoading(false);
      setRes({
        msg: error.response.data,
        err: true,
        status: "warning",
      });
    }
  };

  const handleRemove = () => {
    setImg(null);
    setBase64(null);
    setRes({
      err: false,
      msg: "",
      status: "",
    });
    setFilesizeExceeded(false);
  };

  const getBase64 = () => {
    const file = event.target.files[0];

    setRes({
      err: false,
      msg: "",
      status: "",
    });

    // check file size
    if (file && file.size > 5000000) {
      setFilesizeExceeded(true);

      setRes({
        err: true,
        msg: "Image size must be less than 5MB.",
        status: "warning",
      });
    }
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

      /*if (!img) {
        setRes({
          err: true,
          msg: "Image is required",
          status: "warning",
        });
        return;
      }*/

      setLoading(true);
      const tags = chipData.flatMap((tag) => tag.label);

      const formData = new FormData();

      formData.append("img", img);
      formData.append("title", val.title);
      formData.append("message", val.details);

      if (group) {
        formData.append("groupId", group._id);
      } else {
        formData.append("groupId", '63c45df44d4a821b05fad661');
      }

      formData.append("tags", JSON.stringify(tags));

      const isoriginalcontent = document.getElementById("is_oc").checked;
      formData.append(
        "isoriginalcontent",
        isoriginalcontent ? isoriginalcontent : false
      );

      const headers = user.token
        ? { "x-auth-token": user.token, "Content-Type": "multipart/form-data" }
        : { "Content-Type": "multipart/form-data" };
      const upload = await axios({
        method: "post",
        headers,
        url: config.uploadImgPost,
        data: formData,
      });

      setLoading(false);
      router.push(`/topics/${upload.data.data._id}/${upload.data.data.title}`);
    } catch (error) {
      setLoading(false);
      setRes({
        msg: error.response.data,
        err: true,
        status: "warning",
      });
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
      val.tag = val.tag && val.tag.replace(/[#\$%&\^\!@#$*\[\]\.\()+`~]*/g, "");
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
    setChipData(chipData.filter((chip) => chip.key !== data.key));
  };

  const handleRenderPreview = (topic) => {
    // console.log(topicdata);
    let type = "site";
    if (topic.url.includes("twitter.com")) type = "twitter";
    else if (topic.url.includes("reddit.com")) type = "reddit";
    else if (topic.url.includes("instagram.com")) type = "instagram";
    else if (topic.url.includes("medium.com")) type = "medium";
    else if (topic.url.includes("pinterest.com")) type = "pinterest";

    if (type === "gif") {
      return <Gif url={topic.url} title={topic.title} />;
    } else if (type === "image") {
      return <Image url={topic.url} title={topic.title} />;
    } else if (type === "site") {
      return <Iframe url={topic.url} />;
    } else if (type === "youtube") {
      return <Youtube videoId={topic.youtubeId} height="400px" />;
    } else if (type === "facebook") {
      return <Facebook url={topic.url} />;
    } else if (type === "twitter") {
      return <Twitter url={topic.url} />;
    } else if (type === "instagram") {
      return <Instagram url={topic.url} width={500} title={topic.title} />;
    } else if (type === "reddit") {
      return <Reddit url={topic.url} />;
    } else if (type === "pinterest") {
      return <Pinterest url={topic.url} />;
    } else if (type === "medium") {
      return <Medium url={topic.url} />;
    } else if (type === "localImage" || type === "localGif") {
      return <LocalImage url={topic.img} title={topic.title} />;
    } else {
      return <div>CANNOT RENDER</div>;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Dialog
        open={preview}
        style={{ WebkitOverflowScrolling: "touch" }}
        fullWidth={true}
        maxWidth="md"
        aira-label="DDD"
        onClose={() => handlePreviewClose(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {val.title == "" ? "Untitled" : val.title}
        </DialogTitle>
        <div>
          <Paper className={classes.header}>
            <Typography align="left" className={classes.titleLink} variant="h4">
              <Linkify tagName="span">{val.title}</Linkify>
            </Typography>
            <Typography align="left" variant="overline">
              {t("posted by")}
            </Typography>{" "}
            <Typography
              align="left"
              variant="overline"
              color="primary"
              component="a"
              className={classes.link}
            >
              @{user.user != null ? user.user.username : ""}
            </Typography>{" "}
          </Paper>
          <Container
            maxWidth="md"
            style={{ marginTop: 50, textAlign: "center" }}
          >
            {val.url == "" ? (
              <img style={{ width: "100%", height: "auto" }} src={base64} />
            ) : (
              handleRenderPreview(val)
            )}
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} sm={12} md={12} align="left">
                {val && (
                  <>
                    <Paper className={classes.paper}>
                      <Box marginTop={1}>
                        <Linkify
                          tagName="span"
                          options={{
                            format: {
                              url: function (value) {
                                return value.length > 50
                                  ? value.slice(0, 50) + "…"
                                  : value;
                              },
                            },
                          }}
                        >
                          {val.url}
                        </Linkify>
                      </Box>
                      {/* tags  */}
                      <div className={classes.tag}>{handleTagRender()}</div>
                      {/* <Typography>{val.message}</Typography> */}

                      {/* message */}
                      {/* {val.message !== "" && (
                                
                                )} */}
                      <Box mt={2}>
                        <h3
                          className={classes.value}
                          style={{ fontWeight: "normal" }}
                        >
                          {val.details.split("\n").map(function (item, key) {
                            return (
                              <span key={key}>
                                <Linkify tagName="span">{item}</Linkify>
                                <br />
                              </span>
                            );
                          })}
                        </h3>

                        <Box
                          display="flex"
                          flexDirection="row"
                          className={classes.emptyBodyRoot}
                        >
                          <Typography variant="overline">
                            Edit description{" "}
                          </Typography>
                          <Edit
                            style={{
                              fontSize: 12,
                              color: "#757575",
                              marginLeft: 5,
                            }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
          <br />
          <br />
          <Button onClick={handlePreviewClose} style={{ color: "red" }}>
            {t("Cancel")}
          </Button>
          <Button
            disabled={
              loading || (!captcha && user.user == null) || filesizeExceeded
            }
            onClick={handlePost}
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress size={25} /> : t("Save Post")}
          </Button>
        </div>
      </Dialog>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}

        {base64 && <img src={base64} className={classes.img1} />}
        {!val.url && (
          <div>
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
          </div>
        )}

        <form className={classes.root} noValidate autoComplete="off">
          {!disabled && !img && (
            <>
              <TextField
                id="outlined-basic"
                value={val.url}
                fullWidth
                disabled={disabled}
                label="URL"
                onChange={handleChange("url")}
                variant="outlined"
                margin="dense"
              />
            </>
          )}

          <TextField
            id="outlined-basic-2"
            value={val.title}
            fullWidth
            label={t("Title")}
            onChange={handleChange("title")}
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic-3"
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
            onChange={handleChange("tag")}
            onText
            onKeyUp={handleChangeTag}
            value={val.tag}
            label={t("Add Tag")}
            margin="dense"
            placeholder={t("Enter a hashtag")}
            // size="small"
            fullWidth
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

        <FormControlLabel
          control={
            <Checkbox defaultChecked={false} id="is_oc" color="primary" />
          }
          label="Original Content"
        />

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
          onClick={handlePreview}
          color="primary"
          variant="contained"
          style={{ background: "#5cbf7f", color: "white" }}
        >
          {t("Preview Post")}
        </Button>
        <Button
          disabled={
            loading || (!captcha && user.user == null) || filesizeExceeded
          }
          onClick={handlePost}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : t("Save Post")}
        </Button>
      </DialogActions>
    </div>
  );
};

Post.defaultProps = {
  siteUrl: null,
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  input: {
    display: "none",
  },
  img: {
    height: 200,
    width: "auto",
  },
  img1: {
    height: 150,
    width: 150,
    display: "block",
  },
  ButtonRoot: {
    width: 150,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 2,
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
  },
  value: {
    marginLeft: 2,
    marginTop: theme.spacing(1),
    margin: 1,
    fontSize: 14,
    color: theme.palette.grey[800],
    textAlign: "left",
  },
  link: {
    textDecoration: "none",
    fontSize: 14,
    paddingTop: theme.spacing(1),
  },
  paper: {
    boxShadow: "0px 0px 0px 0px",
    padding: theme.spacing(1),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
  },
  emptyBodyRoot: {
    cursor: "pointer",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    boxShadow: "0px 0px 0px 0px",
    padding: theme.spacing(1),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1)",
    },
  },
  titleLink: {
    color: "black",
    fontWeight: "500",
  },
}));

export default connect(mapStateToProps)(withTranslation()(Post));
