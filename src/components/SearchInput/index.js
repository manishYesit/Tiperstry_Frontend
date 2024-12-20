import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import isURL from "validator/lib/isURL";
import FormHelperText from "@material-ui/core/FormHelperText";
import { removeProtocols } from "../../utils";
import { withTranslation } from "../../../i18n";
import Tooltip from "@material-ui/core/Tooltip";

const SearchInput = ({ t }) => {
  const classes = useStyles();
  const [query, setQuery] = React.useState("");
  const [res, setRes] = React.useState({
    err: false,
    msg: "",
  });

  const handleLoadUrl = async (event) => {
    event.preventDefault();

    if (query === "") {
      setRes({ msg: "URL or search query is required", err: true });
      return;
    }

    if (
      isURL(query.trim(), {
        require_valid_protocol: true,
        protocols: ["http", "https", "ftp"],
        require_protocol: true,
      })
      ||
      (
        query.trim().split(".").length > 1
      )
    ) {
      setRes({ msg: "", err: false });
      Router.push("/sites?s=" + query.trim());
    } else {
      Router.push("/search?q=" + query.trim());
    }
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  localStorage.setItem("searchQuery", query);
  return (
    <form onSubmit={handleLoadUrl}>
      <Paper className={classes.root} style={{ borderRadius: "unset" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="row"
          width="100%"
        >
          {/* <Tooltip title="Comment on any web page by entering the address here">
            <SearchIcon className={classes.icon} />
          </Tooltip> */}
          <Input
            className={classes.input}
            // error={res.err}
            placeholder={t("Enter a URL or Search")}
            // helperText={res.err && res.msg}
            onChange={handleQuery}
          />
          <SearchIcon className={classes.icon} onClick={handleLoadUrl} />
          {/* <Button onClick={handleLoadUrl}>{t("Load")}</Button> */}
        </Box>

        {res.err && (
          <FormHelperText
            variant="outlined"
            error={true}
            filled={true}
            margin="dense"
          >
            {res.msg}
          </FormHelperText>
        )}
      </Paper>
    </form>
  );
};

export default withTranslation()(SearchInput);

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
  root: {
    flexDirection: "column",
    alignItems: "center",
    padding: spacing(1),
    margin: spacing(2, 0),
    display: "flex",
    border: "1px solid #b09f9f",
    boxShadow: "none",
  },
  icon: {
    marginRight: spacing(1),
    color: palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
}));
