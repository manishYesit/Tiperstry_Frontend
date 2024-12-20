import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setTopicsForProfile,
  setCurrentPageProfile,
} from "../../../store/actions";
import axios from "axios";
import { config } from "../../../../config";
import Card from "../../../components/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import BottomScrollListerer from "react-bottom-scroll-listener";
import { useRouter } from "next/router"

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = {
  setTopicsForProfile,
  setCurrentPageProfile,
};

const TopicsSection = ({
  profile: { topics, topicCurrentPage, topicPage, topicTotal },
  setTopicsForProfile,
  setCurrentPageProfile,
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    handleGetTopics();
  }, []);

  const handleGetTopics = async () => {
    try {
      if (loading) return;
      if (topicPage === topicCurrentPage) return;

      setLoading(true);

      const nextTopics = await axios.get(
        config.profileTopic +
          "/" +
          router.query.username +
          "?page=" +
          topicCurrentPage
      );

      const newData = JSON.parse(JSON.stringify(topics));
      
      nextTopics.data.topics.forEach((element) => {        
        newData.push(element);
      });
      
      topicPage = nextTopics.data.page;
      topicTotal = nextTopics.data.total;

      const pageNo = Number(topicCurrentPage) + 1;
      setTopicsForProfile({ topics: newData, topicPage, topicTotal });
      setCurrentPageProfile({
        page: "topicCurrentPage",
        pageNo,
      });

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
      setLoading(false);
    }
  };

  return (
    <>
      <BottomScrollListerer onBottom={handleGetTopics}>
        <Card topics={topics} />
      </BottomScrollListerer>

      {loading && <CircularProgress />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsSection);
