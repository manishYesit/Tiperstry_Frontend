import React from "react";
import axios from "axios";
import { config } from "../../../../config";
import {
  refreshPromotedPosts,
  setAllPromotedPosts,
} from "../../../store/actions";

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
import Grid from "@material-ui/core/Grid";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import Link from "next/link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DeleteForever from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { id: "index", label: "S/N", minWidth: 170 },
  { id: "topicTitle", label: "Title", minWidth: 170 },
  {
    id: "topicBody",
    label: "Body",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "promoter",
    label: "Promoter",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "topicOwner",
    label: "Topic Creator",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "active",
    label: "Active",
    minWidth: 170,
    align: "right",
    format: (value) => value.toString(2),
  },
  {
    id: "daysPurchased",
    label: "Days Purchased",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "dateApproved",
    label: "Date Approved",
    minWidth: 170,
    align: "right",
    format: (value) => new Date(value).toDateString(),
  },
  {
    id: "expiryDate",
    label: "Expiry Date",
    minWidth: 170,
    align: "right",
    format: (value) => new Date(value).toDateString(),
  },
  {
    id: "button1",
    label: "Approve",
    minWidth: 170,
    align: "right",
  },
  {
    id: "button2",
    label: "Cancel",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
});

export default function StickyHeadTable({ posts, user }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const broadcast = useSelector(({ broadcast }) => broadcast);

  const [openApprove, setOpenApprove] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [postId, setPostId] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenCancel(false);
    setOpenApprove(false);
    getAllPromotedPosts();
  };

  const getAllPromotedPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(config.allPromotedPost, {
        headers: { "x-auth-token": token },
      });
      dispatch(setAllPromotedPosts(response.data.payload));
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprovePost = async () => {
    setOpenApprove(false);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${config.approvePost}/${postId}?status=approve`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      getAllPromotedPosts();
      // dispatch(refreshPromotedPosts());
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleCancelPost = async () => {
    setOpenCancel(false);
    const token = localStorage.getItem("token");

    await axios
      .post(
        `${config.approvePost}/${postId}?status=cancel`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      )
      .then((res) => {
        // dispatch(refreshPromotedPosts());
      })
      .catch((err) => console.log(err));

    getAllPromotedPosts();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // reportedUsers(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    // reportedUsers(page);
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
              {broadcast.allPromotedPosts.length <= 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  <h2>No promoted posts found</h2>{" "}
                </div>
              ) : (
                broadcast.allPromotedPosts.map((row, index) => {
                  return row ? (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell
                        key={`${columns[0].id}${index}`}
                        align={columns[0].align}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        key={`${columns[1].id}${index}`}
                        align={columns[1].align}
                      >
                        {row.post && (
                          <Link
                            href={`/topics/${row.post._id}/${row.post.title}`}
                          >
                            {row.post.title}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell
                        key={`${columns[2].id}${index}`}
                        align={columns[2].align}
                      >
                        {row.post && <a>{row.post.message}</a>}
                      </TableCell>
                      <TableCell
                        key={`${columns[3].id}${index}`}
                        align={columns[3].align}
                      >
                        {row.promoter && (
                          <Link href={`/p/${row.promoter.username}`}>
                            <a>{row.promoter.username}</a>
                          </Link>
                        )}
                      </TableCell>
                      <TableCell
                        key={`${columns[4].id}${index}`}
                        align={columns[4].align}
                      >
                        {row.post && (
                          <Link href={`/p/${row.post.username}`}>
                            <a>{row.post.userId.username}</a>
                          </Link>
                        )}
                      </TableCell>

                      <TableCell
                        key={`${columns[5].id}${index}`}
                        align={columns[5].align}
                      >
                        {row.active.toString()}
                      </TableCell>
                      <TableCell
                        key={`${columns[6].id}${index}`}
                        align={columns[6].align}
                      >
                        {row.days}
                      </TableCell>

                      <TableCell
                        key={`${columns[7].id}${index}`}
                        align={columns[7].align}
                      >
                        {row.dateApproved != null
                          ? new Date(row.dateApproved).toDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        key={`${columns[8].id}${index}`}
                        align={columns[8].align}
                      >
                        {row.expiryDate != null
                          ? new Date(row.expiryDate).toDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell key={`${index}`} align={columns[2].align}>
                        <IconButton
                          size="large"
                          onClick={() => {
                            setPostId(row._id);
                            setOpenApprove(true);
                          }}
                        >
                          <DoneAllRoundedIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        key={`${columns[2].id}${index}22`}
                        align={columns[2].align}
                      >
                        <IconButton
                          size="large"
                          onClick={() => {
                            setPostId(row._id);
                            setOpenCancel(true);
                          }}
                        >
                          <CloseRoundedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : null;
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={broadcast.allPromotedPosts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonText="Previous page"
          nextIconButtonText="Next page"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openApprove}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to approve this promotion request ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleApprovePost} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCancel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to cancel this promotion request ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleCancelPost} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

<IconButton
  size="large"
  onClick={() => {
    setCurrentId(row._id);
    handleClickOpen();
  }}
>
  <DeleteForever />
</IconButton>;
