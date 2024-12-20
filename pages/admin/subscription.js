import React from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import { setToken, setUserData } from "../../src/store/actions";
import { config } from "../../config";
import Header from "../../src/components/Header";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForever from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

const columns = [
  {
    id: "username",
    label: "User Name",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "plan",
    label: "Plan Name",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "token",
    label: "Used Token",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "startdate",
    label: "Start Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "expiredate",
    label: "Expire Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "button",
    minWidth: 170,
    align: "right",
  },
];

const Subscription = () => {
  let token;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    token = localStorage.getItem("token");
    handleGetUser();

    loadData();
  }, []);

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

  const loadData = async () => {
    try {
      if (token) {
        const plan = await axios.get(config.getAllPlan, {
          headers: { "x-auth-token": token },
        });

        setData(plan.data.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        style={{
          marginTop: 100,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <h2>Subscription List</h2>
        <div style={{ width: "100%" }}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data ? (
                    data.map((row) => {
                      return (row ?
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          <TableCell key={columns[0].id} align={columns[0].align}>
                            <Link href={`/p/${row.userId.username}`}>
                              <a>{row.userId.username}</a>
                            </Link>
                          </TableCell>
                          <TableCell key={columns[1].id} align={columns[1].align}>
                            {row.planId}
                          </TableCell>
                          <TableCell key={columns[2].id} align={columns[2].align}>
                            {row.usedToken}
                          </TableCell>
                          <TableCell key={columns[3].id} align={columns[3].align}>
                            {moment(row.createdAt).format("MMM-DD-YYYY hh:mm A")}
                          </TableCell>
                          <TableCell key={columns[4].id} align={columns[4].align}>
                            {moment(row.expiredDate).format("MMM-DD-YYYY hh:mm A")}
                          </TableCell>
                          <TableCell key={columns[5].id} align={columns[5].align}>
                            <IconButton size="large">
                              <DeleteForever />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        : <></>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "12px",
                      }}
                    >
                      <h2>No data found</h2>{" "}
                    </div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
});

export default Subscription;
