import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { config } from "../../../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { connect, useSelector } from "react-redux";
import Router from "next/router";
import { setUserData } from "../../../store/actions";
import { withTranslation } from "../../../../i18n";
import Store from "../../../store/store";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserData,
};

const ChangeProfile = ({ user, setUserData, t }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState({
    name: "",
    bio: "",
  });

  Store.subscribe(() => {
    const user2 = Store.getState();

    if (user2.user.user !== null) {
      setValue({ name: user2.user.user.name, bio: user2.user.user.bio });
    }
  });

  React.useEffect(function effectFunction() {
    const user2 = Store.getState();

    if (user2.user.user !== null) {
      setValue({ name: user2.user.user.name, bio: user2.user.user.bio });
    }
  }, []);

  const [res, setRes] = React.useState({
    err: false,
    msg: "",
    severity: "",
  });

  const handleValue = (name) => (event) => {
    setValue({
      ...value,
      [name]: event.target.value,
    });
  };

  const handleChangeInfo = async (event) => {
    event.preventDefault();

    setLoading(true);
    setRes({
      err: false,
      msg: "",
      severity: "",
    });
    try {
      const valid = await axios.post(config.changeInfo, value, {
        headers: { "x-auth-token": user.token },
      });

      setRes({
        msg: valid.data,
        severity: "success",
        err: true,
      });
      setLoading(false);

      Router.push("/p/" + user.user.username);
    } catch (error) {
      setLoading(false);

      setRes({
        msg: error.response.data,
        err: true,
        severity: "warning",
      });
    }
  };

  const editorTool = (data) => {
    var inputElement = document.getElementById('user_bio');

    if (inputElement) {
      var selectedText = inputElement.innerHTML.slice(inputElement.selectionStart, inputElement.selectionEnd);

      if (selectedText.length) {
        if (data == '```') {
          selectedText = '<>' + selectedText + '</>';
        } else {
          selectedText = data + selectedText + data;
        }

        var bio = (inputElement.innerHTML.substring(0, inputElement.selectionStart) + selectedText + inputElement.innerHTML.substring(inputElement.selectionEnd));
        setValue({ ...value, bio: bio });
      }
    }
  }

  return (
    <form
      className={classes.root}
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleChangeInfo}
      noValidate
      autoComplete="off"
    >
      <Box mt={0.5} mb={3}>
        <Typography align="center" color="primary" variant="overline">
          {t("Change Personal Information")}
        </Typography>
      </Box>

      {res.err && <Alert severity={res.severity}>{res.msg}</Alert>}
      <TextField
        id="user_name"
        label={t("Name")}
        value={value.name}
        fullWidth
        onChange={handleValue("name")}
        variant="outlined"
      />

      <br />

      <TextField
        id="user_bio"
        label={t("Bio")}
        multiline
        rows={3}
        rowsMax={4}
        value={value.bio}
        fullWidth
        onChange={handleValue("bio")}
        variant="outlined"
      />
      <Box className={classes.editor}>
        <Typography onClick={() => editorTool('**')} title={'Bold'} variant="h6" className={classes.editorTool} style={{ fontWeight: 600 }}>B</Typography>
        <Typography onClick={() => editorTool('__')} title={'Italic'} variant="h6" className={classes.editorTool} style={{ fontStyle: 'italic' }}>I</Typography>
        <Typography onClick={() => editorTool('~~')} title={'Strike'} variant="h6" className={classes.editorTool} style={{ textDecoration: "line-through" }}>S</Typography>
        <Typography onClick={() => editorTool('```')} title={'Code'} variant="h6" style={{ cursor: 'pointer' }}>{'</>'}</Typography>
      </Box>
      <br />

      <Button variant="outlined" color="primary" onClick={handleChangeInfo}>
        {loading ? <CircularProgress size={25} /> : t("Change Info")}
      </Button>
    </form>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ChangeProfile));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // "& .MuiTextField-root": {
    //   margin: theme.spacing(1),
    //   width: 200
    // }
  },
  editor: {
    display: "flex",
    padding: "5px 15px",
    background: "#ececec",
    gap: "20px",
  },
  editorTool: {
    cursor: 'pointer',
    fontFamily: "'Courier New', Courier, monospace",
  }
}));
