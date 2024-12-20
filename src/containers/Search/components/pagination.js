import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { config } from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useRouter } from "next/router";
import {
  setSearch
} from "../../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled({ count, page, setPage, rowsPerPage }) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const router = useRouter();

  let searchQuery = router.query ? router.query.q : '';

  const handleChange = async (event, value) => {
    setPage(value)
    let newSortType = localStorage.getItem('sortType') ?? 'top';

    const search = await axios.get(`${config.search}?q=${searchQuery}&sort=${newSortType}&page=${value}&limit=${rowsPerPage}`);
    dispatch(setSearch(search.data))
  };

  return (
    <div className={classes.root}>
      {<Pagination count={Math.ceil(count / rowsPerPage)} page={page} color="primary" onChange={handleChange} rowsPerPage={rowsPerPage} />}
    </div>
  );
}