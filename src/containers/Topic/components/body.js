import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../../../../config";
import Linkify from "linkifyjs/react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "../../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { setSingleTopic } from "../../../store/actions";

const Body = ({ description, t }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);
  const token = useSelector(({ user: { token } }) => token);
  const topics = useSelector(({ topics: { singleTopic } }) => singleTopic);
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    status: "",
  });

  const handleUpdatePost = async () => {
    try {
      setLoading(true);
      const headers = token ? { "x-auth-token": token } : {};
      const trans = await axios.put(
        `${config.topics}/${topics._id}`,
        { message: value },
        { headers }
      );

      const topic = await axios.get(config.topics + "/" + topics._id);

      dispatch(setSingleTopic(topic.data));
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      console.log("error", error.response);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning",
      });
    }
  };

  const handleChange = async (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {topics.userId &&
        description === "" &&
        user &&
        user._id === topics.userId._id ? (
        <Box
          display="flex"
          flexDirection="row"
          className={classes.emptyBodyRoot}
          onClick={() => setOpen(true)}
        >
          <Typography variant="overline">Add a description </Typography>
          <Edit style={{ fontSize: 12, color: "#757575", marginLeft: 5 }} />
        </Box>
      ) : (
        <Box mt={2}>
          <h3 className={classes.value} style={{ fontWeight: "normal" }}>
            {description &&
              description.split("\n").map(function (item, key) {
                return (
                  <span key={key}>
                    <Linkify tagName="span">{item}</Linkify>
                    <br />
                  </span>
                );
              })}
          </h3>
          {topics.userId && user && user._id === topics.userId._id && (
            <Box
              display="flex"
              flexDirection="row"
              className={classes.emptyBodyRoot}
              onClick={() => setOpen(true)}
            >
              <Typography variant="overline">Edit description </Typography>
              <Edit style={{ fontSize: 12, color: "#757575", marginLeft: 5 }} />
            </Box>
          )}
        </Box>
      )}
      {open && (
        <Box mt={1}>
          {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
          <TextField
            label="Description"
            rowsMax={4}
            rows={2}
            multiline
            defaultValue={description}
            variant="outlined"
            onChange={handleChange}
            fullWidth
            value={value}
          />
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              size="small"
              style={{ color: "red", marginRight: 10 }}
            >
              {t("Cancel")}
            </Button>
            <Button
              disabled={loading}
              onClick={handleUpdatePost}
              size="small"
              color="primary"
              variant="contained"
            >
              {loading ? <CircularProgress size={25} /> : t("Send")}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default withTranslation()(Body);

const useStyles = makeStyles((theme) => ({
  emptyBodyRoot: {
    cursor: "pointer",
  },
}));
