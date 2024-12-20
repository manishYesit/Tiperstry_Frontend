import React from "react";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      margin: theme.spacing(1),
      display: "flex",
      marginLeft: theme.spacing(2),
    },
  },
}));

const SearchUser = ({
  setSearchField,
  searchField,
  handleSearch,
  search,
  user,
  loader,
  setLoader,
}) => {
  const classes = useStyles();

  return (
    <div textAlign="right" style={{ display: "flex" }}>
      <Input
        type="search"
        autoComplete
        autoFocus
        color="secondary"
        textAlign="right"
        placeholder="Search by username."
        style={{ height: "36px" }}
        onChange={(e) => setSearchField(e.target.value.trim())}
        required={true}
      />
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={searchField === "" ? null : handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchUser;
