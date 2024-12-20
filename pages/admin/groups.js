import React from "react";
import Router from "next/router";
import { config } from "../../config";
import axios from "axios";

import Header from "../../src/components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { LocalSee } from "@material-ui/icons";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";

const GroupsList = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 100,
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    tablecellheader: {
      display: "flex",
    },
  }));

  const classes = useStyles();

  const [groupslist, setGroupsList] = React.useState([]);
  const [sort1, setSort1] = React.useState(0); //sort by number of members
  const [sort2, setSort2] = React.useState(0); //sort by group age
  const [sort3, setSort3] = React.useState(0); //sort by upvotes count this week

  const getStats = async (sort1, sort2, sort3) => {
    const token = localStorage.getItem("token");
    if (token) {
      const request = await axios.get(
        config.groupslist + `?sort1=${sort1}&sort2=${sort2}&sort3=${sort3}`,
        { headers: { "x-auth-token": token } }
      );
      console.log(request.data.groupslist);
      setGroupsList(request.data.groupslist);
    }
  };

  const sortRows = (sort1, sort2, sort3) => {
    console.log(`sortrows: ${sort1},${sort2},${sort3}`);
    // handle sorting on frontend
    let groupslist_sorted = groupslist;

    let sortfunc = function (a, b) {
      return a._id < b._id ? -1 : 1;
    };
    // apply manual sorting operation(s)
    if (sort1 != 0) {
      if (sort1 == 1)
        sortfunc = function (a, b) {
          return a.members.length - b.members.length;
        };
      else
        sortfunc = function (a, b) {
          return b.members.length - a.members.length;
        };
    }

    if (sort2 != 0) {
      if (sort2 == 1)
        sortfunc = function (a, b) {
          var keyA = new Date(a.createdAt),
            keyB = new Date(b.createdAt);
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        };
      else
        sortfunc = function (a, b) {
          var keyA = new Date(a.createdAt),
            keyB = new Date(b.createdAt);
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        };
    }

    if (sort3 != 0) {
      if (sort3 == 1)
        sortfunc = function (a, b) {
          return a.upvotes - b.upvotes;
        };
      else
        sortfunc = function (a, b) {
          return b.upvotes - a.upvotes;
        };
    }

    groupslist_sorted.sort(sortfunc);
    setGroupsList(groupslist_sorted);
  };

  function setSort(type, order) {
    console.log(`Changed grouplist sort type: ${type},${order}`);
    let updated_sort1 = 0;
    let updated_sort2 = 0;
    let updated_sort3 = 0;

    if (type == 1) {
      (updated_sort1 = order), (updated_sort2 = 0), (updated_sort3 = 0);
    } else if (type == 2) {
      (updated_sort1 = 0), (updated_sort2 = order), (updated_sort3 = 0);
    } else if (type == 3) {
      (updated_sort1 = 0), (updated_sort2 = 0), (updated_sort3 = order);
    }
    sortRows(updated_sort1, updated_sort2, updated_sort3);

    setSort1(updated_sort1);
    setSort2(updated_sort2);
    setSort3(updated_sort3);
    // getStats(updated_sort1, updated_sort2, updated_sort3);
  }

  function openModeratorPage(group) {
    const groupname = group.name.split(" ").join("-");
    window.location.href = "/group/" + groupname;
  }

  const banGroup = async (group, banned = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const formData = new FormData();

        formData.append("value", banned);
        formData.append("key", "banned");
        formData.append("groupId", group._id);

        const headers = {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        };
        let response = await axios({
          method: "post",
          headers,
          url: config.updategroupdata,
          data: formData,
        });

        location.reload();
      }
    } catch (error) {
      console.error("group updation error", error);
    }
  };

  React.useEffect(() => {
    handleGetUser();
    if (groupslist.length == 0) {
      getStats();
    }
  });

  const handleGetUser = async () => {
    try {
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });
        if (!user.data.isAdmin) Router.push("/");
        dispatch(setUserData(user.data));
        sessionStorage.setItem("userData", JSON.stringify(user.data));
      } else {
        Router.push("/");
      }
      dispatch(setToken(token));
    } catch (error) {
      console.log("error", error);
      Router.push("/");
    }
  };

  return (
    <>
      <Header />

      <Paper className={classes.root}>
        <h2>Groups List</h2>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="tablecellheader">SNo.</TableCell>
                <TableCell className="tablecellheader">Group Name</TableCell>
                <TableCell className="tablecellheader">
                  No. of members
                  <ArrowDownwardIcon
                    onClick={() => {
                      setSort(1, -1);
                    }}
                    style={{
                      cursor: "pointer",
                      color: sort1 == -1 ? "blue" : "black",
                    }}
                  />{" "}
                  <ArrowUpwardIcon
                    onClick={() => {
                      setSort(1, 1);
                    }}
                    style={{
                      cursor: "pointer",
                      color: sort1 == 1 ? "blue" : "black",
                    }}
                  />
                </TableCell>
                <TableCell className="tablecellheader">
                  Group age{" "}
                  <ArrowDownwardIcon
                    onClick={() => {
                      setSort(2, -1);
                    }}
                    style={{
                      cursor: "pointer",
                      color: sort2 == -1 ? "blue" : "black",
                    }}
                  />
                  <ArrowUpwardIcon
                    onClick={() => {
                      setSort(2, 1);
                    }}
                    style={{
                      cursor: "pointer",
                      color: sort2 == 1 ? "blue" : "black",
                    }}
                  />
                </TableCell>
                <TableCell>
                  No. of upvotes (this week)
                  <ArrowDownwardIcon
                    onClick={() => {
                      setSort(3, -1);
                    }}
                    style={{
                      cursor: "pointer",
                      color: sort3 == -1 ? "blue" : "black",
                    }}
                  />
                  <ArrowUpwardIcon
                    style={{
                      cursor: "pointer",
                      color: sort3 == 1 ? "blue" : "black",
                    }}
                    onClick={() => {
                      setSort(3, 1);
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupslist.map((group, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.members.length}</TableCell>
                  <TableCell>
                    {Math.abs(
                      Math.floor(
                        (Date.parse(group.createdAt) - Date.now()) / 86400000
                      )
                    )}{" "}
                    days
                  </TableCell>
                  <TableCell>{group.upvotes}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        openModeratorPage(group);
                      }}
                    >
                      View Moderator Page
                    </Button>
                    {!group.banned && (
                      <Button
                        onClick={() => {
                          banGroup(group);
                        }}
                      >
                        Ban Group
                      </Button>
                    )}
                    {group.banned && (
                      <Button
                        onClick={() => {
                          banGroup(group, 0);
                        }}
                      >
                        Un-ban Group
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
export default GroupsList;
