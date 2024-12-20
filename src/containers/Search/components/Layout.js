import React from "react";
import Grid from "@material-ui/core/Grid";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { withTranslation } from "../../../../i18n";
import CompactCard from "../../../components/Card/components/CompactCard";
import PaginationControlled from "./pagination";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Sort from "../../Search/components/Sort";
import ProfileCard from "./userCard";
import GroupCard from "./groupCard";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = ({ search }) => ({
  search,
});
function Layout({ search, t }) {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles();

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: 100 }}
      className={classes.root}
    >
      <Grid container spacing={2} justify="center">
        <Grid
          className={classes.marginBottom}
          item
          xs={12}
          sm={12}
          md={3}
          justify="center"
          align="center"
        >
          {search.data.result && search.data.result.users.length > 0 ? (
            <div>
              <ProfileCard
                item="1"
                single
                users={search.data.result && search.data.result.users}
              />
            </div>
          ) : (
            <p>No user found</p>
          )}

          {search.data.result && search.data.result.groups.length > 0 ? (
            <div>
              <GroupCard
                item="1"
                single
                groups={search.data.result && search.data.result.groups}
              />
            </div>
          ) : (
            <p>No groups found</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {search.data.result && search.data.result.topics.length > 0 ? (
            <div display="flex">
              <Grid>
                <Typography variant="h5">
                  ({search.data.result && search.data.result.total}) Posts that
                  matches your search
                </Typography>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  className={classes.alignMent}
                >
                  <Sort />
                </Box>
              </Grid>
              {search.data.result.topics.map((topic) => (
                <CompactCard topic={topic} />
              ))}
            </div>
          ) : (
            <p>No post(s) found</p>
          )}
          {search.data.result && search.data.result.total > rowsPerPage ? (
            <PaginationControlled
              count={search.data.result && search.data.result.total}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} align="left">
          <LadderBoard item="1" single />
        </Grid>
      </Grid>
    </Container>
  );
}

export default connect(mapStateToProps)(withTranslation()(Layout));

const useStyles = makeStyles((theme) => ({
  addSite: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "left",
    flexDirection: "row",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    backgroundColor: {
      backgroundColor: "white",
      // flexBasis: 420,
    },
  },
  alignMent: {
    marginTop: "-25px",
  },
  marginBottom: {
    marginBottom: "20px",
  },
}));
