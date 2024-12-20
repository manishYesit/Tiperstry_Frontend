import React from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { config } from "../../../../config";

const columns = [
  {
    id: "username",
    label: "Username",
    minWidth: 100,
    align: "left",
  },
  { id: "lastLoginIp", label: "LastLoginIp", minWidth: 100 },
  {
    id: "created_at",
    label: "Created At",
    minWidth: 100,
    align: "right",
  },
  {
    id: "button",
    label: "",
    minWidth: 170,
    align: "right",
  },
];

export default function TempUser() {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    let token = window.localStorage.getItem('token');
    if (token) {
      loadData(token);
    }
  }, []);

  const loadData = async (token) => {
    try {
      const extraParam = { headers: { "x-auth-token": token } };
      const result = await axios.get(config.allTemp, extraParam);

      if (result.data.status) {
        setData(result.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndBanUser = () => {
    setOpen(false);
    // handleBanUser();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
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
  }));

  const classes = useStyles();

  return (
    <>
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
              {data.length ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={user._id}
                  >
                    <TableCell
                      key={columns[0].id}
                      align={columns[0].align}
                    >
                      {user.username}
                    </TableCell>
                    <TableCell
                      key={columns[1].id}
                      align={columns[1].align}
                    >
                      {user.ipAddress}
                    </TableCell>
                    <TableCell
                      key={columns[2].id}
                      align={columns[2].align}
                    >
                      {moment(user.createdAt)
                        .locale("en")
                        .format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell
                      key={columns[3].id}
                      align={columns[3].align}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.margin}
                        onClick={() => {
                          setCurrentId(user._id);
                          handleClickOpen();
                        }}
                      >
                        {user.isBanned === false
                          ? "Ban User"
                          : "Allow User"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }) : <></>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data && data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to make this changes"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleCloseAndBanUser} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
