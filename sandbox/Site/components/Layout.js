import React from "react";
import Grid from "@material-ui/core/Grid";
import AdvertBoard from "../../../components/AdvertBoard";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Iframe from "../../../components/EmbedSite/components/Iframe";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Action from "../../../components/EmbedSite/components/Action";
import Topics from "./Topics";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { config } from "../../../../config";
import { useRouter } from "next/router";
import { setTopicForSite } from "../../../store/actions";
import axios from "axios";
import Vote from "./Vote";
import FollowSite from "./FollowSite";
import AddSite from "./AddSite";
import Sort from "./Sort";
import makeStyles from "@material-ui/core/styles/makeStyles";

const mapStateToProps = (state) => {
  return {
    site: state.site,
  };
};

const mapDispatchToProps = {
  setTopicForSite,
};

function Layout({ site, setTopicForSite }) {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  console.log("router", router);

  const handlePreviousTopic = async () => {
    try {
      if (currentPage < 2) return;

      setLoading("previous");
      const page = currentPage - 1;
      // const url = router.query.s;
      const url = site.url;

      const topics = await axios.get(
        config.siteTopics + "?url=" + url + "&page=" + page
      );
      setTopicForSite(topics.data);
      setLoading(null);
      setCurrentPage(page);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const handleNextTopic = async () => {
    try {
      if (currentPage >= site.page) return;

      setLoading("next");
      const page = currentPage + 1;
      // const url = .router.query.s;
      const url = site.url;

      const topics = await axios.get(
        config.siteTopics + "?url=" + url + "&page=" + page
      );
      setTopicForSite(topics.data);
      setLoading(null);
      setCurrentPage(page);
    } catch (error) {
      setLoading(null);
      console.log(error.response);
    }
  };

  const displayHeaders = () => {
    return (
      site.site && (
        <>
          <Box m={1}>
            <Typography variant="overline">{site.site.url}</Typography>
          </Box>
          {router && (
            <Iframe
              url={router.route === "/Site" ? router.query.s : site.site.url}
            />
          )}
        </>
      )
    );
  };

  const displayLink = () => {
    return (
      site.site && (
        <a
          href={
            router.route === "/Site"
              ? router.query.s
              : "https://" + site.site.url
          }
        >
          {router.route === "/Site"
            ? router.query.s
            : "https://" + site.site.url}
        </a>
      )
    );
  };

  const displayActionSection = () => {
    return (
      site.site && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          // marginLeft={2}
          // marginRight={2}
        >
          <Vote
            siteId={site.site._id}
            downVotes={site.site.downVotes}
            upVotes={site.site.upVotes}
          />

          <FollowSite followers={site.site.followers} siteId={site.site._id} />
        </Box>
      )
    );
  };

  const displayLeftGrid = () => {
    return (
      <>
        {site.topics.map((topic) => (
          <Topics key={topic._id} topic={topic} />
        ))}

        {site.page > 1 && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // marginLeft={2}
            // marginRight={2}
          >
            <Button
              disabled={loading || currentPage < 2}
              variant="contained"
              color="primary"
              onClick={handlePreviousTopic}
            >
              {loading === "previous" ? (
                <CircularProgress size={25} />
              ) : (
                "Previous"
              )}
            </Button>
            <Typography>{currentPage + " / " + site.page}</Typography>
            <Button
              disabled={loading || currentPage >= site.page}
              variant="contained"
              color="primary"
              onClick={handleNextTopic}
            >
              {loading === "next" ? <CircularProgress size={25} /> : "Next"}
            </Button>
          </Box>
        )}
      </>
    );
  };

  const displaySortAddSite = () => {
    return (
      <div className={classes.addSite}>
        <AddSite />
        <Sort url={site.url} />
      </div>
    );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 100 }}>
      {displayHeaders()}
      <br />
      {displayLink()}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={8} align="center">
          {/* <Action /> */}
          {displayActionSection()}
          <br />
          {displaySortAddSite()}
          {displayLeftGrid()}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AdvertBoard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

const useStyles = makeStyles((theme) => ({
  addSite: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
}));
