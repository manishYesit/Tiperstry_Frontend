import React from "react";
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
import DialogTitle from "@material-ui/core/DialogTitle";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "lastLoginIp", label: "LastLoginIp", minWidth: 100 },
  {
    id: "username",
    label: "Username",
    minWidth: 170,
    align: "right",
  },
  {
    id: "rank",
    label: "Rank",
    minWidth: 170,
    align: "right",
  },
  {
    id: "button",
    label: "",
    minWidth: 170,
    align: "right",
  },
];

export default function StickyHeadTable({
  user,
  search,
  setCurrentId,
  setCurrentIp,
  currentId,
  handleBanUser,
  handleBanUserIp,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [ipOpen, setIpOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndBanUser = () => {
    setOpen(false);
    handleBanUser();
  };

  const handleCloseAndBanIp = () => {
    setIpOpen(false);
    handleBanUserIp();
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
              {search && search.length <= 0
                ? user
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user.code}
                      >
                        <TableCell
                          key={columns[0].id}
                          align={columns[0].align}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          key={columns[1].id}
                          align={columns[1].align}
                        >
                          {user.lastLoginIp}
                          {" "}
                          {user.lastLoginIp && (
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              className={classes.margin}
                              onClick={() => {
                                setCurrentId(user._id);
                                setCurrentIp(user.lastLoginIp);
                                setIpOpen(true);
                              }}
                            >
                              {user.blockedIp === false ? "Block IP" : "Allow IP"}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell
                          key={columns[2].id}
                          align={columns[2].align}
                        >
                          {user.username}
                        </TableCell>
                        <TableCell
                          key={columns[3].id}
                          align={columns[3].align}
                        >
                          {user.rank}
                        </TableCell>
                        <TableCell
                          key={columns[4].id}
                          align={columns[4].align}
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
                            {user.deactivated === false
                              ? "Ban User"
                              : "Allow User"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : search && search
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user.code}
                      >
                        <TableCell
                          key={columns[0].id}
                          align={columns[0].align}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          key={columns[1].id}
                          align={columns[1].align}
                        >
                          {user.lastLoginIp}
                          {" "}
                          {user.lastLoginIp && (
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              className={classes.margin}
                              onClick={() => {
                                setCurrentId(user._id);
                                setCurrentIp(user.lastLoginIp);
                                setIpOpen(true);
                              }}
                            >
                              {user.blockedIp === false ? "Block IP" : "Allow IP"}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell
                          key={columns[2].id}
                          align={columns[2].align}
                        >
                          {user.username}
                        </TableCell>
                        <TableCell
                          key={columns[3].id}
                          align={columns[3].align}
                        >
                          {user.rank}
                        </TableCell>
                        <TableCell
                          key={columns[4].id}
                          align={columns[4].align}
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
                            {user.deactivated === false
                              ? "Ban User"
                              : "Allow User"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={search && search.length <= 0 ? user.length : search.length}
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

      {/* Block IP Dialog */}
      <Dialog
        open={ipOpen}
        onClose={() => setIpOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to make changes to this IP"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIpOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleCloseAndBanIp} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
