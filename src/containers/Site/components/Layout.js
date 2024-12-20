import React from "react";
import Grid from "@material-ui/core/Grid";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Iframe from "../../../components/EmbedSite/components/Iframe";
import KnowledgePanel from "../../../components/EmbedSite/components/KnowledgePanel";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Action from "../../../components/EmbedSite/components/Action";
import Card from "./Card";
import CardSpecific from "./CardSpecific";
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
import { withTranslation } from "../../../../i18n";
import ViewOptions from "./ViewOptions";
import { toggleVerifyDomainModal } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

const mapStateToProps = (state) => {
  return {
    site: state.site,
  };
};

const mapDispatchToProps = {
  setTopicForSite,
};

function Layout({ site, setTopicForSite, t }) {
  const dispatch = useDispatch();
  const domain = useSelector(({ domain }) => domain);

  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePreviousTopic = async () => {
    try {
      if (currentPage < 2) return;

      setLoading("previous");
      const page = currentPage - 1;
      const url = site.url;

      const topics = await axios.get(
        config.siteTopics + "?url=" + url + "&page=" + page
      );

      setTopicForSite(topics.data);
      setLoading(null);
      setCurrentPage(page);
    } catch (error) {
      setLoading(false);
      // console.log(error.response);
    }
  };

  const handleNextTopic = async () => {
    try {
      if (currentPage >= site.page) return;

      setLoading("next");
      const page = currentPage + 1;
      const url = site.url;

      const topics = await axios.get(
        config.siteTopics + "?url=" + url + "&page=" + page
      );

      setTopicForSite(topics.data);
      setLoading(null);
      setCurrentPage(page);
    } catch (error) {
      setLoading(null);
      // console.log(error.response);
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
          	<>
		          {/* <Iframe
		            url={router.route === "/sites" ? router.query.s : router.query.s}
		          /> */}
		          <KnowledgePanel url={router.route === "/sites" ? router.query.s : router.query.s} />
		      	</>    
          )}
        </>
      )
    );
  };

  const displayLink = () => {
    return (
      site.site && (
        <>
          <a
            href={
              router.route === "/sites"
                ? router.query.s
                : "https://" + site.site.url
            }
          >
            {router.route === "/sites"
              ? router.query.s
              : "https://" + site.site.url}
          </a>
          {site.site.userId != undefined ? (
            <p>Verified by: {site.site.userId.username}</p>
          ) : (
            <>
              {" "}
              <br></br>
              <Button
                size="small"
                color="primary"
                variant="contained"
                className="btn btn-sm btn-light"
                onClick={() =>
                  dispatch(toggleVerifyDomainModal(!domain.openVerifyDomain))
                }
              >
                Claim Website
              </Button>
            </>
          )}
        </>
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
            downVotes={
              router.route == "/sites"
                ? site.site.downVotes
                : site.site.domain_downVotes
            }
            upVotes={
              router.route == "/sites"
                ? site.site.upVotes
                : site.site.domain_upVotes
            }
            voteType={router.route == "/sites" ? "site" : "domain"}
          />

          <FollowSite followers={site.site.followers} siteId={site.site._id} />
        </Box>
      )
    );
  };

  const displayLeftGrid = () => {
    console.log("sitepage", site);
    return (
      <>
        {site.topics.length > 0 ? <ViewOptions /> : null}
        {router.route === "/sites" ? (
          <CardSpecific
            route={router.route}
            siteurl={router.query.s}
            filter={"specificposts"}
          />
        ) : (
          <Card
            route={router.route}
            siteurl={router.query.s}
            filter={"otherposts"}
          />
        )}
        <Paper>
          {router.route === "/sites" && (
            <h3 style={{ textAlign: "left", padding: "6px" }}>
              More posts from {site.site ? site.site.url : ""}
            </h3>
          )}
        </Paper>

        {router.route === "/sites" && (
          <Card
            route={router.route}
            siteurl={router.query.s}
            filter={"otherposts"}
          />
        )}

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
                t("Previous")
              )}
            </Button>
            <Typography>{currentPage + " / " + site.page}</Typography>
            <Button
              disabled={loading || currentPage >= site.page}
              variant="contained"
              color="primary"
              onClick={handleNextTopic}
            >
              {loading === "next" ? <CircularProgress size={25} /> : t("Next")}
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
          <LadderBoard item="1" single />
        </Grid>
      </Grid>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Layout));

const useStyles = makeStyles((theme) => ({
  addSite: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
}));
