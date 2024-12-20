import React from "react";
import Header from "../../components/Header";
import Container from "@material-ui/core/Container";
import StickyHeadTable from "./components/reportTable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ReportData = () => {
  const classes = useStyles();

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
        <h2>Reported Users</h2>
        <div className={classes.root}>
          <StickyHeadTable />
        </div>
      </Container>
    </>
  );
};

export default ReportData;
