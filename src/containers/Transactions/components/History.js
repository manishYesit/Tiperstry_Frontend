import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { config } from "../../../../config";
import moment from "moment";
import { withTranslation } from "../../../../i18n"

const History = ({ t, i18n ,username}) => {
  const classes = useStyles();
  const [history, setHistory] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    handleGetHistory();
  }, []);


  const updateHistory =  async (page, limit) => {
    const token = localStorage.getItem("token");
      const response = await axios.get(`${config.transactionHistory}?username=${username}&page=${page + 1}&size=${limit}`, {
        headers: { "x-auth-token": token },
      });
      setHistory(response.data.trans);
      setCount(response.data.count)
  }

  const handleGetHistory = async () => {
    try {
      await updateHistory(page, rowsPerPage);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangePage = async (event,page) => {
    try {
      setPage(page)
      await updateHistory(page, rowsPerPage);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const handleChangeRowsPerPage = async (event) => {
    try {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      await updateHistory(page,event.target.value);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{t("Description")}</TableCell>
            <TableCell align="right">{t("Activity")}</TableCell>
            <TableCell align="right">{t("Token")}</TableCell>
            {}
            <TableCell align="right">{t("Receiver")}</TableCell>
            <TableCell align="right">{t("Sender")}</TableCell>
            <TableCell align="right">{t("Date")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.amount}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.walletType}</TableCell>
              <TableCell align="right">
                {row.receivedUserId ? (
                  <Typography
                  variant="overline"
                  component="a"
                  href={"/p/" + row.receivedUserId && row.receivedUserId.username}>
                    @{row.receivedUserId ? row.receivedUserId.username : 'Hidden'}
                  </Typography>
                ) : "Hidden"}
              </TableCell>
              <TableCell align="right">
                {row.giftedUserId ? (
                  <Typography
                    variant="overline"
                    component="a"
                    href={"/p/" + row.giftedUserId.username}>
                      @{row.giftedUserId.username}
                </Typography>):"Hidden"}
              </TableCell>
              <TableCell align="right">
                {moment(row.createdAt)
                  .locale(typeof i18n.language !== "undefined" ? (i18n.language == "cn" ? "zh_cn" : i18n.language) : "en")
                  .fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              colSpan={6}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};


export default withTranslation()(History)

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
