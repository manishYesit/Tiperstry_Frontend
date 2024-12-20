import React, { useEffect } from "react";
import axios from "axios";
import { config } from "../../../../config";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DeleteForever from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

const columns = [
  {
    id: "reportedUsername",
    label: "Reported User",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ip",
    label: "IP Address",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "username",
    label: "Username",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "message",
    label: "Message",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "messageContent",
    label: "Reported Content",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "createdAt",
    label: "Created At",
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    loadData(token);
  }, [page]);

  const loadData = async (token) => {
    try {
      const result = await axios.get(config.metaReports + '?page=' + page, {
        headers: { "x-auth-token": token },
      });

      setData(result.data.result);
      setTotal(result.data.total);
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
              {data.length <= 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  <h2>No report found</h2>{" "}
                </div>
              ) : (
                data.map((row, index) => {
                  return (row ?
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell key={columns[0].id} align={columns[0].align}>
                        <Link href={`/p/${row.reportedUsername}`}>
                          <a>{row.reportedUsername}</a>
                        </Link>
                      </TableCell>
                      <TableCell key={columns[1].id} align={columns[1].align}>
                        {row.chatId.ip ? row.chatId.ip : 'NA'}
                      </TableCell>
                      <TableCell key={columns[2].id} align={columns[2].align}>
                        <Link href={`/p/${row.username}`}>
                          <a>{row.username}</a>
                        </Link>
                      </TableCell>
                      <TableCell key={columns[3].id} align={columns[3].align}>
                        {row.reason}
                      </TableCell>
                      <TableCell key={columns[4].id} align={columns[4].align}>
                        {row.message}
                      </TableCell>
                      <TableCell key={columns[5].id} align={columns[5].align}>
                        {row.chatId.message ? row.chatId.message : (
                          <Link href={row.chatId.media.data}>
                            <a>Media File</a>
                          </Link>
                        )}
                      </TableCell>
                      <TableCell key={columns[6].id} align={columns[6].align}>
                        {row.createdAt}
                      </TableCell>
                      <TableCell key={columns[7].id} align={columns[7].align}>
                        <IconButton size="large" onClick={() =>
                          handleClickOpen()
                        }>
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    : null
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonText="Previous page"
          nextIconButtonText="Next page"
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
            {"Are you sure you want to delete the message assoicated with this report?"}
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

<IconButton size="large" onClick={() => {
  handleClickOpen()
}}>
  <DeleteForever />
</IconButton>