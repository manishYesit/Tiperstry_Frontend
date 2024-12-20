import React from "react";
import Header from "../../components/Header";
import Container from "@material-ui/core/Container";
import StickyHeadTable from "./components/promotionsTable";
import axios from "axios";
import { config } from "../../../config";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";

import {
  deleteReport,
  reportedUsers,
  togglePromotionPriceModal,
  setPromotionCharge,
} from "../../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";

const AddPromotionPrice = dynamic(
  () => import("./components/AddPromotionPrice"),
  {
    ssr: false,
  }
);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const mapStateToProps = (state) => ({
  user: state.user.reportedusers,
  promotedPosts: state.broadcast.allPromotedPosts,
});

const mapDispatchToProps = {
  deleteReport,
  reportedUsers,
};
const Promotions = ({ user, deleteReport, reportedUsers, promotedPosts }) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [currentid, setCurrentId] = React.useState("");
  const dispatch = useDispatch();
  React.useEffect(() => {
    reportedUsers(pages) ? setLoading(false) : null;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
        <AddPromotionPrice />
        <h2>Promoted Posts</h2>
        <Button
          onClick={() => {
            dispatch(togglePromotionPriceModal());
          }}
          color="default"
          variant="outlined"
        >
          Update Promotion Price
        </Button>
        <div className={classes.root}>
          {loading ? (
            <LinearProgress variant="determinate" value={progress} />
          ) : (
            <StickyHeadTable user={user} />
          )}
        </div>
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
